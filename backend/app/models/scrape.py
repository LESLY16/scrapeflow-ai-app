from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from datetime import datetime

from app.db.database import Base


class ScrapeResult(Base):
    __tablename__ = "scrapes"

    id = Column(Integer, primary_key=True, index=True)

    url = Column(String)

    title = Column(String)

    headings = Column(Text)

    paragraphs = Column(Text)

    links = Column(Text)

    images = Column(Text)

    metadata = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )