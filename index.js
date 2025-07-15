import puppeteer from 'puppeteer';

const url = 'https://cineru.lk/how-to-train-your-dragon-2025-sinhala-sub/';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  // Set a custom user-agent (optional)
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114 Safari/537.36');

  await page.goto(url, { waitUntil: 'networkidle2' });

  // Wait for the download-card section to load
  await page.waitForSelector('.download-card');

  // Extract Google Drive links
  const links = await page.evaluate(() => {
    const gdriveLinks = [];
    const elements = document.querySelectorAll('.btn-gdrive');

    elements.forEach(el => {
      const link = el.getAttribute('data-link');
      if (link && link.includes('drive.google.com')) {
        gdriveLinks.push(link);
      }
    });

    return gdriveLinks;
  });

  console.log('🎯 Google Drive Links Found:');
  console.log(links);

  await browser.close();
})();
