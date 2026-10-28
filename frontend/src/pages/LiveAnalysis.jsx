import { useEffect, useState } from 'react'
import { Mic, Square } from 'lucide-react'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import DemoBanner from '../components/ui/DemoBanner'
import Badge from '../components/ui/Badge'

const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function LiveAnalysis() {
  const [running, setRunning] = useState(false)
  const [sec, setSec] = useState(0)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSec((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [running])

  const toggle = () => {
    if (running) setRunning(false)
    else { setSec(0); setRunning(true) }
  }

  return (
    <>
      <PageHeader title="Live Analysis" subtitle="Speak and see analysis update in short chunks." />
      <DemoBanner />
      <Card className="flex flex-col items-center py-10">
        <Badge tone="teal">Near-real-time analysis · 5-second chunks</Badge>
        <button
          onClick={toggle}
          className={`mt-6 flex h-24 w-24 items-center justify-center rounded-full text-white shadow-md transition ${
            running ? 'bg-rose-500 hover:bg-rose-600' : 'bg-brand-500 hover:bg-brand-600'
          }`}
          aria-label={running ? 'Stop analysis' : 'Start analysis'}
        >
          {running ? <Square size={32} /> : <Mic size={36} />}
        </button>
        <p className="mt-4 font-medium">{running ? 'Stop Analysis' : 'Start Analysis'}</p>
        <p className="font-mono text-3xl">{fmt(sec)}</p>

        <div className="mt-6 flex h-16 items-end gap-1" aria-hidden>
          {Array.from({ length: 32 }, (_, i) => (
            <div
              key={i}
              className={`w-1.5 rounded bg-brand-500/70 ${running ? 'animate-pulse' : ''}`}
              style={{ height: running ? `${20 + ((i * 37) % 80)}%` : '10%', animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-ink-soft">Waveform shown is a UI preview, not microphone input.</p>
      </Card>

      {running && (
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <Card title="Transcript (sample)">
            <p className="text-sm">“I'm feeling tired and I don't feel like doing anything today.”</p>
          </Card>
          <Card title="Detected emotion (sample)">
            <p className="text-xl font-semibold">Sad</p>
            <p className="text-sm text-ink-soft">Confidence shown only when a trained model provides it.</p>
          </Card>
          <Card title="Acoustic indicators (sample)">
            <ul className="space-y-1 text-sm">
              <li>Speech activity: detected</li>
              <li>Energy: lower</li>
              <li>Pitch variation: reduced</li>
            </ul>
          </Card>
        </div>
      )}
    </>
  )
}
