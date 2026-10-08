import { services } from '../data/services'

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-16 px-6 py-24">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">Services</h2>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {services.map((service) => (
          <li key={service.title} className="bg-bg p-8">
            <h3 className="text-xl font-semibold tracking-tight">{service.title}</h3>
            <p className="mt-3 text-muted">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
