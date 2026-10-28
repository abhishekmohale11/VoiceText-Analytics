import { useLocation } from 'react-router-dom'
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
