import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"

export type EmailClassification = "Assistant to Reply" | "Client to Reply" | "No Reply Needed"

export interface EmailAnalysisResult {
  classification: EmailClassification
  summary: string
  whyClientNeeded: string | null
  extractedDates: string[]
  actionItems: string[]
  suggestedReply: string
}

// Read API key from Vite environment or localStorage fallback
export function getGeminiApiKey(): string {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY
  if (typeof envKey === "string" && envKey.trim().length > 0 && !envKey.includes("your_gemini_api_key")) {
    return envKey.trim()
  }
  if (typeof window !== "undefined") {
    const localKey = window.localStorage.getItem("VITE_GEMINI_API_KEY")
    if (localKey && localKey.trim().length > 0) {
      return localKey.trim()
    }
  }
  return ""
}

export function isGeminiConfigured(): boolean {
  return getGeminiApiKey().length > 0
}

const SYSTEM_INSTRUCTION = `You are an elite, highly organized Executive Assistant triaging an executive's inbox (Maya Chen, Executive/CEO at Northstar).
Your mission is to evaluate incoming emails and categorize them with razor-sharp precision into one of three classifications:

1. "Client to Reply": The email strictly requires the client/executive's direct personal decision, confidential sign-off, personal preference, financial authorization, or strategic approval.
   - If selected, you MUST provide "whyClientNeeded" explaining clearly and concisely why the executive's personal attention is required.

2. "Assistant to Reply": Operational tasks, scheduling, calendar invitations, logistics, administrative coordination, routine confirmations, vendor follow-ups, or standard inquiries that an executive assistant can handle on behalf of the client.
   - For this classification, "whyClientNeeded" MUST be null.

3. "No Reply Needed": Newsletters, automated notifications, shipping confirmations, FYIs, receipts, or simple "thank you" notes that require no reply or action.
   - For this classification, "whyClientNeeded" MUST be null and "suggestedReply" should be an empty string ("").

For all emails, provide:
- "summary": A crisp, high-signal 1-2 sentence executive briefing of the core message.
- "extractedDates": An array of deadlines, meeting times, or key dates found (formatted cleanly like ["Thursday at 2 PM", "Nov 18 · Offsite"]). If none, return [].
- "actionItems": An array of specific next steps (e.g., ["Review slide 12", "Confirm attendee count"]). If none, return [].
- "suggestedReply": A polished, context-aware, professional email response ready to send. Tailor the tone appropriately (warm & professional for partners, courteous & direct for vendors).

Return ONLY a valid JSON object matching the requested schema.`

function getFallbackAnalysis(
  sender: string,
  subject: string,
  body: string
): EmailAnalysisResult {
  const lowerSub = (subject || "").toLowerCase()
  const lowerBody = (body || "").toLowerCase()

  // 1. Newsletter / No reply needed check
  if (
    lowerSub.includes("newsletter") ||
    lowerSub.includes("receipt") ||
    lowerSub.includes("briefing") ||
    lowerSub.includes("digest") ||
    lowerSub.includes("alert") ||
    lowerSub.includes("summary") ||
    lowerBody.includes("no reply needed") ||
    lowerBody.includes("unsubscribe")
  ) {
    return {
      classification: "No Reply Needed",
      summary: `Automated briefing or notification regarding "${subject}" from ${sender}.`,
      whyClientNeeded: null,
      extractedDates: [],
      actionItems: ["Archive or review at convenience"],
      suggestedReply: "",
    }
  }

  // 2. Client to Reply check (approvals, term sheets, direct signatures)
  if (
    lowerSub.includes("approval") ||
    lowerSub.includes("term sheet") ||
    lowerSub.includes("urgent") ||
    lowerSub.includes("sign-off") ||
    lowerSub.includes("contract") ||
    lowerBody.includes("your approval") ||
    lowerBody.includes("your choice") ||
    lowerBody.includes("your preference") ||
    lowerBody.includes("signature") ||
    lowerBody.includes("confidential") ||
    lowerBody.includes("board")
  ) {
    return {
      classification: "Client to Reply",
      summary: `${sender} is requesting executive sign-off or direct decision on "${subject}".`,
      whyClientNeeded: "This message involves strategic sign-off, budget authorization, or client-exclusive decision making.",
      extractedDates: ["Today · Urgent attention needed"],
      actionItems: [`Review details for ${subject}`, `Provide executive decision to ${sender}`],
      suggestedReply: `Hi ${sender.split(" ")[0] || "there"},\n\nI have reviewed the details for ${subject}. We are evaluating the terms and will follow up with our decision shortly.\n\nBest,\nMaya`,
    }
  }

  // 3. Default Assistant to Reply
  return {
    classification: "Assistant to Reply",
    summary: `${sender} reached out regarding "${subject}". Requires administrative coordination or scheduling response.`,
    whyClientNeeded: null,
    extractedDates: ["Upcoming schedule"],
    actionItems: [`Coordinate response with ${sender}`, `Confirm logistics or details for ${subject}`],
    suggestedReply: `Hi ${sender.split(" ")[0] || "there"},\n\nThank you for reaching out regarding "${subject}". We have received your note and will coordinate the details and follow up promptly.\n\nBest regards,\nMaya’s team`,
  }
}

