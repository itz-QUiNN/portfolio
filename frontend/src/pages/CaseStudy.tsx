import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import Footer from '../components/Footer'
import Nav from '../components/Nav'
import { getProject } from '../data/projects'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="font-mono text-sm uppercase tracking-widest text-accent">{title}</h2>
      <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>
    </section>
  )
}

export default function CaseStudy() {
  const { slug = '' } = useParams()
  const project = getProject(slug)

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <Link
          to="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors duration-(--motion-micro) hover:text-ink"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Selected work
        </Link>

        {!project ? (
          <h1 className="mt-12 text-4xl font-semibold tracking-tight">Project not found</h1>
        ) : (
          <>
            <h1 className="mt-12 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
              {project.title}
            </h1>

            {project.stack.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-sm border border-line px-2 py-1 font-mono text-xs text-muted"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            )}

            {!project.caseStudy ? (
              <p className="mt-12 text-lg text-muted">Case study coming soon.</p>
            ) : (
              <div className="mt-12">
                <Block title="The problem">
                  <p>{project.caseStudy.problem}</p>
                </Block>
                <Block title="The solution">
                  <p>{project.caseStudy.solution}</p>
                </Block>
                <Block title="Architecture">
                  <ol className="space-y-2 font-mono text-base">
                    {project.caseStudy.architecture.map((step, index) => (
                      <li key={step}>
                        <span className="text-accent">{String(index + 1).padStart(2, '0')}</span>{' '}
                        {step}
                      </li>
                    ))}
                  </ol>
                </Block>
                <Block title="Key challenges">
                  <ul className="list-disc space-y-3 pl-5">
                    {project.caseStudy.challenges.map((challenge) => (
                      <li key={challenge}>{challenge}</li>
                    ))}
                  </ul>
                </Block>
                <Block title="Result">
                  <p>{project.caseStudy.result}</p>
                </Block>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
