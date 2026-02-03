"use client"

import React from "react"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { blogPosts } from "@/data/blog-posts"
import { NavTabs } from "@/components/nav-tabs"
import { BlinkieFooter } from "@/components/blinkie-footer"

function parseContent(content: string) {
  const lines = content.trim().split("\n")
  const elements: React.ReactNode[] = []
  let currentList: string[] = []

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="mb-4 ml-4 list-disc space-y-1 text-muted-foreground">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
      currentList = []
    }
  }

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith("### ")) {
      flushList()
      elements.push(
        <h3 key={index} className="mb-3 mt-6 text-lg font-bold text-foreground">
          {trimmedLine.replace("### ", "")}
        </h3>
      )
    } else if (trimmedLine.startsWith("## ")) {
      flushList()
      elements.push(
        <h2 key={index} className="mb-4 mt-8 text-xl font-bold text-foreground">
          {trimmedLine.replace("## ", "")}
        </h2>
      )
    } else if (trimmedLine.startsWith("- ")) {
      currentList.push(trimmedLine.replace("- ", ""))
    } else if (trimmedLine === "") {
      flushList()
    } else {
      flushList()
      elements.push(
        <p key={index} className="mb-4 text-muted-foreground leading-relaxed">
          {trimmedLine}
        </p>
      )
    }
  })

  flushList()
  return elements
}

export default function BlogPostPage() {
  const params = useParams()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div
          className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.03]"
          style={{
            backgroundImage: `url('https://s6.imgcdn.dev/Y7ubXv.md.png')`,
          }}
        />
        <div className="pointer-events-none fixed inset-0 z-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.03)_50%)] bg-[length:100%_4px]" />
        <main className="relative z-20 mx-auto max-w-3xl px-6 py-16">
          <NavTabs />
          <div className="text-center">
            <div className="mb-4 text-muted-foreground text-xs tracking-widest uppercase">
              {">"} error: file not found
            </div>
            <h1 className="mb-4 text-2xl font-bold text-foreground">404</h1>
            <p className="mb-8 text-muted-foreground">post not found</p>
            <Link
              href="/blog"
              className="border border-border px-4 py-2 text-sm transition-colors hover:border-foreground hover:bg-accent"
            >
              {"<-"} back to blog
            </Link>
          </div>
        </main>
      </div>
    )
  }

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

        <Link
          href="/blog"
          className="mb-8 inline-block text-muted-foreground text-sm transition-colors hover:text-foreground"
        >
          {"<-"} cd ../blog
        </Link>

        <article>
          <header className="mb-8">
            <div className="mb-2 text-muted-foreground text-xs tracking-widest uppercase">
              {">"} cat {post.slug}.md
            </div>
            <h1 className="mb-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <span>{post.date}</span>
              <span className="text-border">|</span>
              <span>by {post.author}</span>
            </div>
          </header>

          <div className="relative mb-8 h-64 w-full overflow-hidden border border-border md:h-80">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose-terminal">{parseContent(post.content)}</div>
        </article>

        <div className="mt-12 border-t border-border pt-8">
          <Link
            href="/blog"
            className="inline-block border border-border px-4 py-2 text-sm transition-colors hover:border-foreground hover:bg-accent"
          >
            {"<-"} back to all posts
          </Link>
        </div>

        <div className="mt-16">
          <BlinkieFooter />
        </div>
      </main>
    </div>
  )
}
