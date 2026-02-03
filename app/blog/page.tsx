"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/data/blog-posts"
import { NavTabs } from "@/components/nav-tabs"
import { BlinkieFooter } from "@/components/blinkie-footer"

export default function BlogPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

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
        
        <header className="mb-12">
          <div className="mb-2 text-muted-foreground text-xs tracking-widest uppercase">
            {">"} ls ./blog/
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            blog posts
          </h1>
          <p className="mt-2 text-muted-foreground text-sm">
            thoughts, tutorials, and dev logs
          </p>
        </header>

        <div className="space-y-6">
          {sortedPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border border-border bg-card p-4 transition-all hover:border-foreground hover:bg-accent"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-32 w-full shrink-0 overflow-hidden sm:h-24 sm:w-32">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover grayscale transition-all group-hover:grayscale-0"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2 text-muted-foreground text-xs">
                    <span>[{String(index).padStart(2, "0")}]</span>
                    <span>{post.date}</span>
                    <span>~</span>
                    <span>{post.author}</span>
                  </div>
                  <h2 className="mb-2 font-bold text-foreground transition-colors group-hover:text-foreground">
                    {post.title}
                  </h2>
                  <p className="line-clamp-2 text-muted-foreground text-sm">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16">
          <BlinkieFooter />
        </div>
      </main>
    </div>
  )
}
