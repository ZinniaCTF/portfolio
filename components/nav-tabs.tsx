"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavTabs() {
  const pathname = usePathname()
  
  const tabs = [
    { name: "home", href: "/" },
    { name: "blog", href: "/blog" },
  ]

  return (
    <nav className="mb-8 flex gap-1 text-sm">
      <span className="text-muted-foreground">{">"} cd ~/</span>
      {tabs.map((tab, index) => {
        const isActive = pathname === tab.href || (tab.href === "/blog" && pathname.startsWith("/blog"))
        return (
          <span key={tab.name} className="flex items-center">
            {index > 0 && <span className="text-muted-foreground mx-1">|</span>}
            <Link
              href={tab.href}
              className={`transition-colors hover:text-foreground ${
                isActive 
                  ? "text-foreground underline underline-offset-4" 
                  : "text-muted-foreground"
              }`}
            >
              {tab.name}
            </Link>
          </span>
        )
      })}
    </nav>
  )
}
