from pydantic import BaseModel


class ScrapeRequest(BaseModel):
    url: str


class ScrapeResponse(BaseModel):
    id: int
    url: str
    title: str
    headings: str

    class Config:
        from_attributes = True