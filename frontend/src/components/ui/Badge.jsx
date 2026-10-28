const tones = {
  blue: 'bg-brand-50 text-brand-600',
  teal: 'bg-teal-50 text-teal-700',
  amber: 'bg-amber-50 text-amber-800',
  slate: 'bg-slate-100 text-ink-soft',
}
export default function Badge({ children, tone = 'blue' }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-medium ${tones[tone]}`}>{children}</span>
}
