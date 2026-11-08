"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Search, Sun, Moon, Sparkles } from "lucide-react"

// ==========================================
// EDITABLE CONSTANTS
// ==========================================

/**
 * Mobile PageSpeed score (0-100).
 * Set to a number (e.g. 98) or set to null if unmeasured/omitted.
 */
export const PAGESPEED_SCORE: number | null = 98

/**
 * Live demo destination URL for the production product tile (Tile C).
 */
export const DEMO_URL = "https://cybexonics-spa-os-demo.vercel.app/"

/**
 * Impact metrics displayed and animated in the Numbers tile (Tile F).
 */
export const IMPACT_STATS = [
  { target: 25, suffix: "+", label: "Happy clients" },
  { target: 50, suffix: "+", label: "Projects delivered" },
  { target: 10, suffix: "+", label: "Industries served" },
]

// ==========================================
// HELPER SUBCOMPONENTS
// ==========================================

/**
 * Animated count-up counter that smoothly increments to the target number
 * once when scrolled into view. Respects prefers-reduced-motion.
 */
function CountUpStat({
  target,
  suffix,
  label,
  shouldReduceMotion,
}: {
  target: number
  suffix: string
  label: string
  shouldReduceMotion: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })
  const [current, setCurrent] = useState(shouldReduceMotion ? target : 0)

  useEffect(() => {
    if (shouldReduceMotion) {
      setCurrent(target)
      return
    }

    if (!isInView) return

    let startTime: number | null = null
    const duration = 1200 // 1.2s ease-out

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    let frameId: number
    const step = (now: number) => {
      if (!startTime) startTime = now
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = easeOutCubic(progress)
      setCurrent(Math.round(eased * target))

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        setCurrent(target)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, target, shouldReduceMotion])

  return (
    <div ref={ref} className="flex flex-col">
      <div className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums flex items-baseline">
        <span>{current}</span>
        <span className="text-red-600 ml-0.5">{suffix}</span>
      </div>
      <span className="text-xs sm:text-sm font-medium text-[#6E6E73] dark:text-[#A1A1A6] mt-1 leading-snug">
        {label}
      </span>
    </div>
  )
}

/**
 * Animated SVG circular progress ring for the Speed tile (Tile D).
 */
