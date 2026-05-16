# Quorum

![quorum](header.jpg)

Instead of asking one LLM, convene a **Quorum**. Multiple models answer your question independently, critique each other anonymously, then a chairman synthesizes the final answer.

Fully local, lightweight web app. Minimal, readable code. Runs on localhost.

## How It Works

Each query goes through 3 stages:

1. **Stage 1 — Individual Responses:** All council models answer independently. Tab view lets you inspect each response.
2. **Stage 2 — Peer Rankings:** Each model evaluates the others' responses. Identities are anonymized (Response A, B, C…) to prevent bias. Each model ranks the rest by accuracy and insight.
3. **Stage 3 — Final Synthesis:** The Chairman model (strongest) reads all responses + peer rankings and compiles the definitive answer.

## Features

- Dark mode UI with progressive streaming (each stage appears as it completes)
- Sidebar with conversation history — create, rename, and delete chats
- Transparent: inspect raw model outputs, extracted rankings, and aggregate scores
- Persistent conversations (JSON storage, no database needed)
- Single OpenRouter API key covers all model providers

## Setup

### 1. Get an OpenRouter API Key

Sign up at [openrouter.ai](https://openrouter.ai/) and create an API key. Create a `.env` file in the project root:

```
OPENROUTER_API_KEY=sk-or-v1-...
```

> **Never commit this file.** It is already in `.gitignore`.

### 2. Install Dependencies

**Backend** (requires Python 3.10+):

With `uv` (recommended):
```bash
uv sync
```

Or with pip:
```bash
pip install fastapi uvicorn python-dotenv httpx pydantic
```

**Frontend:**
```bash
cd frontend
npm install
```

### 3. Configure Models (Optional)

Edit `backend/config.py` to customize the council:

```python
COUNCIL_MODELS = [
    "openai/gpt-4o-mini",
    "google/gemini-2.5-flash",
    "anthropic/claude-haiku-4-5",
    "meta-llama/llama-3.3-70b-instruct",
]

CHAIRMAN_MODEL = "google/gemini-2.5-flash"
```

Any model available on [OpenRouter](https://openrouter.ai/models) works here.

## Running

**Option 1: Start script**
```bash
./start.sh
```

**Option 2: Manual**

Terminal 1 — Backend:
```bash
uv run python -m backend.main
# or: python -m backend.main
```

Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
```

Open **http://localhost:5173** in your browser.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | FastAPI (Python 3.10+), async httpx |
| Frontend | React 19 + Vite, react-markdown, SweetAlert2 |
| Models | OpenRouter API (single key, all providers) |
| Storage | JSON files in `data/conversations/` |
| Package mgmt | uv (Python), npm (JS) |

## Ports

- Backend: `http://localhost:8001`
- Frontend: `http://localhost:5173`
