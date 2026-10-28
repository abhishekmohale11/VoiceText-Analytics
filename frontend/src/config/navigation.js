import {
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
