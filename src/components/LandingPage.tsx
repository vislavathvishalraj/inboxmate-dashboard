import { useEffect } from "react"
//import CanvasRevealCards from "@/components/CanvasRevealCards";
import { motion } from "framer-motion"

import {

  ArrowRight,

  ArrowUpRight,

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



// Import the Shadcn Button

import { Button } from "@/components/ui/button"

// Import GhostFibers from the React Bits CLI installation

// (If your CLI put it inside the 'ui' folder, change this to "@/components/ui/GhostFibers")

import GhostFibers from "@/components/GhostFibers"

import BounceCards from "@/components/BounceCards"
import { NoiseBackground } from "@/components/noise-background"

import TechText from "../../components/TechText"

import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe"
import CanvasRevealCards from "@/components/CanvasRevealCards"



interface LandingPageProps {

  onEnter: () => void

}



const sampleMarkers: GlobeMarker[] = [

  { lat: 40.7128, lng: -74.006, src: "https://assets.aceternity.com/avatars/1.webp", label: "New York" },

  { lat: 51.5074, lng: -0.1278, src: "https://assets.aceternity.com/avatars/2.webp", label: "London" },

  { lat: 35.6762, lng: 139.6503, src: "https://assets.aceternity.com/avatars/3.webp", label: "Tokyo" },

  { lat: -33.8688, lng: 151.2093, src: "https://assets.aceternity.com/avatars/4.webp", label: "Sydney" },

  { lat: 48.8566, lng: 2.3522, src: "https://assets.aceternity.com/avatars/5.webp", label: "Paris" },

  { lat: 28.6139, lng: 77.209, src: "https://assets.aceternity.com/avatars/6.webp", label: "New Delhi" },

  { lat: 55.7558, lng: 37.6173, src: "https://assets.aceternity.com/avatars/7.webp", label: "Moscow" },

  { lat: -22.9068, lng: -43.1729, src: "https://assets.aceternity.com/avatars/8.webp", label: "Rio de Janeiro" },

  { lat: 31.2304, lng: 121.4737, src: "https://assets.aceternity.com/avatars/9.webp", label: "Shanghai" },

  { lat: 25.2048, lng: 55.2708, src: "https://assets.aceternity.com/avatars/10.webp", label: "Dubai" },

  { lat: -34.6037, lng: -58.3816, src: "https://assets.aceternity.com/avatars/11.webp", label: "Buenos Aires" },

  { lat: 1.3521, lng: 103.8198, src: "https://assets.aceternity.com/avatars/12.webp", label: "Singapore" },

  { lat: 37.5665, lng: 126.978, src: "https://assets.aceternity.com/avatars/13.webp", label: "Seoul" },

]

const assistantImages = [
  "https://images.unsplash.com/photo-1724152312974-d4d48b8b36fd?w=480&h=480&fit=crop",
  "https://images.unsplash.com/photo-1762846818262-33c197852fa8?w=480&h=480&fit=crop",
  "https://images.unsplash.com/photo-1721407964262-f9864b562453?w=480&h=480&fit=crop",
  "https://images.unsplash.com/photo-1776394254711-4a0d7345269a?w=480&h=480&fit=crop",
  "https://images.unsplash.com/photo-1763440519433-5467759054fc?w=480&h=480&fit=crop",
]

const featureImages = [
  { src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=85", alt: "A modern workspace for intelligent email routing" },
  { src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=85", alt: "Planning and drafting executive communications" },
  { src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=85", alt: "A team collaborating in a focused workspace" },
  {src:"https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?auto=format&fit=crop&w=800&q=85", alt:"A team collaborating in a focused workspace"},  
  {src:"https://images.unsplash.com/photo-1491911923017-19f90d8d7f83?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D?auto=format&fit=crop&w=800&q=85", alt:"A team collaborating in a focused workspace"}, 
]



export function LandingPage({ onEnter }: LandingPageProps) {

  // Listen for Enter key to provide Superhuman-like keyboard-first navigation*

  useEffect(() => {

    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Enter" && !e.shiftKey && !e.metaKey && !e.ctrlKey) {

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

    <div className="relative min-h-screen overflow-x-hidden bg-[#090b14] text-slate-100 selection:bg-indigo-500 selection:text-white font-sans">



      {/* Background Animated Gradients & Subtle Grid */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">

        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />



        <motion.div

          animate={{ x: [0, 25, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}

          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}

          className="absolute -top-32 left-1/4 h-[550px] w-[550px] rounded-full bg-gradient-to-tr from-indigo-600/25 via-violet-600/20 to-transparent blur-[130px]"

        />

        <motion.div

          animate={{ x: [0, -30, 0], y: [0, 25, 0], scale: [1, 1.08, 1] }}

          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}

          className="absolute top-1/3 -right-36 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-purple-600/20 via-indigo-500/15 to-transparent blur-[140px]"

        />

        <div className="absolute bottom-10 left-1/3 h-[450px] w-[450px] rounded-full bg-indigo-900/20 blur-[130px]" />



        <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      </div>



      {/* REACT BITS GHOST FIBERS COMPONENT */}

      <div

        aria-hidden="true"

        className="pointer-events-none fixed inset-0 z-10 opacity-60 mix-blend-screen"

      >

        <GhostFibers

          glowColor="#8b5cf6"

          lineColor="#c4b5fd"

          threads={48}

          particles={0.25}

          mouseInteraction={false}

        />

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



        <div className="flex items-center gap-3">



          <Button

            onClick={onEnter}

            variant="ghost"

            size="sm"

            className="border border-white/10 bg-white/[0.04] px-4 text-xs font-medium text-slate-200 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"

          >

            Enter Workspace

            <ArrowRight size={13} className="ml-1.5 transition-transform group-hover:translate-x-0.5" />

          </Button>

        </div>

      </header>



      {/* Hero Section */}

      <main className="relative z-20 mx-auto max-w-7xl px-6 pt-12 pb-24 sm:pt-20 lg:px-8">

        <div className="mx-auto max-w-4xl text-center">

          <motion.div

            initial={{ opacity: 0, y: 14 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.5 }}

            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300 shadow-[0_0_20px_-5px_rgba(99,102,241,0.3)] backdrop-blur-md"

          >

           
            <span>Superhuman Velocity × Executive AI Intelligence</span>

            <span className="rounded-full bg-indigo-400/20 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-200">

              v2.4

            </span>

          </motion.div>


          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 flex flex-col items-center text-4xl font-extrabold leading-none tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            <span className="block w-full max-w-4xl leading-none text-indigo-100">
              <TechText
                text="The AI Copilot For"
                fontSize={100}
                fontWeight={800}
                color="#e0e7ff"
                accentColor="#a5b4fc"
                lineStyle="dashed"
                reveal="letter"
                labels={false}
              />
            </span>

            <span className="block w-full max-w-4xl leading-none text-indigo-100">
              <TechText
                text="Elite Personal Assistants."
                fontSize={72}
                fontWeight={800}
                color="#e0e7ff"
                accentColor="#a5b4fc"
                lineStyle="dashed"
                reveal="letter"
                labels={false}
              />
            </span>
          </motion.h1>

          <motion.p

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.6, delay: 0.2 }}

            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-xl sm:leading-8"

          >

            Automatically triage your client&apos;s inbox, draft replies, and extract action items in

            real-time.

          </motion.p>



          <motion.div

            initial={{ opacity: 0, y: 22 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.6, delay: 0.3 }}

            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row relative z-50"

          >

            <NoiseBackground

              gradientColors={["rgb(99, 102, 241)", "rgb(139, 92, 246)", "rgb(79, 70, 229)"]}

              noiseIntensity={0.35}

              speed={0.08}

              containerClassName="rounded-2xl bg-transparent p-0 shadow-[0_0_40px_-8px_rgba(99,102,241,0.65)]"

              className="rounded-2xl p-0"

            >

              <motion.button

                whileHover={{ scale: 1.03 }}

                whileTap={{ scale: 0.98 }}

                onClick={onEnter}

                className="group relative flex h-14 items-center justify-center gap-3.5 rounded-2xl bg-indigo-950/35 px-9 text-base font-semibold text-white ring-1 ring-white/20 transition-all hover:bg-indigo-900/35 hover:shadow-[0_0_60px_-4px_rgba(129,140,248,0.85)] sm:h-16 sm:px-11 sm:text-lg cursor-pointer"

              >

               

                <span>Enter Workspace</span>

                <kbd className="hidden items-center gap-1 rounded-md border border-white/25 bg-white/15 px-2 py-0.5 text-xs font-mono font-medium text-white/90 backdrop-blur-sm sm:inline-flex">

                  ↵ Enter

                </kbd>

                <ArrowRight

                  size={18}

                  className="transition-transform group-hover:translate-x-1 sm:hidden"

                />

              </motion.button>

            </NoiseBackground>

          </motion.div>



          <motion.div

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

            transition={{ duration: 0.8, delay: 0.4 }}

            className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400"

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

          <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-r from-indigo-500/30 via-violet-500/20 to-sky-500/25 opacity-70 blur-2xl" />



          <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-slate-950/75 p-3 shadow-[0_30px_90px_-20px_rgba(40,30,90,0.65)] backdrop-blur-2xl sm:p-5">

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



            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

              {/* Left Column: Triaged Email Queue */}

              <div className="space-y-2 lg:col-span-5">

                <div className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">

                  Incoming Executive Stream

                </div>



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

              </div>



              {/* Right Column: AI Analysis */}

              <div className="space-y-3 lg:col-span-7">

                <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-violet-950/30 p-4 shadow-lg backdrop-blur-xl">

                  <div className="flex items-center justify-between border-b border-indigo-500/20 pb-3">

                    <div className="flex items-center gap-2">

                      <div className="flex size-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">

                        

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



                  <div className="mt-3">

                    <div className="text-[10px] font-semibold uppercase tracking-wider text-indigo-300">

                      Executive Summary

                    </div>

                    <p className="mt-1 text-xs leading-relaxed text-slate-200">

                      Olivia needs your choice of venue for the November leadership offsite by Friday.

                      The Harbor Room is held with full AV for 24 people.

                    </p>

                  </div>



                  <div className="mt-3 rounded-xl border border-violet-500/20 bg-violet-500/10 p-2.5">

                    <div className="flex items-center gap-1.5 text-[10px] font-semibold text-violet-300">

                      <ShieldCheck size={12} />

                      Why Client Attention is Required

                    </div>

                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-300">

                      This is a personal preference and budget approval only you can make before booking.

                    </p>

                  </div>



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

        </motion.div>



        {/* Executive Assistant Showcase */}
        

        {/* Global AI Network */}
        <section className="relative mt-28 overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-indigo-950/30 via-slate-950/70 to-[#090b14] px-6 py-14 sm:mt-36 sm:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              GLOBAL AI NETWORK
            </span>
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-5xl">
              Intelligence Without
              <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-sky-300 bg-clip-text text-transparent">
                Geographic Boundaries.
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Your AI-powered executive assistant works across time zones, connects distributed teams,
              and keeps every important conversation moving — wherever business happens.
            </p>
          </div>

          <div className="relative mx-auto mt-6 h-[360px] w-full max-w-4xl sm:h-[500px]">
            <div className="absolute inset-0 rounded-full bg-indigo-500/10 blur-[100px]" />
            <Globe3D
              markers={sampleMarkers}
              config={{
                atmosphereColor: "#4da6ff",
                atmosphereIntensity: 20,
                bumpScale: 5,
                autoRotateSpeed: 0.3,
              }}
            />
          </div>

{/* Features Grid: Aceternity Minimalist Cards */}
          <div >
            
            <CanvasRevealCards />
          </div>
        </section>



        {/* Features Grid */}

        <section className="mt-28 sm:mt-36">

          <div className="mx-auto max-w-2xl text-center">

            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">

              Architected for High-Stakes Inboxes

            </h2>

            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">

              Precision tooling for executive partnerships.

            </p>

          </div>



          <div className="mt-10 flex justify-center overflow-hidden" aria-label="Executive inbox features">
            <BounceCards
              images={featureImages}
              containerWidth={560}
              containerHeight={340}
              cardSize={240}
              spread={105}
              rotation={8}
              pushDistance={150}
              hoverScale={1.05}
              animationDelay={0.2}
              animationStagger={0.08}
              borderWidth={5}
              borderColor="#ffffff"
              radius={24}
              shadow
              enableHover
            />
          </div>

          

        </section>



        {/* Bottom CTA Banner */}



      </main>



      {/* Footer */}

      
{/* Premium Inboxmate Footer */}
<footer className="relative z-20 mt-10 overflow-hidden border-t border-white/[0.08] bg-[#080a13]">

  {/* Background glow */}
  <div className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/[0.12] blur-[110px]" />

  <div className="relative mx-auto max-w-7xl px-6 pb-6 pt-16 lg:px-8">

    {/* Main footer content */}
    <div className="grid grid-cols-1 gap-12 border-b border-white/[0.08] pb-12 md:grid-cols-2 lg:grid-cols-12">

      {/* Brand section */}
      <div className="lg:col-span-5">

        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/15">
            <Mail size={21} />
          </div>

          <div className="flex items-baseline">
            <span className="text-xl font-semibold tracking-tight text-white">
              inbox
            </span>
            <span className="text-xl font-bold tracking-tight text-indigo-400">
              mate
            </span>
          </div>
        </div>

        <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
          Your intelligent executive assistant. Bringing email,
          communication, and decision-making together through
          the power of AI.
        </p>

        {/* Status */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.05] px-3 py-2">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-emerald-300">
            Built for smarter workflows
          </span>
        </div>

      </div>

      {/* Product links */}
      <div className="lg:col-span-2">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
          Product
        </h3>

        <ul className="mt-6 space-y-4 text-sm text-slate-400">
          <li>
            <a href="#global-network" className="transition-colors hover:text-indigo-300">
              Global AI Network
            </a>
          </li>
          <li>
            <a href="#features" className="transition-colors hover:text-indigo-300">
              Features
            </a>
          </li>
          <li>
            <button onClick={onEnter} className="transition-colors hover:text-indigo-300">
              Workspace
            </button>
          </li>
        </ul>
      </div>

      {/* Capabilities */}
      <div className="lg:col-span-2">
        <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
          Capabilities
        </h3>

        <ul className="mt-6 space-y-4 text-sm text-slate-400">
          <li>Intelligent Routing</li>
          <li>AI Auto-Drafting</li>
          <li>Client Zen Mode</li>
          <li>Real-time Triage</li>
        </ul>
      </div>

      {/* CTA */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-indigo-400/15 bg-gradient-to-br from-indigo-500/[0.12] via-violet-500/[0.06] to-transparent p-5">

          <div className="flex items-center gap-2 text-indigo-300">
           
            <span className="text-xs font-semibold uppercase tracking-wider">
              Work smarter
            </span>
          </div>

          <h3 className="mt-4 text-lg font-semibold text-white">
            Your inbox deserves intelligence.
          </h3>

          <p className="mt-2 text-xs leading-6 text-slate-400">
            Spend less time managing emails and more time
            making meaningful decisions.
          </p>

          <button
            onClick={onEnter}
            className="group mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400"
          >
            Enter Workspace
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

        </div>
      </div>

    </div>

    {/* Bottom footer */}
    <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-left">

      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
        <span>© {new Date().getFullYear()} Inboxmate.</span>
        <span className="hidden sm:inline">·</span>
        <span>Intelligence behind every inbox.</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck size={14} className="text-indigo-400" />
        <span>Designed with privacy in mind</span>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors hover:text-white"
      >
        Back to top
        <ArrowUpRight size={14} />
      </button>

    </div>

  </div>
</footer>


    </div>

  )

}