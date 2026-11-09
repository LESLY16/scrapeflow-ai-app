from playwright.sync_api import sync_playwright
import re


def clean_url(url: str) -> str:
    """
    Extract URL if user accidentally pastes HTML anchor tag.
    """

    href_match = re.search(
        r'href="([^"]+)"',
        url
    )

    if href_match:
        return href_match.group(1)

    return url.strip()


def scrape_with_playwright(url: str):

    url = clean_url(url)

    if not url.startswith(
        ("http://", "https://")
    ):
        url = "https://" + url

    try:

        with sync_playwright() as p:

            browser = p.chromium.launch(
                headless=True
            )

            page = browser.new_page(
                viewport={
                    "width": 1920,
                    "height": 1080
                },
                user_agent=(
                    "Mozilla/5.0 "
                    "(Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 "
                    "(KHTML, like Gecko) "
                    "Chrome/120.0.0.0 "
                    "Safari/537.36"
                )
            )

            print("=" * 50)
            print(f"Opening URL: {url}")

            page.goto(
                url,
                wait_until="domcontentloaded",
                timeout=60000
            )

            page.wait_for_timeout(3000)

            title = page.title()

            page_html = page.content()

            print(f"Title: {title}")
            print(f"HTML Length: {len(page_html)}")

            headings = page.evaluate("""
                Array.from(
                    document.querySelectorAll(
                        'h1,h2,h3'
                    )
                )
                .map(e => e.innerText)
                .filter(
                    e => e.trim() !== ''
                )
            """)

            paragraphs = page.evaluate("""
                Array.from(
                    document.querySelectorAll(
                        'p'
                    )
                )
                .map(e => e.innerText)
                .filter(
                    e => e.trim() !== ''
                )
            """)

            links = page.evaluate("""
                Array.from(
                    document.querySelectorAll(
                        'a[href]'
                    )
                )
                .map(a => ({
                    text: a.innerText || '',
                    href: a.href || ''
                }))
            """)

            images = page.evaluate("""
                Array.from(
                    document.querySelectorAll(
                        'img'
                    )
                )
                .map(img => img.src)
                .filter(src => src)
            """)

            metadata = page.evaluate("""
                (() => {

                    const description =
                        document.querySelector(
                            'meta[name="description"]'
                        )?.content || '';

                    const keywords =
                        document.querySelector(
                            'meta[name="keywords"]'
                        )?.content || '';

                    return {
                        description,
                        keywords
                    };

                })()
            """)

            print(
                f"Headings Found: {len(headings)}"
            )

            print(
                f"Paragraphs Found: {len(paragraphs)}"
            )

            print(
                f"Links Found: {len(links)}"
            )

            print(
                f"Images Found: {len(images)}"
            )

            browser.close()

            return {
                "url": url,
                "title": title,
                "headings": headings[:100],
                "paragraphs": paragraphs[:100],
                "links": links[:200],
                "images": images[:200],
                "metadata": metadata
            }

    except Exception as e:

        print("=" * 50)
        print("SCRAPER ERROR")
        print(str(e))
        print("=" * 50)

        return {
            "url": url,
            "title": "Scraping Failed",
            "headings": [],
            "paragraphs": [],
            "links": [],
            "images": [],
            "metadata": {
                "error": str(e)
            }
        }