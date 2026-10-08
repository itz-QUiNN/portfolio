import { ArrowRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-32 pt-28 md:pt-40">
      <p className="mb-8 font-mono text-sm uppercase tracking-widest text-accent">
        Python · Playwright · FastAPI
      </p>

      <h1 className="max-w-4xl text-5xl font-semibold uppercase leading-[1.02] tracking-tight md:text-7xl">
        Web scraping &amp; browser automation engineer
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
        I build reliable systems that turn complex websites, repetitive workflows, and
        unstructured data into usable information.
      </p>

      <div className="mt-12 flex flex-wrap gap-4">
        <a
          href="#work"
          className="rounded-md bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity duration-(--motion-micro) hover:opacity-90"
        >
          View selected work
        </a>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm transition-colors duration-(--motion-micro) hover:border-accent"
        >
          Start a project
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
