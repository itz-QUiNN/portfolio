const EMAIL = 'itzishara@gmail.com'

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">Contact</h2>

      <p className="mt-12 max-w-2xl text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        Have a website you need data from, or a workflow you are tired of doing by hand?
      </p>

      <a
        href={`mailto:${EMAIL}`}
        className="mt-10 inline-block rounded-md bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity duration-(--motion-micro) hover:opacity-90"
      >
        {EMAIL}
      </a>
    </section>
  )
}
