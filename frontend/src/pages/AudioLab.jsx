import { AreaChart, Area, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import DemoBanner from '../components/ui/DemoBanner'
import { waveformData, pitchData, energyData, mfccMatrix, acousticTable } from '../data/dummy'

const Chart = ({ children }) => (
  <div className="h-44"><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div>
)

export default function AudioLab() {
  return (
    <>
      <PageHeader title="Audio Lab" subtitle="Acoustic visualisation of the analysed recording." />
      <DemoBanner />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Waveform">
          <Chart><AreaChart data={waveformData}><XAxis dataKey="t" hide /><YAxis hide domain={[-1, 1]} />
            <Area dataKey="v" stroke="#1d8fe1" fill="#dbeefe" /></AreaChart></Chart>
        </Card>
        <Card title="Pitch curve (Hz)">
          <Chart><LineChart data={pitchData}><XAxis dataKey="t" hide /><YAxis domain={['auto', 'auto']} /><Tooltip />
            <Line dataKey="hz" stroke="#14b8a6" dot={false} /></LineChart></Chart>
        </Card>
        <Card title="Energy curve (RMS)">
          <Chart><LineChart data={energyData}><XAxis dataKey="t" hide /><YAxis /><Tooltip />
            <Line dataKey="rms" stroke="#1672b8" dot={false} /></LineChart></Chart>
        </Card>
        <Card title="Acoustic feature table">
          <table className="w-full text-sm"><tbody>
            {acousticTable.map(([k, v]) => (
              <tr key={k} className="border-b border-slate-100 last:border-0">
                <td className="py-1.5 text-ink-soft">{k}</td><td className="text-right font-medium">{v}</td>
              </tr>
            ))}
          </tbody></table>
        </Card>
        <Card title="MFCC heatmap" subtitle="13 coefficients × time" className="lg:col-span-2">
          <div className="grid gap-px overflow-hidden rounded-lg" style={{ gridTemplateColumns: 'repeat(40, 1fr)' }}>
            {mfccMatrix.flat().map((v, i) => (
              <div key={i} className="h-3" style={{ background: `hsl(205 80% ${92 - v * 60}%)` }} />
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-soft">Spectrogram and Mel spectrogram panels are added in Phase 3.</p>
        </Card>
      </div>
    </>
  )
}