function SpeedProgressRing({
  score,
  shouldReduceMotion,
}: {
  score: number | null
  shouldReduceMotion: boolean
}) {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-20px" })

  const radius = 38
  const circumference = 2 * Math.PI * radius
  const targetOffset =
    score !== null
      ? circumference - (score / 100) * circumference
      : circumference

  const [strokeOffset, setStrokeOffset] = useState(
    shouldReduceMotion || score === null ? targetOffset : circumference
  )

  useEffect(() => {
    if (shouldReduceMotion || score === null) {
      setStrokeOffset(targetOffset)
      return
    }

    if (isInView) {
      const timer = setTimeout(() => {
        setStrokeOffset(targetOffset)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isInView, targetOffset, shouldReduceMotion, score])

  return (
    <div className="relative w-28 h-28 flex items-center justify-center my-auto">
      <svg
        ref={ref}
        className="w-full h-full -rotate-90 transform"
        viewBox="0 0 96 96"
        aria-hidden="true"
      >
        {/* Background track */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-slate-100 dark:stroke-white/10"
          strokeWidth="7"
          fill="none"
        />
        {/* Animated fill ring */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          className="stroke-emerald-500 transition-[stroke-dashoffset] duration-1000 ease-out"
          strokeWidth="7"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Center score */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        {score !== null ? (
          <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
            {score}
          </span>
        ) : (
          /* TODO: PAGESPEED_SCORE is null, score number omitted */
          <span className="text-2xl font-semibold text-slate-400 dark:text-slate-600">
            --
          </span>
        )}
      </div>
    </div>
  )
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function WhyChooseBento() {
  const shouldReduceMotion = useReducedMotion()

  // Track live times for UK & India without SSR hydration mismatch
  const [mounted, setMounted] = useState(false)
  const [timeData, setTimeData] = useState({
    ukTime: "12:00:00",
    ukHour: 12,
    indiaTime: "17:30:00",
    indiaHour: 17,
  })

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()

      const ukFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })

      const ukHourFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "numeric",
        hour12: false,
      })

      const indiaFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })

      const indiaHourFormatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        hour12: false,
      })

      setTimeData({
        ukTime: ukFormatter.format(now),
        ukHour: parseInt(ukHourFormatter.format(now), 10),
        indiaTime: indiaFormatter.format(now),
        indiaHour: parseInt(indiaHourFormatter.format(now), 10),
      })
    }

    updateTimes()
    setMounted(true)

    const timer = setInterval(updateTimes, 1000)
    return () => clearInterval(timer)
  }, [])

  // Cursor following specular light effect on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`)
  }

  // Animation variants
  const tileVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.45,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  }

  const stackChips = [
    { name: "Next.js", floatY: [-4, 4, -4], duration: 4.5 },
    { name: "React", floatY: [3, -5, 3], duration: 5.2 },
    { name: "TypeScript", floatY: [-5, 3, -5], duration: 4.8 },
    { name: "Tailwind CSS", floatY: [4, -4, 4], duration: 5.0 },
  ]

  return (
    <section
      className="w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F5F5F7] dark:bg-[#000000] transition-colors duration-300"
      aria-labelledby="why-choose-heading"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Heading & Subheading */}
        <div className="text-center mb-14 md:mb-20">
          <h2
            id="why-choose-heading"
            className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight"
          >
            Why Choose{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              CYBEXONICS?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-[#6E6E73] dark:text-[#A1A1A6] max-w-3xl mx-auto leading-relaxed">
            We combine technical expertise with business understanding to deliver
            solutions that drive real results.
          </p>
        </div>

        {/* Bento Grid: 4 cols x 3 rows on lg, 2 cols on md, 1 col on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
          {/* ============================================================ */}
          {/* TILE A: Stack (Dark Tile, cols 1-2, rows 1-2 on desktop) */}
          {/* ============================================================ */}
          <motion.div
            custom={0}
            variants={tileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-[28px] md:rounded-[32px] p-8 md:p-10 bg-[#1D1D1F] text-white ring-1 ring-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.25)] flex flex-col justify-between transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-2 min-h-[380px] lg:min-h-[500px]"
          >
            {/* Subtle red radial glow & cursor-follow glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-red-600/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(450px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(255,255,255,0.08), transparent 75%)",
              }}
              aria-hidden="true"
            />

            {/* Content Top */}
            <div className="relative z-10">
              <h3 className="text-[22px] md:text-[28px] font-semibold tracking-tight text-white mb-3">
                Modern Engineering Stack
              </h3>
              <p className="text-[16px] text-[#A1A1A6] leading-relaxed max-w-md">
                Production-grade foundations using Next.js, React, TypeScript, and
                Tailwind CSS for speed, scale, and longevity.
              </p>
            </div>

            {/* Visual Floating Tech Chips */}
            <div
              className="relative z-10 my-auto py-8 flex flex-wrap gap-3 items-center justify-center"
              aria-hidden="true"
            >
              {stackChips.map((chip, idx) => (
                <motion.div
                  key={chip.name}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: chip.floatY,
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : {
                          duration: chip.duration,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                          delay: idx * 0.4,
                        }
                  }
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/15 backdrop-blur-md shadow-sm transition-colors duration-200"
                >
                  {chip.name}
                </motion.div>
              ))}
            </div>

            {/* Subtle bottom accent detail */}
            <div className="relative z-10 flex items-center gap-2 text-xs text-[#A1A1A6]">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>Full-stack web & mobile architecture</span>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* TILE B: Time zones (cols 3-4, row 1 on desktop) */}
          {/* ============================================================ */}
          <motion.div
            custom={1}
            variants={tileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-[28px] md:rounded-[32px] p-8 md:p-10 bg-[#FFFFFF] dark:bg-[#1D1D1F] text-slate-900 dark:text-white ring-1 ring-black/5 dark:ring-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[260px]"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(220,38,38,0.05), transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div>
              <h3 className="text-[22px] md:text-[28px] font-semibold tracking-tight mb-2">
                Cross-Time Zone Delivery
              </h3>
              <p className="text-[16px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Overlapping working hours across the UK and India ensure seamless
                collaboration and round-the-clock progress.
              </p>
            </div>

            {/* Clocks Container */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              {/* UK Clock */}
              <div
                className="p-3.5 sm:p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between"
                aria-label={`Current time in London UK: ${timeData.ukTime}`}
              >
                <div className="flex items-center justify-between text-xs text-[#6E6E73] dark:text-[#A1A1A6] mb-1">
                  <span className="font-medium text-slate-900 dark:text-white">UK</span>
                  <span className="flex items-center gap-1">
                    {timeData.ukHour >= 6 && timeData.ukHour < 18 ? (
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                    <span className="text-[10px] hidden sm:inline">Europe/London</span>
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
                  {mounted ? timeData.ukTime : "--:--:--"}
                </div>
              </div>

              {/* India Clock */}
              <div
                className="p-3.5 sm:p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col justify-between"
                aria-label={`Current time in India: ${timeData.indiaTime}`}
              >
                <div className="flex items-center justify-between text-xs text-[#6E6E73] dark:text-[#A1A1A6] mb-1">
                  <span className="font-medium text-slate-900 dark:text-white">India</span>
                  <span className="flex items-center gap-1">
                    {timeData.indiaHour >= 6 && timeData.indiaHour < 18 ? (
                      <Sun className="w-3.5 h-3.5 text-amber-500" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-indigo-400" />
                    )}
                    <span className="text-[10px] hidden sm:inline">Asia/Kolkata</span>
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white tabular-nums">
                  {mounted ? timeData.indiaTime : "--:--:--"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* TILE C: Live product (col 3, row 2 on desktop) */}
          {/* ============================================================ */}
          <motion.div
            custom={2}
            variants={tileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-[28px] md:rounded-[32px] p-8 md:p-10 bg-[#FFFFFF] dark:bg-[#1D1D1F] text-slate-900 dark:text-white ring-1 ring-black/5 dark:ring-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 min-h-[340px]"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(350px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(220,38,38,0.05), transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div>
              <h3 className="text-[22px] md:text-[24px] font-semibold tracking-tight mb-2">
                Live Product
              </h3>
              <p className="text-[15px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Real, working software serving active businesses today.
              </p>
            </div>

            {/* Mock Spa OS booking screen */}
            <div
              className="my-4 p-3 rounded-2xl bg-[#F5F5F7] dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2 text-xs"
              aria-hidden="true"
            >
              {/* Mock Header */}
              <div className="flex items-center justify-between pb-1.5 border-b border-black/5 dark:border-white/10 text-[11px] font-medium text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Spa OS Bookings</span>
                </span>
                <span className="text-[10px] text-[#6E6E73] dark:text-[#A1A1A6]">Today</span>
              </div>

              {/* Row 1 */}
              <div className="flex items-center justify-between py-0.5">
                <div className="truncate mr-2">
                  <div className="font-medium text-slate-900 dark:text-white truncate">
                    Aroma Massage
                  </div>
                  <div className="text-[10px] text-slate-500">10:00 AM</div>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#D4AF37]/15 text-[#996515] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  60 min
                </span>
              </div>

              {/* Row 2 */}
              <div className="flex items-center justify-between py-0.5">
                <div className="truncate mr-2">
                  <div className="font-medium text-slate-900 dark:text-white truncate">
                    Deep Tissue
                  </div>
                  <div className="text-[10px] text-slate-500">11:30 AM</div>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Confirmed
                </span>
              </div>

              {/* Row 3 */}
              <div className="flex items-center justify-between py-0.5">
                <div className="truncate mr-2">
                  <div className="font-medium text-slate-900 dark:text-white truncate">
                    Hot Stone Ritual
                  </div>
                  <div className="text-[10px] text-slate-500">02:00 PM</div>
                </div>
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[#D4AF37]/15 text-[#996515] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  90 min
                </span>
              </div>
            </div>

            {/* Exactly ONE button: Try the demo */}
            <div>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071E3] focus-visible:ring-offset-2"
              >
                <span>Try the demo</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* TILE D: Speed (col 4, row 2 on desktop) */}
          {/* ============================================================ */}
          <motion.div
            custom={3}
            variants={tileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-[28px] md:rounded-[32px] p-8 md:p-10 bg-[#FFFFFF] dark:bg-[#1D1D1F] text-slate-900 dark:text-white ring-1 ring-black/5 dark:ring-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex flex-col justify-between items-center text-center transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-1 min-h-[340px]"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(350px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(220,38,38,0.05), transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div className="w-full">
              <h3 className="text-[22px] md:text-[24px] font-semibold tracking-tight mb-2">
                Engineered for Speed
              </h3>
              <p className="text-[15px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Sub-second loading times that improve conversion rates.
              </p>
            </div>

            {/* Circular progress ring */}
            <div className="my-2 flex flex-col items-center">
              <SpeedProgressRing
                score={PAGESPEED_SCORE}
                shouldReduceMotion={shouldReduceMotion ?? false}
              />
              <span className="text-xs font-medium text-[#6E6E73] dark:text-[#A1A1A6] mt-2">
                Mobile PageSpeed score
              </span>
            </div>

            <div className="w-full text-xs text-[#6E6E73] dark:text-[#A1A1A6] pt-1">
              Zero bloat, optimized assets
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* TILE E: Search visibility (cols 1-2, row 3 on desktop) */}
          {/* ============================================================ */}
          <motion.div
            custom={4}
            variants={tileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-[28px] md:rounded-[32px] p-8 md:p-10 bg-[#FFFFFF] dark:bg-[#1D1D1F] text-slate-900 dark:text-white ring-1 ring-black/5 dark:ring-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[280px]"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(220,38,38,0.05), transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div>
              <h3 className="text-[22px] md:text-[28px] font-semibold tracking-tight mb-2">
                Search Visibility
              </h3>
              <p className="text-[16px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Engineered to rank in traditional search engines and be cited in modern
                AI answer engines.
              </p>
            </div>

            {/* Mock search-result card */}
            <div
              className="mt-6 p-4 rounded-2xl bg-[#F5F5F7] dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2"
              aria-hidden="true"
            >
              {/* URL line & red #1 badge */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-[#5F6368] dark:text-[#9AA0A6] truncate">
                  <Search className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span className="truncate">https://yourbusiness.com › services</span>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 dark:bg-red-950/60 dark:text-red-400 border border-red-200/80 dark:border-red-800/60">
                  #1 Rank
                </span>
              </div>

              {/* Title */}
              <div className="text-sm sm:text-base font-semibold text-[#1A0DAB] dark:text-[#8AB4F8] hover:underline cursor-default">
                Your Business | Your City
              </div>

              {/* Snippet skeleton lines */}
              <div className="space-y-1.5 pt-0.5">
                <div className="h-2 bg-slate-200 dark:bg-white/10 rounded w-11/12" />
                <div className="h-2 bg-slate-200 dark:bg-white/10 rounded w-3/4" />
              </div>
            </div>

            {/* The 3 specified pills: SEO, AEO, GEO */}
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                SEO
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                AEO
              </span>
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                GEO
              </span>
            </div>
          </motion.div>

          {/* ============================================================ */}
          {/* TILE F: Numbers (cols 3-4, row 3 on desktop) */}
          {/* ============================================================ */}
          <motion.div
            custom={5}
            variants={tileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            className="group relative overflow-hidden rounded-[28px] md:rounded-[32px] p-8 md:p-10 bg-[#FFFFFF] dark:bg-[#1D1D1F] text-slate-900 dark:text-white ring-1 ring-black/5 dark:ring-white/10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] flex flex-col justify-between transition-all duration-300 md:hover:-translate-y-1 md:hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] col-span-1 md:col-span-2 lg:col-span-2 lg:row-span-1 min-h-[280px]"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(400px circle at var(--mouse-x, -1000px) var(--mouse-y, -1000px), rgba(220,38,38,0.05), transparent 70%)",
              }}
              aria-hidden="true"
            />

            <div>
              <h3 className="text-[22px] md:text-[28px] font-semibold tracking-tight mb-2">
                Proven Track Record
              </h3>
              <p className="text-[16px] text-[#6E6E73] dark:text-[#A1A1A6] leading-relaxed">
                Delivering dependable outcomes across every engagement.
              </p>
            </div>

            {/* Count-up metrics */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-6 pt-4 border-t border-black/5 dark:border-white/5">
              {IMPACT_STATS.map((stat) => (
                <CountUpStat
                  key={stat.label}
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  shouldReduceMotion={shouldReduceMotion ?? false}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