function parseGeminiResponse(rawText: string): unknown {
  try {
    return JSON.parse(rawText)
  } catch {
    // Strip markdown code fences if wrapped
    const cleaned = rawText.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, "$1").trim()
    try {
      return JSON.parse(cleaned)
    } catch {
      // Locate first { and last }
      const first = rawText.indexOf("{")
      const last = rawText.lastIndexOf("}")
      if (first !== -1 && last > first) {
        return JSON.parse(rawText.slice(first, last + 1))
      }
      throw new Error("Unable to parse JSON from response")
    }
  }
}

export async function analyzeEmail(
  sender: string,
  subject: string,
  body: string
): Promise<EmailAnalysisResult> {
  const apiKey = getGeminiApiKey()

  if (!apiKey) {
    console.warn("[GeminiService] VITE_GEMINI_API_KEY is missing or empty. Using safe fallback triage.")
    return getFallbackAnalysis(sender, subject, body)
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            classification: {
              type: SchemaType.STRING,
              format: "enum",
              enum: ["Assistant to Reply", "Client to Reply", "No Reply Needed"],
            },
            summary: { type: SchemaType.STRING },
            whyClientNeeded: { type: SchemaType.STRING, nullable: true },
            extractedDates: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
            actionItems: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
            },
            suggestedReply: { type: SchemaType.STRING },
          },
          required: [
            "classification",
            "summary",
            "extractedDates",
            "actionItems",
            "suggestedReply",
          ],
        },
      },
    })

    const prompt = `Analyze this incoming email:
SENDER: ${sender}
SUBJECT: ${subject}
BODY:
${body}`

    const response = await model.generateContent(prompt)
    const text = response.response.text()

    const parsed = parseGeminiResponse(text) as Partial<EmailAnalysisResult>

    const validClassifications: EmailClassification[] = [
      "Assistant to Reply",
      "Client to Reply",
      "No Reply Needed",
    ]

    const fallback = getFallbackAnalysis(sender, subject, body)

    const classification: EmailClassification =
      parsed.classification && validClassifications.includes(parsed.classification)
        ? parsed.classification
        : fallback.classification

    return {
      classification,
      summary: typeof parsed.summary === "string" && parsed.summary.trim() ? parsed.summary.trim() : fallback.summary,
      whyClientNeeded: parsed.whyClientNeeded ? String(parsed.whyClientNeeded) : null,
      extractedDates: Array.isArray(parsed.extractedDates) ? parsed.extractedDates.map(String) : fallback.extractedDates,
      actionItems: Array.isArray(parsed.actionItems) ? parsed.actionItems.map(String) : fallback.actionItems,
      suggestedReply: typeof parsed.suggestedReply === "string" ? parsed.suggestedReply : fallback.suggestedReply,
    }
  } catch (error) {
    console.error("[GeminiService] Gemini analysis error, falling back to safe triage:", error)
    return getFallbackAnalysis(sender, subject, body)
  }
}

export const geminiService = {
  analyzeEmail,
  isGeminiConfigured,
  getGeminiApiKey,
}

export default geminiService
