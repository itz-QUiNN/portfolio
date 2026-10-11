import { Link } from 'react-router-dom'

import Footer from '../components/Footer'
import Nav from '../components/Nav'

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-32">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">404</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">Page not found</h1>
        <Link
          to="/"
          className="mt-10 inline-block text-muted transition-colors duration-(--motion-micro) hover:text-ink"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  )
}
