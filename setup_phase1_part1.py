"""
VoiceText Analytics - Phase 1 Part 1 setup (layout + dashboard)
Run from the project root:   python setup_phase1_part1.py
"""
import os
import sys

FE = "frontend"
SRC = os.path.join(FE, "src")
if not os.path.isdir(SRC):
    sys.exit("ERROR: run this from the project root (folder containing 'frontend').")

ROOT_FILES = {}
SRC_FILES = {}

ROOT_FILES["vite.config.js"] = r'''import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
'''

SRC_FILES["index.css"] = r'''@import "tailwindcss";

@theme {
  --color-ink: #0b1f3a;
  --color-ink-soft: #4a5d78;
  --color-brand-50: #eff8ff;
  --color-brand-100: #dbeefe;
  --color-brand-500: #1d8fe1;
  --color-brand-600: #1672b8;
  --font-sans: "Inter", ui-sans-serif, system-ui, "Segoe UI", sans-serif;
}

body {
  background: #f6f9fc;
  color: var(--color-ink);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
}
'''

SRC_FILES["main.jsx"] = r'''import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
'''

SRC_FILES["config/navigation.js"] = r'''import {
  LayoutDashboard, Mic, Upload, MessageSquareText, Smile, Activity,
  AudioLines, Lightbulb, TrendingUp, History, ClipboardList, Cpu, Settings,
} from 'lucide-react'

export const NAV_ITEMS = [
  { path: '/',             label: 'Dashboard',     icon: LayoutDashboard,   phase: 1 },
  { path: '/live',         label: 'Live Analysis', icon: Mic,               phase: 15 },
  { path: '/upload',       label: 'Upload Audio',  icon: Upload,            phase: 14 },
  { path: '/text',         label: 'Text Analysis', icon: MessageSquareText, phase: 8 },
  { path: '/emotion',      label: 'Emotion',       icon: Smile,             phase: 5 },
  { path: '/mood',         label: 'Mood',          icon: Activity,          phase: 9 },
  { path: '/audio-lab',    label: 'Audio Lab',     icon: AudioLines,        phase: 4 },
  { path: '/insights',     label: 'AI Insights',   icon: Lightbulb,         phase: 12 },
  { path: '/trends',       label: 'Trends',        icon: TrendingUp,        phase: 16 },
  { path: '/history',      label: 'History',       icon: History,           phase: 16 },
  { path: '/reports',      label: 'Reports',       icon: ClipboardList,     phase: 17 },
  { path: '/model-center', label: 'Model Center',  icon: Cpu,               phase: 18 },
  { path: '/settings',     label: 'Settings',      icon: Settings,          phase: 19 },
]
'''

DUMMY_BASE = r'''// SAMPLE DATA ONLY. Replaced by database values in Phase 14.
export const dashboardStats = {
  totalSessions: 12,
  currentEmotion: 'Sad',
  moodPattern: 'Low-energy',
  screeningSignal: 'Moderate',
  lastAnalysis: 'Today',
  avgDuration: '03:42',
}

export const emotionDistribution = [
  { emotion: 'Sad', value: 68 },
  { emotion: 'Neutral', value: 18 },
  { emotion: 'Fear', value: 7 },
  { emotion: 'Anger', value: 4 },
  { emotion: 'Happy', value: 3 },
]

export const recentSessions = [
  { id: 12, date: '2026-10-27', duration: '04:10', emotion: 'Sad',     mood: 'Low-energy', screening: 'Moderate' },
  { id: 11, date: '2026-10-25', duration: '03:05', emotion: 'Neutral', mood: 'Neutral',    screening: 'Lower' },
  { id: 10, date: '2026-10-22', duration: '03:51', emotion: 'Calm',    mood: 'Calm',       screening: 'Lower' },
]

'''

SRC_FILES["components/ui/Card.jsx"] = r'''export default function Card({ title, subtitle, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {title && (
        <header className="mb-4">
          <h3 className="text-base font-semibold text-ink">{title}</h3>
          {subtitle && <p className="text-sm text-ink-soft">{subtitle}</p>}
        </header>
      )}
      {children}
    </section>
  )
}
'''

SRC_FILES["components/ui/StatCard.jsx"] = r'''export default function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        {Icon && <Icon size={22} />}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">{label}</p>
        <p className="text-xl font-semibold text-ink">{value}</p>
      </div>
    </div>
  )
}
'''

SRC_FILES["components/ui/DemoBanner.jsx"] = r'''export default function DemoBanner() {
  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong>Sample data.</strong> Values on this page are placeholders for UI design.
      No AI model has been run yet. This is a research/screening-support tool, not a medical diagnosis.
    </div>
  )
}
'''

SRC_FILES["components/layout/AppLayout.jsx"] = r'''import { NavLink, Outlet } from 'react-router-dom'
import { HeartPulse } from 'lucide-react'
import { NAV_ITEMS } from '../../config/navigation'

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 text-white">
            <HeartPulse size={20} />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-ink">VoiceText Analytics</p>
            <p className="text-xs text-ink-soft">Multimodal Speech &amp; Emotional Pattern Analysis</p>
          </div>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
          Research &amp; Screening Support
        </span>
      </header>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-3 md:block">
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-50 text-brand-600' : 'text-ink-soft hover:bg-slate-50'
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
'''

SRC_FILES["pages/Placeholder.jsx"] = r'''import { useLocation } from 'react-router-dom'
import Card from '../components/ui/Card'
import { NAV_ITEMS } from '../config/navigation'

export default function Placeholder() {
  const { pathname } = useLocation()
  const item = NAV_ITEMS.find((n) => n.path === pathname)
  return (
    <>
      <h1 className="mb-6 text-2xl font-semibold">{item?.label ?? 'Page'}</h1>
      <Card>
        <p className="text-ink-soft">
          This page is built in Phase 1 Part 3 (UI) and connected to real models in Phase {item?.phase}.
        </p>
      </Card>
    </>
  )
}
'''

SRC_FILES["pages/Dashboard.jsx"] = r'''import { Hash, Smile, Activity, ShieldAlert, Clock, Timer } from 'lucide-react'
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
'''


def write(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write(content)
    print("  wrote", path)


print("Creating Part 1 files...")
for rel, content in ROOT_FILES.items():
    write(os.path.join(FE, rel), content)
for rel, content in SRC_FILES.items():
    write(os.path.join(SRC, *rel.split("/")), content)

# dummy.js: keep Part 2 data if present, add Part 1 base data if missing
dummy = os.path.join(SRC, "data", "dummy.js")
existing = ""
if os.path.exists(dummy):
    with open(dummy, "r", encoding="utf-8") as f:
        existing = f.read()
if "dashboardStats" in existing:
    print("  dummy.js already has dashboard data - kept")
else:
    write(dummy, DUMMY_BASE + existing)
    print("  dummy.js: added dashboard data (kept any existing Part 2 data)")

old_css = os.path.join(SRC, "App.css")
if os.path.exists(old_css):
    os.remove(old_css)
    print("  removed unused", old_css)

print("\nDone. Now run:  cd frontend  &&  npm install react-router-dom recharts lucide-react tailwindcss @tailwindcss/vite  &&  npm run dev")
