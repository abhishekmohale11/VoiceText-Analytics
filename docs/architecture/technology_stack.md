# VoiceText Analytics - Technology Stack

## 1. Frontend

Primary technologies:

- React
- Tailwind CSS
- Chart.js or equivalent charting library

Responsibilities:

- User interface
- Dashboard
- Audio recording
- Audio upload
- Text input
- Analysis visualization
- Charts
- Reports
- History
- Settings

---

## 2. Backend

Primary technologies:

- Python
- FastAPI

Responsibilities:

- REST APIs
- Authentication
- Authorization
- File management
- Session management
- ML inference orchestration
- Database communication
- Report generation

---

## 3. Database

Primary database:

- PostgreSQL

Expected data:

- User accounts
- Sessions
- Audio metadata
- Transcripts
- Features
- Predictions
- Reports
- Model versions

---

## 4. Machine Learning

The project will use Python-based ML components.

Possible technologies:

- scikit-learn
- PyTorch
- TensorFlow

The final choice for individual models will depend on dataset
experiments and evaluation.

---

## 5. Audio Processing

Potential technologies:

- librosa
- openSMILE
- pyAudioAnalysis
- FFmpeg

These will be introduced during the audio-processing phase rather than
all being installed during Phase 0.

---

## 6. Speech Recognition

The project will use a speech-to-text system.

The exact ASR implementation will be selected during the speech
recognition phase based on:

- Accuracy
- Language support
- Resource requirements
- Offline capability
- Processing speed

---

## 7. NLP

Potential technologies:

- Hugging Face Transformers
- BERT/RoBERTa-based models
- spaCy
- NLTK

The final NLP models will be selected during the NLP phase.

---

## 8. Explainable AI

Potential technologies:

- SHAP
- Model-specific feature importance
- Interpretable feature summaries

The explanation system must remain consistent with the actual model
being used.

---

## 9. Communication

For live/near-live functionality, the architecture may use:

- WebRTC
- WebSocket-based communication

This will be implemented only when the live-analysis phase begins.

---

## 10. Development Tools

- Git
- GitHub
- VS Code
- Python virtual environment
- Jupyter Notebook

---

## 11. Deployment

Potential deployment technologies:

- Docker
- Nginx
- Cloud or local deployment

Deployment choices will be finalized later.

---

## 12. Phase 0 Principle

Only the minimum dependencies required for project foundation should be
installed during Phase 0.

Machine-learning and audio-processing dependencies will be installed
when their corresponding phases begin.

This prevents unnecessary dependency conflicts and keeps development
manageable.