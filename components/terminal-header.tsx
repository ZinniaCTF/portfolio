"use client"

import { useEffect, useState } from "react"

export function TerminalHeader() {
  const [displayText, setDisplayText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "meowl"

  useEffect(() => {
    let index = 0
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(typeInterval)
      }
    }, 120)

    return () => clearInterval(typeInterval)
  }, [])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <header className="mb-16">
      <div className="mb-4 text-muted-foreground text-xs tracking-widest uppercase">
        {">"} user@portfolio ~ $
      </div>
      <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
        {displayText}
        <span
          className={`ml-1 inline-block w-3 bg-foreground ${showCursor ? "opacity-100" : "opacity-0"}`}
          style={{ height: "1.1em", verticalAlign: "text-bottom" }}
        />
      </h1>
      <div className="flex flex-wrap gap-2 text-muted-foreground text-xs">
        {["software engineer", "scripter", "ui/ux designer", "director", "website developer"].map(
          (role) => (
            <span key={role} className="border border-border px-2 py-1">
              {role}
            </span>
          )
        )}
      </div>
    </header>
  )
}
