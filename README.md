<div align="center">

# ✨ ScrapeFlow AI

### Turn a website URL into structured content—right from a clean, responsive dashboard.

[![React](https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/API-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.x-3776ab?logo=python&logoColor=white)](https://www.python.org/)
[![Vite](https://img.shields.io/badge/Frontend-Vite-646cff?logo=vite&logoColor=white)](https://vite.dev/)

**ScrapeFlow AI** is a full-stack website scraping app. Submit a URL to collect useful page content, then browse and manage your scrape history in one place.

</div>

---

## 🌟 What it does

- **Scrapes rendered web pages** with a headless Chromium browser powered by Playwright.
- **Extracts page content:** title, headings, paragraphs, links, images, and description/keyword metadata.
- **Keeps a scrape history** in a local SQLite database, with options to view and delete saved results.
- **Offers a responsive dashboard** built with React and Material UI.
- **Provides a REST API** with FastAPI and interactive API documentation.

> Scraping results depend on the target website, its structure, and its access policies. Scrape responsibly and only access content you are authorized to use.

## 🧰 Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Vite, Material UI, Axios |
| Backend | Python, FastAPI, SQLAlchemy |
| Browser scraping | Playwright, Chromium |
| Database | SQLite (default configuration) |

## 🚀 Getting started

### Prerequisites

- Python 3.9 or newer
- Node.js and npm
- A supported environment for Playwright's Chromium browser

### 1. Clone the repository

```bash
git clone https://github.com/LESLY16/scrapeflow-ai-app.git
cd scrapeflow-ai-app
```

### 2. Start the backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

```bash
# macOS / Linux
source .venv/bin/activate

# Windows PowerShell
.venv\Scripts\Activate.ps1
```

Install the Python dependencies and Playwright's Chromium browser:

```bash
pip install -r requirements.txt
pip install playwright
playwright install chromium
```

Run the API from the `backend` directory:

```bash
uvicorn app.main:app --reload
```

The API is available at **http://127.0.0.1:8000**. FastAPI's interactive documentation is at **http://127.0.0.1:8000/docs**.

### 3. Start the frontend

In a second terminal, from the repository root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (by default, **http://localhost:5173**). The frontend's API client currently targets `http://127.0.0.1:8000`, and the backend allows the default Vite origin.

## 🔌 API

The API currently exposes these endpoints:

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Check that the API is running |
| `POST` | `/scrape` | Scrape a website and save the result |
| `GET` | `/scrapes` | List saved scrape results (newest first) |
| `GET` | `/scrapes/{scrape_id}` | Get a saved result by ID |
| `DELETE` | `/scrapes/{scrape_id}` | Delete a saved result by ID |

Example request:

```bash
curl -X POST http://127.0.0.1:8000/scrape \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

Each scrape result includes the URL, page title, headings, paragraphs, links, images, metadata, and creation time. The project creates its SQLite database (`scrapeflow.db`) in the backend's current working directory when the API starts.

## 🗂️ Project structure

```text
scrapeflow-ai-app/
├── backend/
│   ├── app/
│   │   ├── api/          # FastAPI routes
│   │   ├── db/           # SQLAlchemy database setup
│   │   ├── models/       # Database models
│   │   ├── schemas/      # Request and response schemas
│   │   └── services/     # Scraping implementations
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/   # Dashboard UI components
    │   └── services/     # API client
    └── package.json
```

## 🛠️ Useful commands

Run these from `frontend/`:

```bash
npm run dev      # Start the Vite development server
npm run build    # Build the production frontend
npm run preview  # Preview the production build
npm run lint     # Run Oxlint
```

## ⚖️ Responsible use

Use ScrapeFlow only on websites where you have permission to access and process the content. Respect each site's terms of service, robots directives, rate limits, privacy requirements, and applicable laws. Do not use the tool to collect sensitive or personal information without a lawful basis and authorization.

## 🤝 Contributing

Contributions and suggestions are welcome. Open an issue to discuss a bug or feature, or submit a pull request with a clear description of your changes.

## 📄 License

No license is currently specified for this repository. Please contact the repository owner before redistributing or reusing the code.

---

<div align="center">

Made with ☕ and curiosity.

</div>
