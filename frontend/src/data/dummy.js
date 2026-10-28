// SAMPLE DATA ONLY. Replaced by database values in Phase 14.
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


// ---- Phase 1 Part 2 sample data (SAMPLE ONLY) ----
export const emotionTimeline = [
  { range: '0–10 s', emotion: 'Neutral' },
  { range: '10–20 s', emotion: 'Sad' },
  { range: '20–30 s', emotion: 'Sad' },
  { range: '30–40 s', emotion: 'Neutral' },
]

export const moodSupport = [
  'Lower vocal energy than the sample baseline',
  'Reduced pitch variability',
  'Longer pauses',
  'Negative text sentiment',
]

export const featureEvidence = [
  { feature: 'RMS energy', observed: '0.021', direction: '↓', meaning: 'The analysed speech had relatively lower vocal energy.' },
  { feature: 'Pitch variability (SD)', observed: '18 Hz', direction: '↓', meaning: 'Pitch changed less than is typical in the reference samples.' },
  { feature: 'Pause ratio', observed: '34 %', direction: '↑', meaning: 'A larger share of the recording contained pauses or silence.' },
  { feature: 'Text sentiment', observed: 'Negative', direction: '↑', meaning: 'The transcript was classified as predominantly negative.' },
]

export const waveformData = Array.from({ length: 160 }, (_, i) => ({
  t: i,
  v: +(Math.sin(i / 5) * Math.sin(i / 23) * 0.8).toFixed(3),
}))
export const pitchData = Array.from({ length: 80 }, (_, i) => ({
  t: i,
  hz: +(180 + Math.sin(i / 9) * 14 + Math.cos(i / 4) * 5).toFixed(1),
}))
export const energyData = Array.from({ length: 80 }, (_, i) => ({
  t: i,
  rms: +(0.03 + Math.abs(Math.sin(i / 7)) * 0.04).toFixed(3),
}))
export const mfccMatrix = Array.from({ length: 13 }, (_, r) =>
  Array.from({ length: 40 }, (_, c) => (Math.sin((r + 1) * c / 9) + 1) / 2),
)
export const acousticTable = [
  ['Pitch (mean)', '181 Hz'], ['Pitch (SD)', '18 Hz'], ['RMS energy (mean)', '0.021'],
  ['Speaking rate', '102 words/min'], ['Pause ratio', '34 %'], ['Zero-crossing rate', '0.07'],
]
