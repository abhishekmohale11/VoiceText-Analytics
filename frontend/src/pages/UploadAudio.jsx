import { useEffect, useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import DemoBanner from '../components/ui/DemoBanner'

const ALLOWED = ['wav', 'mp3', 'm4a', 'flac', 'ogg']
const MAX_MB = 25

export default function UploadAudio() {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [url, setUrl] = useState(null)
  const [duration, setDuration] = useState(null)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => () => url && URL.revokeObjectURL(url), [url])

  const pick = (f) => {
    setError(''); setDone(false); setDuration(null)
    if (!f) return
    const ext = f.name.split('.').pop().toLowerCase()
    if (!ALLOWED.includes(ext)) return setError(`Unsupported type. Allowed: ${ALLOWED.join(', ')}`)
    if (f.size > MAX_MB * 1024 * 1024) return setError(`File is larger than ${MAX_MB} MB.`)
    setFile(f)
    setUrl(URL.createObjectURL(f))
  }

  return (
    <>
      <PageHeader title="Upload Audio" subtitle="Analyse a recorded speech file." />
      <DemoBanner />
      <Card>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); pick(e.dataTransfer.files[0]) }}
          onClick={() => inputRef.current.click()}
          className="flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-brand-100 bg-brand-50/40 p-10 text-center hover:bg-brand-50"
        >
          <UploadCloud className="text-brand-500" size={36} />
          <p className="mt-2 font-medium">Drag and drop audio here, or click to choose a file</p>
          <p className="text-sm text-ink-soft">Supported: {ALLOWED.join(', ').toUpperCase()} · max {MAX_MB} MB</p>
          <input ref={inputRef} type="file" accept=".wav,.mp3,.m4a,.flac,.ogg,audio/*" hidden
                 onChange={(e) => pick(e.target.files[0])} />
        </div>
        {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}

        {file && (
          <div className="mt-6 space-y-3">
            <p className="text-sm"><strong>{file.name}</strong> · {(file.size / 1024 / 1024).toFixed(2)} MB
              {duration && ` · ${duration.toFixed(1)} s`}</p>
            <p className="text-xs text-ink-soft">Sample rate and channels are read by the backend in Phase 14.</p>
            <audio controls src={url} className="w-full"
                   onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} />
            <button onClick={() => setDone(true)}
                    className="rounded-xl bg-brand-500 px-5 py-2 font-medium text-white hover:bg-brand-600">
              Analyze
            </button>
          </div>
        )}
      </Card>

      {done && (
        <Card title="Result preview (sample values, no model was run)" className="mt-6">
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[['Emotion', 'Sad'], ['Mood Pattern', 'Low-energy / subdued'], ['Sentiment', 'Negative'], ['Screening Signal', 'Moderate']]
              .map(([k, v]) => (
                <div key={k}><dt className="text-xs uppercase text-ink-soft">{k}</dt><dd className="text-lg font-semibold">{v}</dd></div>
              ))}
          </dl>
        </Card>
      )}
    </>
  )
}
