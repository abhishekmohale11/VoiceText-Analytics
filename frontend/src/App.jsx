import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Dashboard from './pages/Dashboard'
import Placeholder from './pages/Placeholder'
import LiveAnalysis from './pages/LiveAnalysis'
import UploadAudio from './pages/UploadAudio'
import TextAnalysis from './pages/TextAnalysis'
import Emotion from './pages/Emotion'
import Mood from './pages/Mood'
import AudioLab from './pages/AudioLab'
import AiInsights from './pages/AiInsights'
import { NAV_ITEMS } from './config/navigation'

const BUILT = {
  '/live': LiveAnalysis, '/upload': UploadAudio, '/text': TextAnalysis,
  '/emotion': Emotion, '/mood': Mood, '/audio-lab': AudioLab, '/insights': AiInsights,
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        {NAV_ITEMS.filter((n) => n.path !== '/').map((n) => {
          const Page = BUILT[n.path] ?? Placeholder
          return <Route key={n.path} path={n.path} element={<Page />} />
        })}
      </Route>
    </Routes>
  )
}
