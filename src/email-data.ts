import type { Email } from "./email-types"

export const seedEmails: Email[] = [
  {
    id: "1", senderName: "Olivia Chen", senderEmail: "olivia@northstar.co", initials: "OC",
    subject: "Re: Q4 leadership offsite — venue options", timestamp: "10:42 AM", isUnread: true, status: "inbox", important: true,
    body: "Hi Maya,\n\nI pulled together three venue options for the leadership offsite on November 18. The Harbor Room can hold 24 people and has the AV setup we need. Could you let me know which one you prefer by Friday so I can secure the date?\n\nI’ve attached the updated cost breakdown. Happy to walk through it if helpful.\n\nBest,\nOlivia",
    aiContext: { classification: "Client to Reply", summary: "Olivia needs your choice of venue for the November leadership offsite by Friday.", extractedDates: ["Nov 18 · Offsite", "Friday · Venue decision"], actionItems: ["Choose a venue", "Approve the cost breakdown"], whyClientNeeded: "This is a personal preference and budget approval that only you can make. Olivia needs your selection before she can book the venue.", suggestedReply: "Hi Olivia,\n\nThanks for pulling these options together. The Harbor Room looks great—please go ahead and reserve it for November 18.\n\nBest,\nMaya" },
  },
  {
    id: "2", senderName: "Daniel Foster", senderEmail: "daniel@evergreenlabs.com", initials: "DF",
    subject: "Re: Intro call next week", timestamp: "9:18 AM", isUnread: true, status: "inbox",
    body: "Hello,\n\nThanks for connecting us, Maya. I’d love to find 30 minutes next week to discuss the partnership. I’m available Tuesday after 2pm or Thursday morning.\n\nLet me know what works and I’ll send an invite.\n\nRegards,\nDaniel",
    aiContext: { classification: "Assistant to Reply", summary: "Daniel is available Tuesday afternoon or Thursday morning for a 30-minute partnership introduction.", extractedDates: ["Tuesday · After 2 PM", "Thursday · Morning"], actionItems: ["Pick an available time", "Send a calendar invite"], whyClientNeeded: "", suggestedReply: "Hi Daniel,\n\nThursday at 10:00 AM works well. I’ll send a calendar invitation shortly.\n\nBest,\nMaya’s team" },
  },
  {
    id: "3", senderName: "Priya Kapoor", senderEmail: "priya@meridianadvisors.com", initials: "PK",
    subject: "Board deck — final approval needed", timestamp: "Yesterday", isUnread: true, status: "inbox", important: true,
    body: "Maya,\n\nThe final board presentation is ready for your review. Before we circulate it to the directors, please confirm the revised revenue outlook on slide 12 and the acquisition language on slide 19.\n\nIf you approve, a quick reply by end of day would be ideal.\n\nThank you,\nPriya",
    aiContext: { classification: "Client to Reply", summary: "Priya needs your approval on two sensitive sections of the board deck by end of day.", extractedDates: ["Today · End of day"], actionItems: ["Review revenue outlook · slide 12", "Approve acquisition language · slide 19"], whyClientNeeded: "The revenue outlook and acquisition language are confidential strategic decisions that require your direct review and approval.", suggestedReply: "Hi Priya,\n\nI’ve reviewed slides 12 and 19 and approve both revisions. Please circulate the deck to the directors.\n\nThanks,\nMaya" },
  },
  {
    id: "4", senderName: "Marcus Lee", senderEmail: "marcus@brightline.io", initials: "ML",
    subject: "Updated invoice for October", timestamp: "Yesterday", isUnread: false, status: "inbox",
    body: "Hi Maya’s team,\n\nPlease find attached the corrected October invoice with the updated billing address. The total remains unchanged. Payment is due November 30.\n\nLet me know if you need anything else.\n\nMarcus",
    aiContext: { classification: "Assistant to Reply", summary: "Marcus sent the corrected October invoice; payment is due November 30.", extractedDates: ["Nov 30 · Payment due"], actionItems: ["File corrected invoice", "Schedule payment before due date"], whyClientNeeded: "", suggestedReply: "Hi Marcus,\n\nReceived, thank you. We’ll process the corrected invoice before the due date.\n\nBest,\nMaya’s team" },
  },
  {
    id: "5", senderName: "The Daily Brief", senderEmail: "newsletter@dailybrief.com", initials: "DB",
    subject: "Your Monday morning briefing", timestamp: "Monday", isUnread: false, status: "inbox",
    body: "Good morning,\n\nHere are today’s top stories across markets, technology, and policy. Markets opened higher this morning as investors await the latest inflation report. In technology, several major AI announcements are expected this week.\n\nThe Daily Brief team",
    aiContext: { classification: "No Reply Needed", summary: "The Daily Brief newsletter shares market and technology headlines for Monday.", extractedDates: [], actionItems: ["Review when convenient"], whyClientNeeded: "", suggestedReply: "" },
  },
  {
    id: "6", senderName: "Sofia Martinez", senderEmail: "sofia@northstar.co", initials: "SM",
    subject: "Re: Flight itinerary for New York", timestamp: "Monday", isUnread: false, status: "inbox", important: true,
    body: "Hi Maya,\n\nI found a nonstop flight that matches your preferred schedule. Delta 418 departs SFO at 8:10 AM on Nov 14 and returns Nov 16 at 6:35 PM. Your seat preference is available.\n\nShould I go ahead and book this itinerary?\n\nSofia",
    aiContext: { classification: "Client to Reply", summary: "Sofia found a nonstop New York itinerary and is waiting for your approval to book.", extractedDates: ["Nov 14 · Depart SFO", "Nov 16 · Return"], actionItems: ["Confirm flight itinerary", "Approve booking"], whyClientNeeded: "Booking travel involves your personal schedule and payment approval. Sofia is holding the itinerary pending your confirmation.", suggestedReply: "Hi Sofia,\n\nThat itinerary works for me. Please go ahead and book it with my usual preferences.\n\nThank you,\nMaya" },
  },
  {
    id: "7", senderName: "Nora Williams", senderEmail: "nora@greenhouse.org", initials: "NW",
    subject: "Thank you for the introduction", timestamp: "Friday", isUnread: false, status: "inbox",
    body: "Hi Maya,\n\nJust a quick note to say thank you for introducing me to the team at Cedar & Co. We had a wonderful conversation and are looking forward to exploring the collaboration.\n\nWarmly,\nNora",
    aiContext: { classification: "No Reply Needed", summary: "Nora thanked you for the introduction and shared a positive update.", extractedDates: [], actionItems: ["No action needed"], whyClientNeeded: "", suggestedReply: "" },
  },
]
