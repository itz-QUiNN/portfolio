import Nav from '../components/Nav'
import Hero from '../sections/Hero'
import SelectedWork from '../sections/SelectedWork'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SelectedWork />
      </main>
    </>
  )
}
