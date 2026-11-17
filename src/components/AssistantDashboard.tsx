import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  Archive,
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Inbox,
  Key,
  Loader2,
  Mail,
  MoreHorizontal,
  Plus,
  Reply,
  Search,
  Send,
  Settings2,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { Classification, Email } from "../email-types"
import { geminiService, isGeminiConfigured } from "../services/geminiService"

const folders = ["All inbox", "Assistant to Reply", "Client to Reply", "No Reply Needed", "Important", "Archived"]
const classificationStyles: Record<Classification, string> = {
  "Assistant to Reply": "border-sky-200 bg-sky-50 text-sky-700",
  "Client to Reply": "border-violet-200 bg-violet-50 text-violet-700",
  "No Reply Needed": "border-slate-200 bg-slate-50 text-slate-600",
}

const MOCK_SIMULATION_POOL = [
  {
    senderName: "Sarah Sterling",
    senderEmail: "ssterling@apexpartners.vc",
    initials: "SS",
    subject: "Urgent: Revised Series B Term Sheet sign-off",
    body: "Hi Maya,\n\nThe lead investors sent over the finalized Series B term sheet reflecting our negotiated $45M valuation cap and the board governance clause. We need your direct signature and sign-off before 5:00 PM today to close the syndicate.\n\nCould you review and confirm if you authorize these terms?\n\nBest,\nSarah Sterling",
  },
  {
    senderName: "Avery Brooks",
    senderEmail: "avery@northstar.co",
    initials: "AB",
    subject: "Quick check: Thursday client review logistics",
    body: "Hi Maya,\n\nThe client review is confirmed for Thursday at 2:00 PM. Could you let me know if you’d like the prep notes sent to the full team, or just the project leads?\n\nAlso, let me know if you need any AV equipment arranged in Conference Room B.\n\nThanks,\nAvery",
  },
  {
    senderName: "Dr. Aris Thorne",
    senderEmail: "thorne@biotechventures.org",
    initials: "AT",
    subject: "Keynote invitation: Global Innovation Summit (Nov 24)",
    body: "Dear Maya,\n\nThe executive steering committee would be deeply honored if you would deliver the opening keynote on 'Human + AI Leadership' on November 24 at 9:30 AM in San Francisco.\n\nWe provide executive travel coordination and an honorarium. Could your office let us know if your calendar allows?\n\nWarm regards,\nDr. Aris Thorne",
  },
  {
    senderName: "CloudScale Billing",
    senderEmail: "billing@cloudscale.io",
    initials: "CB",
    subject: "Receipt for your October Enterprise Infrastructure",
    body: "Hi Maya,\n\nYour monthly subscription of $850.00 for CloudScale Enterprise Compute was charged to Visa ending in 4022. No further action or reply is needed on your part.\n\nThank you for being a valued customer,\nThe CloudScale Team",
  },
  {
    senderName: "Julian Vance",
    senderEmail: "julian@vanceadvisory.com",
    initials: "JV",
    subject: "Proposed revisions to Master Services Agreement",
    body: "Maya,\n\nOur legal counsel redlined sections 4.2 (liability cap) and 8.1 (IP ownership) in the pending MSA. Before we can finalize the contract, we require your executive sign-off on the indemnification threshold.\n\nPlease let us know if the proposed edits are acceptable.\n\nSincerely,\nJulian",
  },
]

type Props = {
  emails: Email[]
  setEmails: React.Dispatch<React.SetStateAction<Email[]>>
  onClientView: () => void
  onLanding?: () => void
}

