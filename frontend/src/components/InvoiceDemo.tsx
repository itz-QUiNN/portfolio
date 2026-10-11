import { Check, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'

import { ApiError, fetchInvoiceDemo, fetchInvoiceSamples } from '../lib/api'
import type { InvoiceDemoResult, InvoiceSample } from '../lib/api'

function errorMessage(error: unknown): string {
  if (error instanceof ApiError && error.status === 429) {
    return 'Too many attempts. Please wait a minute and try again.'
  }
  return 'Something went wrong. Please try again.'
}

export default function InvoiceDemo() {
  const [samples, setSamples] = useState<InvoiceSample[]>([])
  const [selected, setSelected] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<InvoiceDemoResult | null>(null)

  useEffect(() => {
    fetchInvoiceSamples()
      .then((list) => {
        setSamples(list)
        setSelected(list[0]?.id ?? '')
      })
      .catch((err: unknown) => setError(errorMessage(err)))
  }, [])

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selected) return
    setLoading(true)
    setError(null)
    try {
      setResult(await fetchInvoiceDemo(selected))
    } catch (err) {
      setResult(null)
      setError(errorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-12 max-w-3xl">
      <form onSubmit={onSubmit}>
        <fieldset className="grid gap-3 md:grid-cols-3">
          <legend className="mb-3 text-sm text-muted">Choose a sample invoice</legend>
          {samples.map((sample) => (
            <label
              key={sample.id}
              className="cursor-pointer rounded-md border border-line bg-surface p-4 text-sm transition-colors duration-(--motion-micro) has-checked:border-accent has-focus-visible:outline-2 has-focus-visible:outline-accent"
            >
              <input
                type="radio"
                name="sample"
                value={sample.id}
                checked={selected === sample.id}
                onChange={() => {
                  setSelected(sample.id)
                  setResult(null)
                }}
                className="sr-only"
              />
              <span className="block font-medium">{sample.label}</span>
              <span className="mt-1 block text-muted">{sample.description}</span>
            </label>
          ))}
        </fieldset>

        <button
          type="submit"
          disabled={loading || !selected}
          className="mt-6 rounded-md bg-accent px-5 py-3 text-sm font-medium text-bg transition-opacity duration-(--motion-micro) hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze invoice'}
        </button>
      </form>

      <p role="status" className="mt-4 min-h-6 text-sm text-muted">
        {error}
      </p>

      {result && (
        <div className="mt-6 rounded-lg border border-line bg-surface">
          <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
            <p className="font-mono text-sm uppercase tracking-widest">
              {result.valid ? 'Validation passed' : 'Validation failed'}
            </p>
            {result.is_sample && (
              <span className="rounded-sm border border-accent px-2 py-1 font-mono text-xs uppercase tracking-widest text-accent">
                Sample data
              </span>
            )}
          </div>

          <div className="grid gap-8 p-4 text-sm md:grid-cols-2">
            <section aria-labelledby="extracted-heading">
              <h4 id="extracted-heading" className="font-mono text-xs uppercase tracking-widest text-muted">
                Extracted fields
              </h4>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                <dt className="font-mono text-muted">vendor</dt>
                <dd>{result.fields.vendor}</dd>
                <dt className="font-mono text-muted">invoice_number</dt>
                <dd>{result.fields.invoice_number || 'not found'}</dd>
                <dt className="font-mono text-muted">issue_date</dt>
                <dd>{result.fields.issue_date}</dd>
                <dt className="font-mono text-muted">currency</dt>
                <dd>{result.fields.currency}</dd>
                <dt className="font-mono text-muted">subtotal</dt>
                <dd>{result.fields.subtotal}</dd>
                <dt className="font-mono text-muted">tax</dt>
                <dd>{result.fields.tax}</dd>
                <dt className="font-mono text-muted">total</dt>
                <dd>{result.fields.total}</dd>
              </dl>

              <ul className="mt-6 space-y-1 border-t border-line pt-4">
                {result.fields.line_items.map((item) => (
                  <li key={item.description} className="flex justify-between gap-4">
                    <span>
                      {item.quantity} x {item.description}
                    </span>
                    <span className="font-mono text-muted">{item.unit_price}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="checks-heading">
              <h4 id="checks-heading" className="font-mono text-xs uppercase tracking-widest text-muted">
                Validation
              </h4>
              <ul className="mt-4 space-y-4">
                {result.checks.map((check) => (
                  <li key={check.name} className="flex gap-3">
                    {check.passed ? (
                      <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                    ) : (
                      <X size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-ink" />
                    )}
                    <div>
                      <p>
                        {check.name}
                        <span className="sr-only">{check.passed ? ': passed' : ': failed'}</span>
                      </p>
                      <p className="font-mono text-xs text-muted">{check.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
