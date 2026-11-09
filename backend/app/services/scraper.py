import requests
from bs4 import BeautifulSoup


def scrape_website(url: str):

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    try:
        response = requests.get(
            url,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 "
                    "(Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36"
                )
            },
            timeout=10
        )

        response.raise_for_status()

        soup = BeautifulSoup(
            response.text,
            "html.parser"
        )

        title = (
            soup.title.string.strip()
            if soup.title and soup.title.string
            else "No Title"
        )

        headings = []

        for tag in soup.find_all(["h1", "h2", "h3"]):
            text = tag.get_text(strip=True)

            if text:
                headings.append(text)

        return {
            "url": url,
            "title": title,
            "headings": headings
        }

    except Exception as e:
        raise Exception(f"Scraping failed: {str(e)}")