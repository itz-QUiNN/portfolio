import Footer from '../components/Footer'
import Nav from '../components/Nav'
import About from '../sections/About'
import Contact from '../sections/Contact'
import Demo from '../sections/Demo'
import Hero from '../sections/Hero'
import SelectedWork from '../sections/SelectedWork'
import Services from '../sections/Services'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
        <Demo />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
