import { Hash, Smile, Activity, ShieldAlert, Clock, Timer } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'
import DemoBanner from '../components/ui/DemoBanner'
import { dashboardStats as s, emotionDistribution, recentSessions } from '../data/dummy'

export default function Dashboard() {
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold">Dashboard</h1>
      <p className="mb-6 text-ink-soft">Overview of your analysed sessions.</p>
      <DemoBanner />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Sessions" value={s.totalSessions} icon={Hash} />
        <StatCard label="Current Emotion" value={s.currentEmotion} icon={Smile} />
        <StatCard label="Mood Pattern" value={s.moodPattern} icon={Activity} />
        <StatCard label="Screening Signal" value={s.screeningSignal} icon={ShieldAlert} />
        <StatCard label="Last Analysis" value={s.lastAnalysis} icon={Clock} />
        <StatCard label="Avg Session Duration" value={s.avgDuration} icon={Timer} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <Card title="Emotion Distribution" subtitle="Latest session (sample)">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emotionDistribution} layout="vertical" margin={{ left: 10 }}>
                <XAxis type="number" unit="%" domain={[0, 100]} />
                <YAxis type="category" dataKey="emotion" width={70} />
                <Tooltip />
                <Bar dataKey="value" fill="#1d8fe1" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Sessions" subtitle="Sample rows">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase text-ink-soft">
              <tr><th className="py-2">Date</th><th>Duration</th><th>Emotion</th><th>Mood</th><th>Screening</th></tr>
            </thead>
            <tbody>
              {recentSessions.map((r) => (
                <tr key={r.id} className="border-t border-slate-100">
                  <td className="py-2">{r.date}</td><td>{r.duration}</td>
                  <td>{r.emotion}</td><td>{r.mood}</td><td>{r.screening}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </>
  )
}
