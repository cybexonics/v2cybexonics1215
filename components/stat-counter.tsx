"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

interface StatCounterProps {
  number: string
  label: string
}

export default function StatCounter({ number, label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })
  const [displayValue, setDisplayValue] = useState(
    number === "24/7" ? "0/0" : "0" + (number.includes("+") ? "+" : "")
  )

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const duration = 1500 // 1.5s as requested

    // Ease-out timing function
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

    const isFraction = number.includes("/")
    const hasPlus = number.includes("+")

    let target1 = 0
    let target2 = 0

    if (isFraction) {
      const parts = number.split("/").map((p) => parseInt(p, 10))
      target1 = parts[0] || 24
      target2 = parts[1] || 7
    } else {
      target1 = parseInt(number.replace("+", ""), 10) || 0
    }

    let frameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)

      if (isFraction) {
        const current1 = Math.round(easedProgress * target1)
        const current2 = Math.round(easedProgress * target2)
        setDisplayValue(`${current1}/${current2}`)
      } else {
        const current = Math.round(easedProgress * target1)
        setDisplayValue(`${current}${hasPlus ? "+" : ""}`)
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        setDisplayValue(number)
      }
    }

    frameId = requestAnimationFrame(step)

    return () => cancelAnimationFrame(frameId)
  }, [isInView, number])

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2 tabular-nums">
        {displayValue}
      </div>
      <div className="text-gray-600 font-medium">{label}</div>
    </div>
  )
}
