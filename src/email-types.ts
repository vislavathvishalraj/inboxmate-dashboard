export type Classification = "Assistant to Reply" | "Client to Reply" | "No Reply Needed"
export type EmailStatus = "inbox" | "archived"

export type Email = {
  id: string
  senderName: string
  senderEmail: string
  initials: string
  subject: string
  body: string
  timestamp: string
  isUnread: boolean
  status: EmailStatus
  important?: boolean
  processing?: boolean
  aiContext: {
    classification: Classification
    summary: string
    extractedDates: string[]
    actionItems: string[]
    whyClientNeeded: string
    suggestedReply: string
  }
}
