"use client"

import { useEffect, useState } from "react"
import { TerminalHeader } from "@/components/terminal-header"
import { StatsGrid } from "@/components/stats-grid"
import { SkillsSection } from "@/components/skills-section"
import { AboutSection } from "@/components/about-section"
import { BlinkieFooter } from "@/components/blinkie-footer"
import { NavTabs } from "@/components/nav-tabs"
import { TicTacToeGame } from "@/components/tictactoe-game"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image with low opacity */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.03]"
        style={{
          backgroundImage: `url('https://s6.imgcdn.dev/Y7ubXv.md.png')`,
        }}
      />

      {/* Scanline effect */}
      <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.03)_50%)] bg-[length:100%_4px]" />

      <main className="relative z-20 mx-auto max-w-3xl px-6 py-16">
        <NavTabs />
        <TerminalHeader />
        <AboutSection />
        <StatsGrid />
        <SkillsSection />
        <TicTacToeGame />
        <BlinkieFooter />
      </main>
    </div>
  )
}