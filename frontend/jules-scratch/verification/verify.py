import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    try:
        print("Navigating to the page...")
        page.goto("http://localhost:5173/knowledge-graph", timeout=90000)

        page.wait_for_selector('h1', timeout=15000)

        print("Checking for heading...")
        heading = page.get_by_role("heading", name="Knowledge Graph Visualizer")
        expect(heading).to_be_visible()
        print("Heading found.")

        print("Checking for uploader text...")
        uploader_text = page.get_by_text("Drag & drop a PNG file here, or click to select")
        expect(uploader_text).to_be_visible()
        print("Uploader text found.")

        print("Taking screenshot...")
        page.screenshot(path="jules-scratch/verification/verification.png")
        print("Screenshot taken successfully.")

    except Exception as e:
        print(f"An error occurred: {e}")
        page.screenshot(path="jules-scratch/verification/error.png")

    finally:
        print("Closing browser.")
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
