const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  
  // Enable console logging
  page.on('console', (msg) => {
    console.log('BROWSER LOG:', msg.type().toUpperCase(), msg.text());
  });
  
  page.on('pageerror', (error) => {
    console.log('PAGE ERROR:', error.toString());
  });
  
  page.on('requestfailed', (request) => {
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
  });
  
  try {
    console.log('Navigating to Spanish homepage...');
    await page.goto('http://localhost:8000/es', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    console.log('Page loaded, waiting for React components...');
    await page.waitForTimeout(3000); // Give React time to render
    
    // Check if hero section is rendered
    const heroTitle = await page.$eval('h1.slogan-title', el => el.textContent).catch(() => 'NOT FOUND');
    console.log('Hero title content:', heroTitle);
    
    // Check language attribute
    const htmlLang = await page.$eval('html', el => el.lang).catch(() => 'NOT FOUND');
    console.log('HTML lang attribute:', htmlLang);
    
    // Check if Spanish translations are loaded
    const consoleLogs = await page.evaluate(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Console logs captured');
        }, 1000);
      });
    });
    
    console.log('Keeping browser open for manual inspection...');
    // Don't close the browser automatically - let user inspect
    // await browser.close();
    
  } catch (error) {
    console.error('Error during test:', error);
    await browser.close();
  }
})();