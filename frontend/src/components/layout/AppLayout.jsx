import { NavLink, Outlet } from 'react-router-dom'
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
