import { useState } from 'react'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import DemoBanner from '../components/ui/DemoBanner'

export default function TextAnalysis() {
  const [text, setText] = useState('')
  const [ran, setRan] = useState(false)
  const words = text.trim().split(/\s+/).filter(Boolean).length
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length

  return (
    <>
      <PageHeader title="Text Analysis" subtitle="Analyse written text or a transcript." />
      <DemoBanner />
      <Card>
        <textarea
          value={text}
          onChange={(e) => { setText(e.target.value); setRan(false) }}
          rows={6}
          placeholder="Type or paste text here..."
          className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-brand-500"
        />
        <p className="mt-2 text-xs text-ink-soft">
          In this phase your text stays in your browser. Nothing is sent to a server.
        </p>
        <button disabled={!words} onClick={() => setRan(true)}
                className="mt-3 rounded-xl bg-brand-500 px-5 py-2 font-medium text-white hover:bg-brand-600 disabled:opacity-40">
          Analyze
        </button>
      </Card>

      {ran && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <Card title="Measured from your text">
            <p>Word count: <strong>{words}</strong></p>
            <p>Sentence count: <strong>{sentences}</strong></p>
          </Card>
          <Card title="Model outputs (sample, NLP models arrive in Phase 8)">
            <ul className="space-y-1 text-sm">
              <li>Sentiment: Negative</li>
              <li>Emotion: Sadness</li>
              <li>First-person references: high</li>
              <li>Important phrases: “tired”, “don't feel like”</li>
            </ul>
          </Card>
        </div>
      )}
    </>
  )
}
