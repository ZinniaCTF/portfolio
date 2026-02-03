export function AboutSection() {
  return (
    <section className="mb-16">
      <div className="mb-4 text-muted-foreground text-xs tracking-widest uppercase">
        {">"} cat about.txt
      </div>
      <div className="space-y-4 text-foreground/80 text-sm leading-relaxed">
        <p>
          i build things that scale. from front page games to complex systems,
          my work has reached millions of players worldwide.
        </p>
        <p>
          i specialize in creating polished user experiences and SOMEWHAT good backends.
          whether it's scripting game mechanics, designing pretty decent interfaces,
          or architecting entire platforms. i'm all for helping scale your project.
        </p>
      </div>
    </section>
  )
}
