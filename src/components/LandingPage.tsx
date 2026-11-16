import { useEffect } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onEnter: () => void
}

export function LandingPage({ onEnter }: LandingPageProps) {
  // Listen for Enter key to provide Superhuman-like keyboard-first navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
        // Prevent triggering if focused in an input/textarea
        if (
          document.activeElement?.tagName === "INPUT" ||
          document.activeElement?.tagName === "TEXTAREA"
        ) {
          return
        }
        e.preventDefault()
        onEnter()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onEnter])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#090b14] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Background Animated Gradients & Subtle Grid */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        {/* Subtle dot matrix grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />

        {/* Ambient colored orbs */}
        <motion.div
          animate={{
            x: [0, 25, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-indigo-600/25 via-violet-600/20 to-transparent blur-[130px]"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -right-36 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-purple-600/20 via-indigo-500/15 to-transparent blur-[140px]"
        />
        <div className="absolute bottom-10 left-1/3 h-[450px] w-[450px] rounded-full bg-indigo-900/20 blur-[130px]" />

        {/* Top subtle light beam */}
        <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
      </div>

      {/* Top Navigation */}
      <header className="relative z-30 mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#5146e5] to-violet-500 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
            <Mail size={19} />
          </div>
          <div className="flex items-baseline">
            <span className="text-lg font-semibold tracking-tight text-white">inbox</span>
            <span className="text-lg font-bold tracking-tight text-[#818cf8]">mate</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur-md sm:flex">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>Gemini 1.5 Flash</span>
          </div>

          <Button
            onClick={onEnter}
            variant="ghost"
            size="sm"
            className="group rounded-xl border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-slate-200 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Enter Workspace
            <ArrowRight size={13} className="ml-1.5 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-20 mx-auto max-w-7xl px-6 pt-12 pb-24 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] backdrop-blur-md"
          >
            <Sparkles size={13} className="text-indigo-400" />
            <span>Superhuman Velocity × Executive AI Intelligence</span>
            <span className="rounded-full bg-indigo-400/20 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-200">
              v2.4
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold tracking-[-0.035em] text-white sm:text-6xl md:text-7xl lg:leading-[1.1]"
          >
            The AI Copilot for{" "}
            <span className="bg-gradient-to-r from-indigo-200 via-indigo-100 to-violet-300 bg-clip-text text-transparent">
              Elite Personal Assistants.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-xl sm:leading-8"
          >
            Automatically triage your client&apos;s inbox, draft replies, and extract action items in
            real-time.
          </motion.p>

          {/* Call To Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={onEnter}
              className="group relative flex h-14 items-center justify-center gap-3.5 rounded-2xl bg-gradient-to-r from-[#5146e5] via-indigo-600 to-violet-600 px-9 text-base font-semibold text-white shadow-[0_0_40px_-8px_rgba(99,102,241,0.65)] ring-1 ring-white/20 transition-all hover:shadow-[0_0_60px_-4px_rgba(129,140,248,0.85)] sm:h-16 sm:px-11 sm:text-lg"
            >
              <Sparkles size={20} className="text-indigo-200 transition-transform group-hover:rotate-12" />
              <span>Enter Workspace</span>
              <kbd className="hidden items-center gap-1 rounded-md border border-white/25 bg-white/15 px-2 py-0.5 text-xs font-mono font-medium text-white/90 backdrop-blur-sm sm:inline-flex">
                ↵ Enter
              </kbd>
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1 sm:hidden"
              />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 flex items-center justify-center gap-6 text-xs text-slate-400"
          >
            <span className="flex items-center gap-1.5">
              <Check size={14} className="text-emerald-400" /> Powered by Google Gemini 1.5
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-indigo-400" /> Client Privacy Shielded
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" /> Instant Triage & Zero Noise
            </span>
          </motion.div>
        </div>

        {/* Hero Visual: Glowing Glassmorphic Mock UI Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="relative mx-auto mt-16 max-w-5xl"
        >
          {/* Subtle Back Glow */}
          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-sky-500/25 opacity-70 blur-2xl" />

          {/* Main Glassmorphic Mockup Container */}
          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/75 p-3 shadow-[0_30px_90px_-20px_rgba(40,30,90,0.65)] backdrop-blur-2xl sm:p-5">
            {/* Window Top Bar */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3 px-2">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-rose-500/80 ring-1 ring-white/10" />
                <div className="size-3 rounded-full bg-amber-500/80 ring-1 ring-white/10" />
                <div className="size-3 rounded-full bg-emerald-500/80 ring-1 ring-white/10" />
                <span className="ml-3 font-mono text-[11px] text-slate-400">
                  inboxmate · Maya Chen (Executive Inbox)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-medium text-indigo-300">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Gemini Live Triage
                </span>
              </div>
            </div>

            {/* Mock Dashboard Body */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
              {/* Left Column: Triaged Email Queue */}
              <div className="space-y-2 lg:col-span-5">
                <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Incoming Executive Stream
                </div>

                {/* Email Item 1 (Selected - Client to Reply) */}
                <div className="relative rounded-2xl border border-indigo-500/40 bg-indigo-950/30 p-3.5 shadow-inner transition-colors">
                  <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-[#6366f1]" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/20 text-xs font-bold text-indigo-300">
                        OC
                      </div>
                      <span className="text-xs font-semibold text-white">Olivia Chen</span>
                    </div>
                    <span className="text-[10px] text-slate-400">10:42 AM</span>
                  </div>
                  <div className="mt-2 text-xs font-medium text-slate-200">
                    Re: Q4 leadership offsite — venue options
                  </div>
                  <p className="mt-1 line-clamp-1 text-[11px] text-slate-400">
                    I pulled together three venue options for the leadership offsite...
                  </p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 rounded-md border border-violet-500/30 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-300">
                      <Users size={11} /> Client to Reply
                    </span>
                    <span className="text-[10px] text-indigo-400 font-medium">Needs decision</span>
                  </div>
                </div>

                {/* Email Item 2 (Assistant to Reply) */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 transition-colors hover:bg-white/[0.04]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-sky-500/10 text-xs font-bold text-sky-300">
                        DF
                      </div>
                      <span className="text-xs font-medium text-slate-300">Daniel Foster</span>
                    </div>
                    <span className="text-[10px] text-slate-500">9:18 AM</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-300">Re: Intro call next week</div>
                  <div className="mt-2 flex items-center">
                    <span className="inline-flex items-center gap-1 rounded-md border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-300">
                      Assistant to Reply
                    </span>
                  </div>
                </div>

                {/* Email Item 3 (No Reply Needed) */}
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-3.5 opacity-60">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-slate-500/10 text-xs font-bold text-slate-400">
                        DB
                      </div>
                      <span className="text-xs font-medium text-slate-400">The Daily Brief</span>
                    </div>
                    <span className="text-[10px] text-slate-600">8:00 AM</span>
                  </div>
                  <div className="mt-1 text-xs text-slate-400">Your Monday morning briefing</div>
                  <div className="mt-2 flex items-center">
                    <span className="rounded-md border border-slate-700 bg-slate-800/40 px-2 py-0.5 text-[10px] text-slate-400">
                      No Reply Needed
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: AI Analysis & Real-time Synthesis */}
              <div className="space-y-3 lg:col-span-7">
                {/* AI Executive Card */}
                <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-violet-950/30 p-4 shadow-lg backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
                        <Sparkles size={15} />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">AI Executive Copilot</div>
                        <div className="text-[10px] text-indigo-300/80">
                          Real-time Gemini 1.5 Flash Triage
                        </div>
                      </div>
                    </div>
                    <span className="rounded-md border border-violet-400/30 bg-violet-500/20 px-2 py-0.5 text-[10px] font-semibold text-violet-200">
                      Client to Reply
                    </span>
                  </div>

                  {/* Summary */}
                  <div className="mt-3">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                      Executive Summary
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-slate-200">
                      Olivia needs your choice of venue for the November leadership offsite by Friday.
                      The Harbor Room is held with full AV for 24 people.
                    </p>
                  </div>

                  {/* Why Client Needed */}
                  <div className="mt-3 rounded-xl border border-violet-500/20 bg-violet-500/10 p-2.5">
                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-violet-300">
                      <ShieldCheck size={12} />
                      Why Client Attention is Required
                    </div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">
                      This is a personal preference and budget approval only you can make before booking.
                    </p>
                  </div>

                  {/* Extracted Dates & Action Items */}
                  <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        <CalendarDays size={11} className="text-indigo-400" /> Extracted Dates
                      </div>
                      <div className="mt-1.5 space-y-1">
                        <div className="inline-block rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300 mr-1.5">
                          Nov 18 · Offsite
                        </div>
                        <div className="inline-block rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-medium text-indigo-300">
                          Friday · Deadline
                        </div>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                        <CheckCheck size={11} className="text-emerald-400" /> Action Items
                      </div>
                      <div className="mt-1.5 space-y-1 text-[10px] text-slate-300">
                        <div className="flex items-center gap-1">
                          <Check size={10} className="text-emerald-400" /> Choose preferred venue
                        </div>
                        <div className="flex items-center gap-1">
                          <Check size={10} className="text-emerald-400" /> Approve cost breakdown
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Suggested Reply */}
                  <div className="mt-3 rounded-xl border border-white/10 bg-slate-900/80 p-3">
                    <div className="flex items-center justify-between text-[10px] font-medium text-slate-400">
                      <span>Suggested Draft (One-Click Dispatch)</span>
                      <span className="text-indigo-400">Executive Tone</span>
                    </div>
                    <p className="mt-1.5 font-mono text-[11px] leading-relaxed text-indigo-200">
                      &quot;Hi Olivia, Thanks for pulling these options together. The Harbor Room looks
                      great—please go ahead and reserve it for November 18. Best, Maya&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Context Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -top-5 -right-4 hidden rounded-2xl border border-emerald-500/30 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-emerald-300 shadow-xl backdrop-blur-xl md:flex items-center gap-2"
          >
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>90% Executive Inbox Noise Eliminated</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-indigo-500/30 bg-slate-900/90 px-4 py-2 text-xs font-semibold text-indigo-300 shadow-xl backdrop-blur-xl md:flex items-center gap-2"
          >
            <Zap size={15} className="text-indigo-400" />
            <span>Structured JSON Extraction via Gemini SDK</span>
          </motion.div>
        </motion.div>

        {/* Features Grid: 3 Minimal Cards Below Hero */}
        <section className="mt-28 sm:mt-36">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Architected for High-Stakes Inboxes
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Precision tooling for executive partnerships.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Intelligent Routing */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-indigo-500/40 hover:shadow-[0_20px_50px_-15px_rgba(79,70,229,0.25)]"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 shadow-inner group-hover:scale-105 transition-transform">
                <Workflow size={22} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white tracking-tight">
                Intelligent Routing
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Instantly separate high-stakes executive decisions from routine assistant tasks and
                passive notifications. Your executive never sees noise again.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-indigo-400">
                <span>3-Tier Precision Triage</span>
                <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Card 2: Auto-Drafting */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-violet-500/40 hover:shadow-[0_20px_50px_-15px_rgba(139,92,246,0.25)]"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-300 shadow-inner group-hover:scale-105 transition-transform">
                <Sparkles size={22} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white tracking-tight">
                Auto-Drafting
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Gemini 1.5 Flash drafts context-rich replies matching executive tone and calendar
                realities. Review, customize, or send with keyboard-first speed.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-violet-400">
                <span>Adaptive Executive Voice</span>
                <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>

            {/* Card 3: Client Zen Mode */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              className="group relative rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-8 backdrop-blur-xl transition-all hover:border-emerald-500/40 hover:shadow-[0_20px_50px_-15px_rgba(16,185,129,0.25)]"
            >
              <div className="flex size-12 items-center justify-center rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-inner group-hover:scale-105 transition-transform">
                <ShieldCheck size={22} />
              </div>
              <h3 className="mt-6 text-xl font-bold text-white tracking-tight">
                Client Zen Mode
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                A dedicated, distraction-free view built exclusively for your client. It surfaces only
                the 2-3 items requiring their personal verdict or signature.
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span>Zero Decision Fatigue</span>
                <ChevronRight size={13} className="transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="mt-28 sm:mt-36">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-indigo-950/60 via-slate-900/80 to-violet-950/60 p-8 sm:p-14 text-center backdrop-blur-2xl">
            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 mb-4">
                <Bot size={24} />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to elevate your executive inbox?
              </h3>
              <p className="mt-3 text-sm text-slate-300 sm:text-base">
                Join forward-thinking executive assistants and chiefs of staff operating at
                unprecedented speed.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={onEnter}
                  size="lg"
                  className="h-14 rounded-2xl bg-gradient-to-r from-[#5146e5] to-violet-600 px-8 font-semibold text-white shadow-xl shadow-indigo-600/30 hover:from-indigo-600 hover:to-violet-500"
                >
                  <Sparkles size={18} className="mr-2" />
                  Enter Workspace
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
            {/* Background decorative glow */}
            <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 py-8 text-center text-xs text-slate-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-400">inboxmate</span>
            <span>·</span>
            <span>Executive Assistant Operating System</span>
          </div>
          <div>Press <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-slate-300">↵</kbd> anywhere to enter</div>
        </div>
      </footer>
    </div>
  )
}
