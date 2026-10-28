import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import DemoBanner from '../components/ui/DemoBanner'
import { featureEvidence } from '../data/dummy'

export default function AiInsights() {
  return (
    <>
      <PageHeader title="AI Insights" subtitle="Why the AI produced these results." />
      <DemoBanner />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Observed" subtitle="What was measured">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>Lower vocal energy</li><li>Reduced pitch variation</li><li>Longer pauses</li>
          </ul>
        </Card>
        <Card title="Predicted" subtitle="What the AI model output">
          <p className="text-sm">Emotion: Sad · Sentiment: Negative · Mood pattern: Low-energy</p>
        </Card>
        <Card title="Interpreted" subtitle="What this may indicate">
          <p className="text-sm">These observations are consistent with a subdued emotional speech pattern.</p>
        </Card>
        <Card title="Recommended" subtitle="General supportive actions">
          <ul className="list-disc space-y-1 pl-5 text-sm">
            <li>Take a short break and drink water</li><li>Talk to someone you trust</li>
            <li>Consider speaking with a qualified professional if this persists</li>
          </ul>
        </Card>
        <Card title="Top contributing features" subtitle="Feature → observed value → human-readable meaning" className="lg:col-span-2">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-ink-soft">
              <tr><th className="py-2">Feature</th><th>Observed</th><th>Direction</th><th>Interpretation</th></tr>
            </thead>
            <tbody>
              {featureEvidence.map((f) => (
                <tr key={f.feature} className="border-t border-slate-100">
                  <td className="py-2 font-medium">{f.feature}</td><td>{f.observed}</td><td>{f.direction}</td><td>{f.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-ink-soft">
            Contributions describe model inputs, not causes. This is a research tool, not a diagnosis.
          </p>
        </Card>
      </div>
    </>
  )
}
