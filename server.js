const { By, Key, Builder, until } = require('selenium-webdriver'); // Import 'until'
require('chromedriver');

async function test_open() {
  const driver = new Builder().forBrowser('chrome').build();
  try {
    // Open Google and search for YouTube
    await driver.get('https://www.google.com');
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('YouTube', Key.RETURN);

    // Wait until YouTube link is visible and clickable
    const youtubeLink = await driver.wait(until.elementLocated(By.partialLinkText('YouTube')), 10000);
    await driver.wait(until.elementIsVisible(youtubeLink), 10000);
    
    // Click on the YouTube link
    await youtubeLink.click();  

    const searchInput = await driver.findElement(By.name('search'));
    await searchInput.sendKeys('love song', Key.RETURN);

    const searchResultsContainer = await driver.wait(
      until.elementLocated(By.id('contents')),
      10000
    );
    
    // Wait until the first video result is visible
    const firstVideoResult = await driver.wait(
      until.elementLocated(By.css('#contents ytd-video-renderer')),
      10000
    );
    
    // Click on the first video result
    await firstVideoResult.click();

    // Wait for a specific element on the video page to ensure it has loaded
    const videoTitle = await driver.wait(
      until.elementLocated(By.css('h1.title')),
      10000
    );



  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    // await driver.quit();
  }
}

test_open();
