from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base
from app.db.database import engine

from app.api.scrape import router as scrape_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ScrapeFlow AI",
    version="1.0.0"
)

# CORS Configuration
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(scrape_router)


@app.get("/")
def home():
    return {
        "message": "ScrapeFlow AI Running"
    }