import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import DemoBanner from '../components/ui/DemoBanner'
import { moodSupport } from '../data/dummy'

const MIN_SESSIONS = 5

export default function Mood() {
  const sessions = 3 // sample; real count comes from the database
  return (
    <>
      <PageHeader title="Mood" subtitle="AI-estimated mood pattern, not a medical measurement." />
      <DemoBanner />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="AI-estimated mood pattern">
          <p className="text-2xl font-semibold">Low-energy / subdued</p>
          <p className="mt-2 text-sm text-ink-soft">
            An AI-derived pattern based on the analysed recording, not a statement about how you actually feel.
          </p>
        </Card>
        <Card title="Supporting observations">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            {moodSupport.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </Card>
        <Card title="Mood trend" className="lg:col-span-2">
          {sessions < MIN_SESSIONS ? (
            <p className="text-sm text-ink-soft">
              Not enough sessions yet. {sessions} of {MIN_SESSIONS} needed before a trend is shown.
            </p>
          ) : null}
        </Card>
      </div>
    </>
  )
}
