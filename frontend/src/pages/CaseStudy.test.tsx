import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import CaseStudy from './CaseStudy'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('CaseStudy', () => {
  it('shows a not-found message for an unknown slug', () => {
    renderAt('/work/nonsense')
    expect(screen.getByRole('heading', { name: 'Project not found' })).toBeInTheDocument()
  })

  it('shows the full case study for a project that has one', () => {
    renderAt('/work/tcgplayer-price-intelligence')
    expect(screen.getByRole('heading', { name: 'TCGplayer Price Intelligence' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'The problem' })).toBeInTheDocument()
  })

  it('shows coming soon for a project without one', () => {
    renderAt('/work/youtube-extraction')
    expect(screen.getByText('Case study coming soon.')).toBeInTheDocument()
  })
})