export function AssistantDashboard({ emails, setEmails, onClientView, onLanding }: Props) {
  const [folder, setFolder] = useState("All inbox")
  const [selectedId, setSelectedId] = useState("1")
  const [search, setSearch] = useState("")
  const [reply, setReply] = useState("")
  const [drafting, setDrafting] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatQuestion, setChatQuestion] = useState("")
  const [chatReply, setChatReply] = useState("")
  const [thinking, setThinking] = useState(false)
  const [toast, setToast] = useState("")
  const [simulating, setSimulating] = useState(false)
  const [simulationIndex, setSimulationIndex] = useState(0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [customKey, setCustomKey] = useState("")
  const [hasApiKey, setHasApiKey] = useState(false)

  useEffect(() => {
    setHasApiKey(isGeminiConfigured())
    if (typeof window !== "undefined") {
      setCustomKey(window.localStorage.getItem("VITE_GEMINI_API_KEY") || "")
    }
  }, [])

  const visibleEmails = useMemo(() => emails.filter((email) => {
    if (folder === "Archived" ? email.status !== "archived" : email.status === "archived") return false
    const matchesFolder = folder === "All inbox" || folder === "Archived" || (folder === "Important" && email.important) || folder === email.aiContext.classification
    const query = search.toLowerCase()
    return matchesFolder && (!query || `${email.senderName} ${email.subject} ${email.body}`.toLowerCase().includes(query))
  }), [emails, folder, search])

  const selected = emails.find((email) => email.id === selectedId) ?? visibleEmails[0]
  const clientCount = emails.filter((email) => email.status === "inbox" && email.aiContext.classification === "Client to Reply").length
  const assistantCount = emails.filter((email) => email.status === "inbox" && email.aiContext.classification === "Assistant to Reply").length

  useEffect(() => {
    if (!selected || !drafting) return
    const text = selected.aiContext.suggestedReply
    let index = 0
    setReply("")
    const timer = window.setInterval(() => {
      index += 1
      setReply(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(timer)
        setDrafting(false)
      }
    }, 15)
    return () => window.clearInterval(timer)
  }, [drafting, selected])

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(""), 2800)
  }

  const updateEmail = (id: string, updater: (email: Email) => Email) =>
    setEmails((current) => current.map((email) => (email.id === id ? updater(email) : email)))

  // Real Gemini-powered live simulation
  const simulateLiveEmail = async () => {
    if (simulating) return
    const mock = MOCK_SIMULATION_POOL[simulationIndex % MOCK_SIMULATION_POOL.length]
    setSimulationIndex((prev) => prev + 1)

    const id = `live-${Date.now()}`
    const rawEmail: Email = {
      id,
      senderName: mock.senderName,
      senderEmail: mock.senderEmail,
      initials: mock.initials,
      subject: mock.subject,
      timestamp: "Just now",
      isUnread: true,
      status: "inbox",
      processing: true,
      body: mock.body,
      aiContext: {
        classification: "Assistant to Reply",
        summary: "Analyzing incoming email with Gemini 1.5 Flash...",
        extractedDates: [],
        actionItems: ["Triage in progress..."],
        whyClientNeeded: "",
        suggestedReply: "",
      },
    }

    // Immediately push to state with processing status
    setEmails((current) => [rawEmail, ...current])
    setSelectedId(id)
    setFolder("All inbox")
    setSimulating(true)

    try {
      // Call Google Gemini Service
      const analysis = await geminiService.analyzeEmail(
        rawEmail.senderName,
        rawEmail.subject,
        rawEmail.body
      )

      // Merge real Gemini JSON analysis into state
      updateEmail(id, (email) => ({
        ...email,
        processing: false,
        aiContext: {
          classification: analysis.classification,
          summary: analysis.summary,
          whyClientNeeded: analysis.whyClientNeeded ?? "",
          extractedDates: analysis.extractedDates || [],
          actionItems: analysis.actionItems || [],
          suggestedReply: analysis.suggestedReply || "",
        },
      }))

      notify(`Triaged: ${analysis.classification}`)
    } catch (err) {
      console.error("[AssistantDashboard] Error during live simulation:", err)
      updateEmail(id, (email) => ({ ...email, processing: false }))
      notify("Triage completed (fallback)")
    } finally {
      setSimulating(false)
    }
  }

  const saveCustomKey = () => {
    if (typeof window !== "undefined") {
      if (customKey.trim()) {
        window.localStorage.setItem("VITE_GEMINI_API_KEY", customKey.trim())
        notify("Gemini API key saved")
      } else {
        window.localStorage.removeItem("VITE_GEMINI_API_KEY")
        notify("API key removed")
      }
      setHasApiKey(isGeminiConfigured())
      setSettingsOpen(false)
    }
  }

  const answerInboxQuestion = (question: string) => {
    setChatQuestion(question)
    setChatReply("")
    setThinking(true)
    window.setTimeout(() => {
      const urgent = emails.filter((email) => email.status === "inbox" && email.aiContext.classification === "Client to Reply")
      const response = question === "What’s urgent?"
        ? urgent.length ? `There ${urgent.length === 1 ? "is" : "are"} ${urgent.length} conversation${urgent.length === 1 ? "" : "s"} waiting on the client. ${urgent.slice(0, 2).map((email) => email.senderName + " — " + email.subject).join("; ")}.` : "Nothing urgent is waiting on the client. Your inbox is in good shape."
        : `${assistantCount} assistant replies and ${urgent.length} client decisions are pending. ${selected ? `The selected thread is about ${selected.aiContext.summary.toLowerCase()}` : "Select a thread to see its context."}`
      setChatReply(response)
      setThinking(false)
    }, 1000)
  }

  const archive = (email: Email) => {
    updateEmail(email.id, (current) => ({ ...current, status: "archived" }))
    notify("Conversation archived")
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] text-slate-900">
      <header className="sticky top-0 z-30 flex h-[68px] items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 backdrop-blur-xl md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            onClick={onLanding}
            title={onLanding ? "Return to Landing Page" : "inboxmate"}
            className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-80"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#5146e5] text-white shadow-sm shadow-indigo-200">
              <Mail size={18} />
            </div>
            <div className="hidden sm:block">
              <div className="text-[15px] font-semibold tracking-tight">
                inbox<span className="text-[#5146e5]">mate</span>
              </div>
              <div className="text-[10px] text-slate-400">Executive inbox, in sync</div>
            </div>
          </button>

          <div className="mx-2 hidden h-8 w-px bg-slate-200 lg:block" />

          <button className="hidden items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 transition-colors hover:bg-slate-50 lg:flex">
            <span className="flex size-6 items-center justify-center rounded-md bg-red-50 text-[10px] font-bold text-red-600">G</span>
            <span className="max-w-[150px] truncate text-xs font-medium text-slate-700">maya@northstar.co</span>
            <span className="size-1.5 rounded-full bg-emerald-500" />
            <ChevronDown size={13} className="text-slate-400" />
          </button>

          {/* Real-time Gemini Integration Indicator */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/70 px-2.5 py-1 text-[11px] font-medium text-indigo-700">
            <span className={cn("size-2 rounded-full", hasApiKey ? "bg-emerald-500 animate-pulse" : "bg-amber-400")} />
            <span>Gemini 1.5 Flash {hasApiKey ? "Live" : "Fallback"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
         

          {/* Simulate Live Email Button wired to Gemini */}
          <Button
            variant="outline"
            size="sm"
            onClick={simulateLiveEmail}
            disabled={simulating}
            className="hidden rounded-lg border-slate-200 font-medium text-slate-800 hover:bg-indigo-50/60 hover:text-indigo-700 sm:inline-flex"
          >
            {simulating ? (
              <>
                <Loader2 className="animate-spin text-indigo-600" size={14} />
                <span>Triaging with Gemini...</span>
              </>
            ) : (
              <>
                <Plus data-icon="inline-start" />
                <span>Simulate Live Email</span>
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={simulateLiveEmail}
            disabled={simulating}
            className="sm:hidden"
            aria-label="Simulate Live Email"
          >
            {simulating ? <Loader2 className="animate-spin text-indigo-600" size={16} /> : <Plus />}
          </Button>

          <Button onClick={onClientView} size="sm" className="rounded-lg bg-[#5146e5] text-white hover:bg-[#4338ca]">
            Client view <ArrowUpRight data-icon="inline-end" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Settings"
            onClick={() => setSettingsOpen(true)}
            className="hidden sm:inline-flex text-slate-500 hover:text-slate-900"
          >
            <Settings2 size={18} />
          </Button>

          <Avatar className="ml-1 size-8">
            <AvatarFallback className="bg-slate-200 text-[10px] font-semibold text-slate-700">MC</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Settings Modal for Gemini Configuration */}
      <AnimatePresence>
        {settingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <Key size={16} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">Gemini 1.5 Flash Configuration</h3>
                    <p className="text-[11px] text-slate-500">Google Generative AI Integration</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon-sm" onClick={() => setSettingsOpen(false)}>
                  <X size={16} />
                </Button>
              </div>

              <div className="mt-4 space-y-3">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Enter your Google Gemini API key below, or set <code className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[11px] text-indigo-600">VITE_GEMINI_API_KEY</code> in your environment.
                </p>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[11px] font-medium text-slate-700 mb-1">Status</div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className={cn("size-2 rounded-full", hasApiKey ? "bg-emerald-500" : "bg-amber-500")} />
                    <span className="font-semibold text-slate-800">
                      {hasApiKey ? "Connected to Gemini 1.5 Flash" : "Fallback Offline Triage Active"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-700">Gemini API Key</label>
                  <Input
                    type="password"
                    placeholder="AIzaSy..."
                    value={customKey}
                    onChange={(e) => setCustomKey(e.target.value)}
                    className="mt-1 h-10 rounded-xl text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <Button variant="outline" size="sm" onClick={() => setSettingsOpen(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={saveCustomKey} className="bg-[#5146e5] text-white hover:bg-[#4338ca]">
                    Save & Apply
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="mx-auto grid min-h-[calc(100vh-68px)] max-w-[1600px] grid-cols-1 lg:grid-cols-[220px_320px_minmax(0,1fr)]">
        {/* Left Sidebar */}
        <aside className="hidden border-r border-slate-200/80 bg-[#fafbfc] p-4 lg:flex lg:flex-col">
          <Button
            className="mb-6 h-10 w-full rounded-xl bg-[#5146e5] shadow-sm shadow-indigo-100 hover:bg-[#4338ca]"
            onClick={() => {
              setReply("")
              notify("Compose is ready")
            }}
          >
            <Plus data-icon="inline-start" />Compose email
          </Button>

          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[.14em] text-slate-400">
            Workspace
          </div>

          <nav className="flex flex-col gap-1">
            {folders.map((item) => {
              const Icon =
                item === "All inbox"
                  ? Inbox
                  : item === "Assistant to Reply"
                  ? ArrowUpRight
                  : item === "Client to Reply"
                  ? Users
                  : item === "No Reply Needed"
                  ? CheckCheck
                  : item === "Important"
                  ? Star
                  : Archive

              const count =
                item === "All inbox"
                  ? emails.filter((email) => email.status === "inbox").length
                  : item === "Archived"
                  ? emails.filter((email) => email.status === "archived").length
                  : item === "Important"
                  ? emails.filter((email) => email.status === "inbox" && email.important).length
                  : emails.filter((email) => email.status === "inbox" && email.aiContext.classification === item).length

              return (
                <button
                  key={item}
                  onClick={() => setFolder(item)}
                  className={cn(
                    "flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-left text-[12px] transition-colors",
                    folder === item ? "bg-[#eeedff] font-semibold text-[#5146e5]" : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <Icon size={16} />
                  <span className="flex-1">{item}</span>
                  <span className={cn("text-[10px]", folder === item ? "text-[#5146e5]" : "text-slate-400")}>{count}</span>
                </button>
              )
            })}
          </nav>

          <div className="my-5 h-px bg-slate-200" />
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[.14em] text-slate-400">Account</div>
          <div className="flex items-center gap-2 rounded-lg px-2 py-2">
            <Avatar className="size-8">
              <AvatarFallback className="bg-slate-200 text-xs text-slate-700">MC</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-xs font-medium">Maya Chen</div>
              <div className="truncate text-[10px] text-slate-400">Executive assistant</div>
            </div>
            <MoreHorizontal className="ml-auto text-slate-400" size={16} />
          </div>

          <div className="mt-auto rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-3.5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-violet-900">
              <Sparkles size={14} className="text-violet-600" />AI inbox brief
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              {clientCount} conversations need Maya&apos;s attention. {assistantCount} can be handled by you.
            </p>
          </div>
        </aside>

        {/* Center: Email List */}
        <section className="flex min-h-[calc(100vh-68px)] flex-col border-r border-slate-200/80 bg-white">
          <div className="border-b border-slate-100 px-4 pb-3 pt-5">
            <div className="mb-1 flex items-center justify-between">
              <h1 className="text-lg font-semibold tracking-tight">{folder}</h1>
              <Button variant="ghost" size="icon-sm" aria-label="Refresh inbox" onClick={() => notify("Inbox is up to date")}>
                <CircleHelp />
              </Button>
            </div>
            <p className="text-[11px] text-slate-400">Your team inbox at a glance</p>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations"
                aria-label="Search conversations"
                className="h-9 rounded-lg border-slate-200 bg-slate-50 pl-9 text-xs focus-visible:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-slate-100 px-3 py-3">
            {[
              { label: "Inbox", value: emails.filter((email) => email.status === "inbox").length, icon: Inbox },
              { label: "To reply", value: assistantCount + clientCount, icon: Reply },
              { label: "Important", value: emails.filter((email) => email.status === "inbox" && email.important).length, icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400">
                  <Icon size={12} />
                  {label}
                </div>
                <div className="mt-1 text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto">
            <AnimatePresence initial={false} mode="popLayout">
              {visibleEmails.map((email) => (
                <motion.button
                  layout
                  key={email.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
                  onClick={() => {
                    setSelectedId(email.id)
                    setReply("")
                    setDrafting(false)
                  }}
                  className={cn(
                    "relative block w-full border-b border-slate-100 px-4 py-4 text-left transition-colors hover:bg-slate-50",
                    selected?.id === email.id && "bg-indigo-50/65 hover:bg-indigo-50/80"
                  )}
                >
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 top-0 w-[3px] rounded-r-full bg-[#5146e5] transition-opacity",
                      selected?.id === email.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {email.processing ? (
                    <div className="flex gap-3">
                      <Skeleton className="size-9 shrink-0 rounded-full bg-indigo-100 animate-pulse" />
                      <div className="flex-1">
                        <Skeleton className="mb-2 h-3 w-2/5 bg-indigo-100" />
                        <Skeleton className="mb-2 h-3 w-4/5 bg-indigo-50" />
                        <Skeleton className="h-3 w-3/5 bg-indigo-50" />
                        <div className="mt-3 flex items-center text-[10px] font-semibold text-indigo-600">
                          <Loader2 size={11} className="mr-1.5 inline animate-spin" />
                          Gemini 1.5 Flash triaging email...
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="mb-2 flex items-center gap-2">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-slate-100 text-[10px] font-semibold text-slate-600">
                            {email.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className={cn("min-w-0 flex-1 truncate text-xs", email.isUnread ? "font-semibold text-slate-900" : "font-medium text-slate-700")}>
                          {email.senderName}
                        </span>
                        <span className="shrink-0 text-[10px] text-slate-400">{email.timestamp}</span>
                      </div>
                      <div className="mb-1 truncate text-xs font-medium text-slate-800">{email.subject}</div>
                      <p className="mb-2 line-clamp-2 text-[11px] leading-5 text-slate-400">{email.aiContext.summary}</p>
                      <Badge variant="outline" className={cn("h-5 rounded-md px-1.5 text-[9px] font-medium", classificationStyles[email.aiContext.classification])}>
                        {email.aiContext.classification}
                      </Badge>
                      {email.important && <Star size={12} className="ml-1 inline fill-amber-400 text-amber-400" />}
                    </>
                  )}
                </motion.button>
              ))}
            </AnimatePresence>

            {visibleEmails.length === 0 && (
              <div className="px-6 py-14 text-center">
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                  <Inbox size={20} />
                </div>
                <p className="text-sm font-medium text-slate-700">Nothing in this folder</p>
                <p className="mt-1 text-xs text-slate-400">You&apos;re all caught up.</p>
              </div>
            )}
          </div>
        </section>

        {/* Right Pane: Selected Email View + AI Intelligence */}
        <section className="flex min-w-0 flex-col bg-white">
          {selected ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 sm:px-7">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Inbox size={14} /> Inbox <span>/</span> {selected.aiContext.classification}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon-sm" aria-label="Archive conversation" onClick={() => archive(selected)}>
                    <Archive size={16} />
                  </Button>
                  <Button variant="ghost" size="icon-sm" aria-label="More options">
                    <MoreHorizontal size={16} />
                  </Button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-8 sm:px-7">
                <div className="mx-auto max-w-[850px]">
                  <div className="py-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h2 className="max-w-2xl text-[21px] font-semibold leading-snug tracking-[-.03em]">
                        {selected.subject}
                      </h2>
                      <Button variant="outline" size="sm" onClick={() => archive(selected)} className="rounded-lg text-xs">
                        <Archive data-icon="inline-start" />Archive
                      </Button>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback className="bg-indigo-50 text-xs font-semibold text-indigo-700">
                          {selected.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                          {selected.senderName}
                          <span className="font-normal text-slate-400">&lt;{selected.senderEmail}&gt;</span>
                        </div>
                        <div className="mt-1 text-[10px] text-slate-400">
                          to Maya Chen · {selected.timestamp}
                        </div>
                      </div>
                      <Button variant="ghost" size="icon-sm" aria-label="Reply">
                        <ArrowDownLeft size={16} />
                      </Button>
                    </div>
                  </div>

                  {/* AI Copilot Intelligence Card */}
                  <Card className="mb-6 overflow-hidden rounded-2xl border-indigo-100 bg-gradient-to-br from-indigo-50/90 via-white to-violet-50/70 shadow-[0_12px_40px_-32px_rgba(75,58,168,.45)]">
                    <CardContent className="p-4 sm:p-5">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="flex size-7 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm">
                            <Sparkles size={15} />
                          </span>
                          <div>
                            <div className="text-xs font-semibold text-slate-800">AI Copilot Analysis</div>
                            <div className="text-[9px] text-slate-400">Powered by Gemini 1.5 Flash</div>
                          </div>
                        </div>
                        <Badge variant="outline" className="rounded-md border-indigo-200 bg-white/75 text-[9px] font-medium text-indigo-700">
                          {selected.aiContext.classification}
                        </Badge>
                      </div>

                      <p className="text-[12px] leading-5 text-slate-700">
                        <span className="mr-1 font-semibold text-indigo-700">Summary:</span>
                        {selected.aiContext.summary}
                      </p>

                      {/* Why Client Needed */}
                      {selected.aiContext.whyClientNeeded && (
                        <div className="mt-3 rounded-xl border border-violet-200/80 bg-violet-50/60 p-2.5">
                          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-violet-700">
                            <Users size={12} /> Why Client Attention is Needed
                          </div>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-700">
                            {selected.aiContext.whyClientNeeded}
                          </p>
                        </div>
                      )}

                      {/* Dates Found */}
                      {selected.aiContext.extractedDates.length > 0 && (
                        <div className="mt-3">
                          <div className="mb-1.5 text-[9px] font-semibold uppercase tracking-[.1em] text-slate-400">
                            Dates found
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {selected.aiContext.extractedDates.map((date) => (
                              <span
                                key={date}
                                className="inline-flex items-center gap-1 rounded-md border border-white bg-white/80 px-2 py-1 text-[10px] font-medium text-slate-600"
                              >
                                <CalendarDays size={11} className="text-indigo-500" />
                                {date}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Items */}
                      {selected.aiContext.actionItems.length > 0 && (
                        <div className="mt-3">
                          <div className="mb-1 text-[9px] font-semibold uppercase tracking-[.1em] text-slate-400">
                            Action items
                          </div>
                          <ul className="flex flex-wrap gap-x-4 gap-y-1">
                            {selected.aiContext.actionItems.map((item) => (
                              <li key={item} className="flex items-start gap-1.5 text-[10px] leading-4 text-slate-600">
                                <Check size={12} className="mt-0.5 shrink-0 text-emerald-600" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="mt-4 flex flex-col gap-2 border-t border-indigo-100/80 pt-3 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-[10px] font-medium text-slate-500">Override classification</span>
                        <Select
                          value={selected.aiContext.classification}
                          onValueChange={(value) =>
                            updateEmail(selected.id, (email) => ({
                              ...email,
                              aiContext: { ...email.aiContext, classification: value as Classification },
                            }))
                          }
                        >
                          <SelectTrigger className="h-8 w-full rounded-lg border-indigo-100 bg-white/80 text-[10px] sm:w-[190px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Assistant to Reply">Assistant to Reply</SelectItem>
                            <SelectItem value="Client to Reply">Client to Reply</SelectItem>
                            <SelectItem value="No Reply Needed">No Reply Needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Email Body */}
                  <div className="whitespace-pre-line border-b border-slate-100 pb-7 text-[13px] leading-[1.85] text-slate-700">
                    {selected.body}
                  </div>

                  {/* Draft Reply Area */}
                  <Card className="mt-6 rounded-2xl border-slate-200 shadow-sm">
                    <CardContent className="p-4 sm:p-5">
                      <div className="mb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                          <Reply size={14} className="text-indigo-600" />Draft a reply
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!selected.aiContext.suggestedReply || drafting}
                          onClick={() => setDrafting(true)}
                          className="h-8 rounded-lg border-indigo-200 text-[10px] text-indigo-700 hover:bg-indigo-50"
                        >
                          <Sparkles data-icon="inline-start" />Generate AI draft
                        </Button>
                      </div>
                      <Textarea
                        value={reply}
                        onChange={(event) => setReply(event.target.value)}
                        placeholder="Write a thoughtful reply..."
                        className="min-h-32 resize-y rounded-xl border-slate-200 bg-slate-50/50 text-xs leading-6 focus-visible:bg-white"
                      />
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          AI drafts are suggestions. Review before sending.
                        </span>
                        <Button
                          size="sm"
                          onClick={() => notify("Draft ready to send")}
                          className="rounded-lg bg-[#5146e5] text-white hover:bg-[#4338ca]"
                        >
                          <Send data-icon="inline-start" />Send reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Mail size={22} />
              </div>
              <h2 className="font-semibold">Select a conversation</h2>
              <p className="mt-1 text-xs text-slate-400">Choose an email to see its details and AI insights.</p>
            </div>
          )}
        </section>
      </main>

      {/* Floating Ask Inbox AI Widget */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            className="fixed bottom-[76px] right-4 z-40 flex h-[380px] w-[min(360px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_70px_-24px_rgba(30,35,65,.35)] sm:right-6"
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-xl bg-white text-indigo-600 shadow-sm">
                  <Sparkles size={16} />
                </span>
                <div>
                  <div className="text-xs font-semibold">Ask Inbox AI</div>
                  <div className="text-[9px] text-slate-400">Knows what&apos;s in your inbox</div>
                </div>
              </div>
              <Button variant="ghost" size="icon-sm" aria-label="Close chat" onClick={() => setChatOpen(false)}>
                <X size={15} />
              </Button>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
              <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-slate-100 px-3.5 py-2.5 text-[11px] leading-5 text-slate-700">
                Hi Maya, I can help you find priorities and context across your inbox.
              </div>
              {chatQuestion && (
                <div className="ml-auto max-w-[90%] rounded-2xl rounded-tr-md bg-indigo-600 px-3.5 py-2.5 text-[11px] text-white">
                  {chatQuestion}
                </div>
              )}
              {thinking && (
                <div className="w-fit rounded-2xl rounded-tl-md bg-slate-100 px-3.5 py-2.5 text-[11px] text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-1.5 animate-pulse rounded-full bg-indigo-500" />
                    Thinking...
                  </span>
                </div>
              )}
              {chatReply && (
                <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-slate-100 px-3.5 py-2.5 text-[11px] leading-5 text-slate-700">
                  {chatReply}
                </div>
              )}
              <div className="mt-auto flex flex-wrap gap-1.5">
                {["What’s urgent?", "Summarize pending"].map((question) => (
                  <button
                    key={question}
                    onClick={() => answerInboxQuestion(question)}
                    className="rounded-full border border-indigo-100 bg-white px-2.5 py-1.5 text-[9px] font-medium text-indigo-700 transition-colors hover:bg-indigo-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-slate-100 p-3">
              <Input disabled placeholder="Ask about your inbox..." aria-label="Ask Inbox AI" className="h-9 rounded-lg bg-slate-50 text-[11px]" />
              <Button size="icon" disabled aria-label="Send message" className="size-9 rounded-lg bg-[#5146e5]">
                <Send size={15} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setChatOpen((open) => !open)}
        className="fixed bottom-4 right-4 z-40 h-12 rounded-full bg-slate-950 px-4 text-xs text-white shadow-xl shadow-slate-900/15 hover:bg-slate-800 sm:bottom-5 sm:right-6"
      >
        <Sparkles data-icon="inline-start" />
        {chatOpen ? "Close assistant" : "Ask Inbox AI"}
      </Button>

      {/* Floating Status Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="status"
            className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-medium text-white shadow-lg"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
