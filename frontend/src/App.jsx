function App() {
  return (
    <div className="app">

      {/* Header */}
      <header className="header">
        <div>
          <h1>VoiceText Analytics</h1>
          <p>Multimodal Speech & Emotional Pattern Analysis</p>
        </div>

        <div className="status">
          <span></span>
          System Foundation
        </div>
      </header>

      {/* Main Content */}
      <main className="main">

        <section className="welcome">
          <p className="label">AI RESEARCH PLATFORM</p>

          <h2>
            Understand speech, text,
            <br />
            emotion and mood patterns.
          </h2>

          <p className="description">
            VoiceText Analytics combines speech processing, natural language
            processing and machine learning to study emotional and
            mental-health-related patterns.
          </p>
        </section>

        {/* Feature Cards */}
        <section className="cards">

          <div className="card">
            <div className="icon">🎙️</div>
            <h3>Audio Analysis</h3>
            <p>
              Acoustic features, speech characteristics and audio patterns.
            </p>
            <span className="coming">Coming in ML phases</span>
          </div>

          <div className="card">
            <div className="icon">💬</div>
            <h3>Text Analysis</h3>
            <p>
              Transcript, sentiment, emotion and linguistic analysis.
            </p>
            <span className="coming">Coming in NLP phase</span>
          </div>

          <div className="card">
            <div className="icon">🧠</div>
            <h3>Emotion & Mood</h3>
            <p>
              AI-based emotion recognition and broader mood-state estimation.
            </p>
            <span className="coming">Coming in ML phases</span>
          </div>

          <div className="card">
            <div className="icon">📊</div>
            <h3>Reports & Trends</h3>
            <p>
              Explainable results, session reports and historical trends.
            </p>
            <span className="coming">Coming later</span>
          </div>

        </section>

        {/* Disclaimer */}
        <section className="disclaimer">
          <strong>Research & Screening Support</strong>

          <p>
            This project is designed as an educational and research-based
            screening-support system. Its outputs are not medical diagnoses
            and should not replace professional evaluation.
          </p>
        </section>

      </main>
    </div>
  );
}

export default App;