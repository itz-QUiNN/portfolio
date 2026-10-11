import YouTubeDemo from '../components/YouTubeDemo'

export default function Demo() {
  return (
    <section id="demo" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">Demo</h2>

      <p className="mt-12 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Paste a video URL. Get structured data.
      </p>
      <p className="mt-4 max-w-xl text-muted">
        This demo returns fixed sample data so you can see the output shape. It does not scrape
        live pages.
      </p>

      <YouTubeDemo />
    </section>
  )
}
