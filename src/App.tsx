import { useCallback, useState } from "react"
import { AssistantDashboard } from "./components/AssistantDashboard"
import { ClientDashboard } from "./components/ClientDashboard"
import { Onboarding } from "./components/Onboarding"
import { seedEmails } from "./email-data"
import type { Email } from "./email-types"

type CurrentView = "ONBOARDING" | "ASSISTANT" | "CLIENT"

export default function App() {
  const [currentView, setCurrentView] = useState<CurrentView>("ONBOARDING")
  const [emails, setEmails] = useState<Email[]>(seedEmails)
  const finishOnboarding = useCallback(() => setCurrentView("ASSISTANT"), [])
  const markHandled = (id: string) => setEmails((current) => current.map((email) => email.id === id ? { ...email, status: "archived" } : email))
  const delegateToAssistant = (id: string) => setEmails((current) => current.map((email) => email.id === id ? { ...email, aiContext: { ...email.aiContext, classification: "Assistant to Reply" } } : email))

  return <div className="light min-h-screen">{currentView === "ONBOARDING" ? <Onboarding onComplete={finishOnboarding}/> : currentView === "CLIENT" ? <ClientDashboard emails={emails} onHandled={markHandled} onDelegate={delegateToAssistant} onAssistant={() => setCurrentView("ASSISTANT")}/> : <AssistantDashboard emails={emails} setEmails={setEmails} onClientView={() => setCurrentView("CLIENT")}/>}</div>
}
