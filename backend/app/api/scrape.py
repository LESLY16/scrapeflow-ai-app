import json

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.scrape import ScrapeResult

from app.schemas.scrape import ScrapeRequest

from app.services.playwright_scraper import (
    scrape_with_playwright
)

router = APIRouter()


@router.post("/scrape")
def scrape(
    request: ScrapeRequest,
    db: Session = Depends(get_db)
):
    try:

        result = scrape_with_playwright(
            request.url
        )

        record = ScrapeResult(
            url=result["url"],

            title=result["title"],

            headings=json.dumps(
                result["headings"]
            ),

            paragraphs=json.dumps(
                result["paragraphs"]
            ),

            links=json.dumps(
                result["links"]
            ),

            images=json.dumps(
                result["images"]
            ),

            metadata=json.dumps(
                result["metadata"]
            )
        )

        db.add(record)

        db.commit()

        db.refresh(record)

        return record

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }


@router.get("/scrapes")
def get_scrapes(
    db: Session = Depends(get_db)
):
    return (
        db.query(
            ScrapeResult
        )
        .order_by(
            ScrapeResult.id.desc()
        )
        .all()
    )


@router.get("/scrapes/{scrape_id}")
def get_scrape(
    scrape_id: int,
    db: Session = Depends(get_db)
):
    return (
        db.query(
            ScrapeResult
        )
        .filter(
            ScrapeResult.id == scrape_id
        )
        .first()
    )


@router.delete("/scrapes/{scrape_id}")
def delete_scrape(
    scrape_id: int,
    db: Session = Depends(get_db)
):

    scrape = (
        db.query(
            ScrapeResult
        )
        .filter(
            ScrapeResult.id == scrape_id
        )
        .first()
    )

    if not scrape:

        return {
            "success": False,
            "message": "Scrape not found"
        }

    db.delete(scrape)

    db.commit()

    return {
        "success": True,
        "message": "Scrape deleted successfully"
    }