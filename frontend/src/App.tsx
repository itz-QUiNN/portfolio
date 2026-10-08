import { BrowserRouter, Route, Routes } from 'react-router-dom'

import CaseStudy from './pages/CaseStudy'
import Home from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
    </BrowserRouter>
  )
}
