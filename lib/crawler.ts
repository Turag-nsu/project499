import puppeteer, { Browser, Page } from 'puppeteer';

export const scrapeFacebookEventLinks = async (): Promise<string[]> => {
  let browser: Browser | null = null;

  try {
    // Launch Puppeteer in headed mode
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page: Page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    // Log in to Facebook
    await page.goto('https://www.facebook.com/login');
    await page.type('#email', 'ruse0148@gmail.com'); // Replace with your email
    await page.type('#pass', '@@nayem123@@'); // Replace with your password
    await page.click('button[name="login"]');
    await page.waitForNavigation();

    // Go to the events page
    await page.goto('https://www.facebook.com/events/explore/dhaka-bangladesh/101889586519301/');

    // Wait for event cards to load
    await page.waitForSelector(
      '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x78zum5.xdt5ytf.x5yr21d.x1qughib.xh8yej3'
    );

    // Extract all event card URLs
    const eventLinks: string[] = await page.evaluate(() => {
      const cards = document.querySelectorAll(
        '.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x87ps6o.x1lku1pv.x1a2a7pz.x78zum5.xdt5ytf.x5yr21d.x1qughib.xh8yej3 a'
      );
      return Array.from(cards)
        .map((card) => (card as HTMLAnchorElement)?.href) // Cast card to HTMLAnchorElement
        .filter((link) => !!link); 
    });

    return eventLinks;
  } catch (error) {
    console.error('Error during scraping:', error);
    return [];
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
