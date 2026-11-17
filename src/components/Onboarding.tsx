import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Check, KeyRound, Mail, Sparkles, UserRound, Workflow } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = { onComplete: () => void }
const syncSteps = ["Authenticating...", "Reading Permissions...", "Running AI Triage..."]

export function Onboarding({ onComplete }: Props) {
  const [step, setStep] = useState<"auth" | "connect" | "sync">("auth")
  const [mode, setMode] = useState<"login" | "signup">("signup")
  const [syncIndex, setSyncIndex] = useState(0)
  const [provider, setProvider] = useState("Google Workspace")

  useEffect(() => {
    if (step !== "sync") return
    const timer = window.setInterval(() => setSyncIndex((index) => {
      if (index >= syncSteps.length - 1) {
        window.clearInterval(timer)
        window.setTimeout(onComplete, 500)
        return index
      }
      return index + 1
    }), 1000)
    return () => window.clearInterval(timer)
  }, [step, onComplete])

  const startSync = (nextProvider: string) => {
    setProvider(nextProvider)
    setStep("sync")
    setSyncIndex(0)
  }

  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f6f7fb] px-5 py-12 text-slate-900">
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true"><div className="absolute -left-20 top-12 size-80 rounded-full bg-indigo-200/40 blur-3xl"/><div className="absolute -right-24 bottom-0 size-96 rounded-full bg-violet-200/50 blur-3xl"/><div className="absolute inset-0 bg-[radial-gradient(#a5a8bc_0.6px,transparent_0.6px)] bg-[size:22px_22px] opacity-[.22]"/></div>
    <motion.div initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .55, ease: "easeOut" }} className="relative w-full max-w-[480px] rounded-[30px] border border-white/80 bg-white/75 p-4 shadow-[0_32px_100px_-44px_rgba(57,52,129,.35)] backdrop-blur-2xl sm:p-5">
      <div className="mb-6 flex items-center justify-between"><a className="flex items-center gap-2.5 text-[15px] font-semibold tracking-tight" href="#home"><span className="flex size-9 items-center justify-center rounded-xl bg-[#5146e5] text-white shadow-lg shadow-indigo-200"><Mail size={18}/></span>inbox<span className="-ml-2 text-[#5146e5]">mate</span></a><div className="flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50/80 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.13em] text-indigo-700"> AI-powered inbox</div></div>
      <AnimatePresence mode="wait">
        {step === "auth" && <motion.section key="auth" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .22 }}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-indigo-600">A calmer inbox starts here</div><h1 className="text-[32px] font-semibold leading-tight tracking-[-.045em]">Make room for the work that matters.</h1><p className="mt-3 text-[14px] leading-6 text-slate-500">Your AI assistant sorts the noise. You stay in control of every reply.</p>
          <div className="mt-5 grid grid-cols-2 rounded-xl bg-slate-100/80 p-1" role="tablist" aria-label="Account type">{(["signup", "login"] as const).map((item) => <button key={item} role="tab" aria-selected={mode === item} onClick={() => setMode(item)} className={`h-9 rounded-lg text-sm font-medium capitalize transition-all ${mode === item ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>{item === "signup" ? "Create account" : "Sign in"}</button>)}</div>
          <form className="mt-4 flex flex-col gap-3" onSubmit={(event) => { event.preventDefault(); setStep("connect") }}>
            {mode === "signup" && <label className="flex flex-col gap-2 text-xs font-medium text-slate-600">Full name<div className="relative"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><Input required autoComplete="name" placeholder="Maya Chen" className="h-11 rounded-xl border-slate-200 bg-white/80 pl-10"/></div></label>}
            <label className="flex flex-col gap-2 text-xs font-medium text-slate-600">Work email<div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><Input required type="email" autoComplete="email" placeholder="you@company.com" className="h-11 rounded-xl border-slate-200 bg-white/80 pl-10"/></div></label>
            <label className="flex flex-col gap-2 text-xs font-medium text-slate-600">Password<div className="relative"><KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16}/><Input required type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} placeholder="At least 8 characters" minLength={8} className="h-11 rounded-xl border-slate-200 bg-white/80 pl-10"/></div></label>
            <Button type="submit" className="mt-2 h-12 rounded-xl bg-[#5146e5] font-semibold text-white shadow-lg shadow-indigo-200/70 hover:bg-[#4338ca]">Continue <ArrowRight data-icon="inline-end"/></Button>
          </form><p className="mt-5 text-center text-[11px] leading-5 text-slate-400">By continuing, you agree to Inboxmate&apos;s Terms and Privacy Policy.</p>
        </motion.section>}
        {step === "connect" && <motion.section key="connect" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .22 }}>
          <div className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-indigo-600">One secure connection</div><h1 className="text-[32px] font-semibold leading-tight tracking-[-.045em]">Connect your client inbox.</h1><p className="mt-3 text-[14px] leading-6 text-slate-500">Inboxmate will organize conversations and flag the ones that need your personal attention.</p>
          <div className="mt-7 flex flex-col gap-3"><Button onClick={() => startSync("Google Workspace")} variant="outline" className="h-14 justify-start gap-3 rounded-xl border-slate-200 bg-white px-4 text-slate-700 hover:bg-slate-50"><span className="flex size-8 items-center justify-center rounded-lg bg-slate-50 text-sm font-bold text-[#4285F4]">G</span><span className="flex flex-col items-start"><span className="text-sm font-semibold">Google Workspace</span><span className="text-[11px] font-normal text-slate-400">Connect Gmail securely</span></span><ArrowRight className="ml-auto text-slate-400" size={16}/></Button><Button onClick={() => startSync("Microsoft 365")} variant="outline" className="h-14 justify-start gap-3 rounded-xl border-slate-200 bg-white px-4 text-slate-700 hover:bg-slate-50"><span className="flex size-8 items-center justify-center rounded-lg bg-sky-50 text-sm font-bold text-sky-600">M</span><span className="flex flex-col items-start"><span className="text-sm font-semibold">Microsoft 365</span><span className="text-[11px] font-normal text-slate-400">Connect Outlook securely</span></span><ArrowRight className="ml-auto text-slate-400" size={16}/></Button></div>
          <button onClick={() => setStep("auth")} className="mt-5 w-full text-center text-xs font-medium text-slate-400 transition hover:text-slate-700">Back to account details</button>
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-slate-400"><Workflow size={14}/> Your inbox stays private and under your control</div>
        </motion.section>}
        {step === "sync" && <motion.section key="sync" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="py-8 text-center">
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600"><motion.div animate={{ rotate: 360 }} transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}><Workflow size={27}/></motion.div></div><div className="text-xs font-semibold uppercase tracking-[.15em] text-indigo-600">Secure sync · {provider}</div><h1 className="mt-2 text-2xl font-semibold tracking-tight">Setting up your command center</h1><p className="mt-2 text-sm text-slate-500">Your first inbox pass is almost ready.</p>
          <div className="mx-auto mt-8 max-w-[310px] text-left">{syncSteps.map((label, index) => <div key={label} className="flex items-center gap-3 border-l border-indigo-100 py-2.5 pl-4"><span className={`flex size-6 items-center justify-center rounded-full ${index < syncIndex ? "bg-emerald-100 text-emerald-700" : index === syncIndex ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-400"}`}>{index < syncIndex ? <Check size={13}/> : index === syncIndex ? <span className="size-2 animate-pulse rounded-full bg-indigo-600"/> : <span className="size-1 rounded-full bg-slate-400"/>}</span><span className={`text-sm ${index <= syncIndex ? "font-medium text-slate-800" : "text-slate-400"}`}>{label}</span></div>)}</div>
        </motion.section>}
      </AnimatePresence>
    </motion.div>
    <div className="absolute bottom-5 text-[10px] tracking-wide text-slate-400">DESIGNED FOR A MORE THOUGHTFUL INBOX</div>
  </main>
}
