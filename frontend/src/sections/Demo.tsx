import InvoiceDemo from '../components/InvoiceDemo'
import YouTubeDemo from '../components/YouTubeDemo'

export default function Demo() {
  return (
    <section id="demo" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">Demos</h2>
      <p className="mt-6 max-w-xl text-muted">
        Both demos return fixed sample data so you can see the output shape. They do not scrape
        live pages or accept uploads.
      </p>

      <h3 className="mt-16 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Paste a video URL. Get structured data.
      </h3>
      <YouTubeDemo />

      <h3 className="mt-24 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Pick an invoice. Get validated fields.
      </h3>
      <InvoiceDemo />
    </section>
  )
}
