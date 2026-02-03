"use client"

import { useState } from "react"

const languages = [
  { name: "luau", level: 95 },
  { name: "c++", level: 80 },
  { name: "c#", level: 85 },
  { name: "html", level: 90 },
  { name: "css", level: 90 },
  { name: "javascript", level: 88 },
  { name: "typescript", level: 85 },
  { name: "java", level: 75 },
]

export function SkillsSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section className="mb-16">
      <div className="mb-6 text-muted-foreground text-xs tracking-widest uppercase">
        {">"} cat skills.json
      </div>
      <div className="border border-border bg-card/30 p-4">
        <pre className="text-foreground/80 text-xs leading-relaxed md:text-sm">
          <span className="text-muted-foreground">{"{"}</span>
          {"\n"}
          <span className="ml-4 text-muted-foreground">"languages"</span>
          <span className="text-foreground">: [</span>
          {"\n"}
          {languages.map((lang, index) => (
            <span
              key={lang.name}
              className="group cursor-default"
              onMouseEnter={() => setHoveredSkill(lang.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <span className="ml-8">
                <span className="text-foreground">"</span>
                <span
                  className={`transition-colors ${hoveredSkill === lang.name ? "text-foreground" : "text-foreground/70"}`}
                >
                  {lang.name}
                </span>
                <span className="text-foreground">"</span>
                {index < languages.length - 1 && <span className="text-muted-foreground">,</span>}
              </span>
              {hoveredSkill === lang.name && (
                <span className="ml-2 text-muted-foreground text-xs">
                  // proficiency: {lang.level}%
                </span>
              )}
              {"\n"}
            </span>
          ))}
          <span className="ml-4 text-foreground">]</span>
          {"\n"}
          <span className="text-muted-foreground">{"}"}</span>
        </pre>
      </div>
    </section>
  )
}
