"use client"

import { useEffect, useState } from "react"

const stats = [
  { label: "group members", value: "1M+", target: 1000000 },
  { label: "total visits", value: "334M+", target: 334000000 },
  { label: "published games", value: "20+", target: 20 },
  { label: "active players", value: "15,955+", target: 15955 },
]

function AnimatedNumber({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = target / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      if (step >= steps) {
        setCurrent(target)
        clearInterval(timer)
      } else {
        setCurrent(Math.floor(increment * step))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [target])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)}M`
    }
    if (num >= 1000) {
      return num.toLocaleString()
    }
    return num.toString()
  }

  return (
    <span>
      {formatNumber(current)}
      {suffix}
    </span>
  )
}

export function StatsGrid() {
  return (
    <section className="mb-16">
      <div className="mb-6 text-muted-foreground text-xs tracking-widest uppercase">
        {">"} ls ./achievements/
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-border bg-card/50 p-4 transition-colors hover:border-foreground/30"
          >
            <div className="mb-1 font-bold text-2xl text-foreground md:text-3xl">
              <AnimatedNumber target={stat.target} suffix="+" />
            </div>
            <div className="text-muted-foreground text-xs uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
