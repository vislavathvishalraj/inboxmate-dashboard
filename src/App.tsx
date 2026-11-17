import { useCallback, useState } from "react"
import { AssistantDashboard } from "./components/AssistantDashboard"
import { ClientDashboard } from "./components/ClientDashboard"
import { LandingPage } from "./components/LandingPage"
import { Onboarding } from "./components/Onboarding"
import { seedEmails } from "./email-data"
import type { Email } from "./email-types"

export type CurrentView = "LANDING" | "ONBOARDING" | "ASSISTANT" | "CLIENT"

export default function App() {
  const [currentView, setCurrentView] = useState<CurrentView>("LANDING")
  const [emails, setEmails] = useState<Email[]>(seedEmails)
  const [darkMode, setDarkMode] = useState(true)

  const finishOnboarding = useCallback(() => setCurrentView("ASSISTANT"), [])

  const markHandled = (id: string) =>
    setEmails((current) =>
      current.map((email) =>
        email.id === id ? { ...email, status: "archived" } : email
      )
    )

  const delegateToAssistant = (id: string) =>
    setEmails((current) =>
      current.map((email) =>
        email.id === id
          ? {
              ...email,
              aiContext: {
                ...email.aiContext,
                classification: "Assistant to Reply",
              },
            }
          : email
      )
    )

  return (
    <div
      className={`min-h-screen ${currentView === "ASSISTANT" || currentView === "CLIENT" ? "inboxmate-dashboard" : ""} ${currentView !== "LANDING" ? (darkMode ? "dark-mode" : "light-mode") : ""}`}
    >
      <style>{`
        .inboxmate-dashboard h1 { font-weight: 700; letter-spacing: -0.035em; }
        .inboxmate-dashboard main > section:nth-of-type(2) h2 { font-weight: 700; letter-spacing: -0.025em; }
        .inboxmate-dashboard main > section:nth-of-type(1) > div.min-h-0 button > div.mb-2 span.min-w-0 { font-weight: 600; }
        .inboxmate-dashboard main > section:nth-of-type(1) > div.min-h-0 button > div.mb-1 { font-weight: 700; }
        .inboxmate-dashboard main > section:nth-of-type(2) > div.min-h-0 h2 { font-weight: 700; letter-spacing: -0.025em; }
        .inboxmate-dashboard button { font-weight: 600; }
        .inboxmate-dashboard nav button { font-weight: 600; }
        .inboxmate-dashboard [class*="uppercase"] { font-weight: 600; }
        .dark-mode { background: #080b22; color: #e2e8f0; color-scheme: dark; }
        .dark-mode main, .dark-mode section, .dark-mode aside,
        .dark-mode header, .dark-mode [class*="bg-[#f7f"], .dark-mode [class*="bg-[#faf"],
        .dark-mode [class*="bg-white"] { background-color: #0b1028 !important; }
        .dark-mode [class*="bg-gradient"] { background-image: none !important; background-color: #111630 !important; }
        .dark-mode [class*="bg-slate-50"] { background-color: #11162e !important; }
        .dark-mode [class*="bg-slate-100"] { background-color: #171d38 !important; }
        .dark-mode [class*="bg-indigo-50"] { background-color: #191b45 !important; }
        .dark-mode [class*="bg-violet-50"] { background-color: #1a173e !important; }
        .dark-mode [class*="text-slate-900"], .dark-mode [class*="text-slate-800"],
        .dark-mode [class*="text-slate-700"] { color: #e2e8f0 !important; }
        .dark-mode [class*="text-slate-600"], .dark-mode [class*="text-slate-500"] { color: #a9b5cc !important; }
        .dark-mode [class*="text-slate-400"] { color: #8795b0 !important; }
        .dark-mode [class*="border-slate-100"], .dark-mode [class*="border-slate-200"],
        .dark-mode [class*="border-indigo-100"], .dark-mode [class*="border-indigo-200"],
        .dark-mode [class*="border-violet-100"] { border-color: #242a49 !important; }
        .dark-mode input, .dark-mode textarea, .dark-mode select { background-color: #10152d !important; color: #e2e8f0 !important; border-color: #292f50 !important; }
        .dark-mode button:hover { filter: brightness(1.12); }
        .light-mode [class*="text-slate-100"], .light-mode [class*="text-slate-200"],
        .light-mode [class*="text-slate-300"], .light-mode [class*="text-gray-100"],
        .light-mode [class*="text-gray-200"], .light-mode [class*="text-gray-300"] { color: #334155 !important; }
        .light-mode input, .light-mode textarea, .light-mode select { background-color: #fff !important; color: #0f172a !important; border-color: #cbd5e1 !important; }
        .light-mode input::placeholder, .light-mode textarea::placeholder { color: #64748b !important; }
      `}</style>
      {currentView !== "LANDING" && (
        <button
          type="button"
          onClick={() => setDarkMode((enabled) => !enabled)}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          className={`fixed bottom-5 left-5 z-[60] rounded-full px-4 py-2 text-xs font-bold shadow-lg ${darkMode ? "border border-indigo-500/40 bg-[#111630] text-indigo-200" : "border border-indigo-200 bg-white text-indigo-700"}`}
        >
          {darkMode ? "☀ Light mode" : "☾ Dark mode"}
        </button>
      )}
      {currentView === "LANDING" ? (
        <LandingPage onEnter={() => setCurrentView("ONBOARDING")} />
      ) : currentView === "ONBOARDING" ? (
        <Onboarding onComplete={finishOnboarding} />
      ) : currentView === "CLIENT" ? (
        <ClientDashboard
          emails={emails}
          onHandled={markHandled}
          onDelegate={delegateToAssistant}
          onAssistant={() => setCurrentView("ASSISTANT")}
        />
      ) : (
        <AssistantDashboard
          emails={emails}
          setEmails={setEmails}
          onClientView={() => setCurrentView("CLIENT")}
          onLanding={() => setCurrentView("LANDING")}
        />
      )}
    </div>
  )
}
