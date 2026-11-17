
"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Clock3,
  Globe2,
  Workflow,
  Route,
  PenLine,
  Sparkles,
  ArrowUpRight,
  Activity,
} from "lucide-react";

import { CanvasRevealEffect } from "@/components/canvas-reveal-effect";

interface FeatureCardProps {
  number: string;
  value: string;
  title: string;
  description: string;
  label: string;
  icon: ReactNode;
  colors: number[][];
  background: string;
  accent: string;
  speed: number;
}

function FeatureCard({
  number,
  value,
  title,
  description,
  label,
  icon,
  colors,
  background,
  accent,
  speed,
}: FeatureCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45 }}
      className="group relative isolate flex min-w-0 min-h-[235px] flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0e1220] p-5 outline-none transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-[0_12px_40px_-18px_rgba(99,102,241,0.3)]"
    >
      {/* Canvas background */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute inset-0 z-0"
          >
            <CanvasRevealEffect
              animationSpeed={speed}
              containerClassName={background}
              colors={colors}
              dotSize={3}
              showGradient
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-br from-[#101426]/40 via-[#0e1220]/65 to-[#080a12]/95" />

      {/* Decorative glow */}
      <div
        className={`pointer-events-none absolute -right-12 -top-12 z-[1] size-36 rounded-full blur-[65px] opacity-10 transition-opacity duration-300 group-hover:opacity-30 ${accent}`}
      />

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col">

        {/* Top row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.2em] text-slate-500">
            CAPABILITY / {number}
          </span>

          <ArrowUpRight
            size={16}
            className="text-slate-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
          />
        </div>

        {/* Icon and value */}
        <div className="mt-5 flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-white shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:bg-white/10">
            {icon}
          </div>

          <div className="min-w-0">
            <p className="text-2xl font-bold tracking-tight text-white">
              {value}
            </p>
            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              {label}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 h-px w-full bg-gradient-to-r from-white/15 via-white/[0.06] to-transparent" />

        {/* Description */}
        <div className="mt-auto">
          <h3 className="text-base font-semibold tracking-tight text-white">
            {title}
          </h3>

          <p className="mt-2 text-[13px] leading-[1.7] text-slate-400">
            {description}
          </p>
        </div>

        {/* Bottom indicator */}
        <div className="mt-4 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.7)]" />
          <span className="text-[10px] font-medium tracking-wide text-slate-500">
            Integrated capability
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function CanvasRevealCards() {
  const cards: FeatureCardProps[] = [
    {
      number: "01",
      value: "24/7",
      title: "Always Available",
      description:
        "AI assistance that never sleeps, across every time zone.",
      label: "Always On",
      icon: <Clock3 size={21} />,
      colors: [[99, 102, 241], [129, 140, 248]],
      background: "bg-indigo-950",
      accent: "bg-indigo-500",
      speed: 0.8,
    },
    {
      number: "02",
      value: "Global",
      title: "Connected Teams",
      description:
        "Keep executives and assistants connected worldwide.",
      label: "Worldwide Access",
      icon: <Globe2 size={21} />,
      colors: [[139, 92, 246], [192, 132, 252]],
      background: "bg-violet-950",
      accent: "bg-violet-500",
      speed: 0.7,
    },
    {
      number: "03",
      value: "Real-time",
      title: "Intelligent Coordination",
      description:
        "Keep inbox priorities and important decisions moving.",
      label: "Live Coordination",
      icon: <Workflow size={21} />,
      colors: [[56, 189, 248], [125, 211, 252]],
      background: "bg-sky-950",
      accent: "bg-sky-500",
      speed: 0.9,
    },
    {
      number: "04",
      value: "Smart",
      title: "Intelligent Routing",
      description:
        "Separate executive decisions from routine tasks and notifications with precise triage.",
      label: "3-Tier Precision Triage",
      icon: <Route size={21} />,
      colors: [[99, 102, 241], [129, 140, 248]],
      background: "bg-indigo-950",
      accent: "bg-indigo-500",
      speed: 0.8,
    },
    {
      number: "05",
      value: "AI",
      title: "Auto-Drafting",
      description:
        "Gemini 1.5 Flash drafts context-rich replies matching executive tone and calendar realities.",
      label: "Adaptive Executive Voice",
      icon: <PenLine size={21} />,
      colors: [[139, 92, 246], [192, 132, 252]],
      background: "bg-violet-950",
      accent: "bg-violet-500",
      speed: 0.7,
    },
    {
      number: "06",
      value: "Focused",
      title: "Client Zen Mode",
      description:
        "A distraction-free client view surfaces only the items requiring a personal verdict or signature.",
      label: "Zero Decision Fatigue",
      icon: <Sparkles size={21} />,
      colors: [[16, 185, 129], [52, 211, 153]],
      background: "bg-emerald-950",
      accent: "bg-emerald-500",
      speed: 0.9,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden py-12">

      {/* Section heading */}
      <div className="mx-auto mb-9 max-w-[1200px] px-6">

        <div className="flex flex-wrap items-center justify-between gap-4">

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-indigo-400" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-indigo-300">
                Intelligent Ecosystem
              </span>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Everything works together.
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Six intelligent capabilities designed to simplify
              executive workflows and keep everything moving.
            </p>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
            <Activity size={17} className="text-emerald-400" />

            <div>
              <p className="text-xs font-semibold text-white">
                AI Network
              </p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                6 capabilities
              </p>
            </div>

            <span className="ml-2 size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          </div>
        </div>
      </div>

      {/* Six compact cards */}
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-4 px-6 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <FeatureCard key={card.number} {...card} />
        ))}
      </div>

    </section>
  );
}
