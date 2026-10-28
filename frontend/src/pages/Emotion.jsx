import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import DemoBanner from '../components/ui/DemoBanner'
import EmotionBars from '../components/charts/EmotionBars'
import { emotionDistribution, emotionTimeline } from '../data/dummy'

export default function Emotion() {
  return (
    <>
      <PageHeader title="Emotion" subtitle="Emotional expression detected in the speech." />
      <DemoBanner />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Dominant emotion">
          <p className="text-3xl font-semibold">Sad</p>
          <p className="mt-2 text-sm text-ink-soft">Probability distribution is shown on the right.</p>
        </Card>
        <Card title="Probability distribution"><EmotionBars data={emotionDistribution} /></Card>
        <Card title="Emotion timeline" subtitle="Shown only when the model predicts per segment" className="lg:col-span-2">
          <ol className="grid gap-2 sm:grid-cols-4">
            {emotionTimeline.map((s) => (
              <li key={s.range} className="rounded-xl bg-brand-50 p-3 text-sm">
                <span className="text-ink-soft">{s.range}</span><br /><strong>{s.emotion}</strong>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  )
}
