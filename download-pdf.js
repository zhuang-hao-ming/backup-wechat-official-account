
const puppeteer = require('puppeteer');
const fs = require('fs');
const promisify = require('util').promisify;
const dedupe = require('dedupe');

const readFile = promisify(fs.readFile);



async function scrollPage(page) {
    await page.evaluate(() => {
        const scrollInterval = 1000;
        const scrollStep = Math.floor(window.innerHeight / 2);
        return new Promise((resolve, reject) => {
            let preYOffset = -1;
            let tryTime = 0;
            function scrollDown() {

                window.scrollBy(0, scrollStep);
                
                if (window.pageYOffset == preYOffset) {
                    if (tryTime == 10) {
                        setTimeout(resolve, 500);
                        console.log('return');
                        return;
                    } else {
                        tryTime += 1;
                    }
                    
                } else {
                    tryTime = 0;
                }

                preYOffset = window.pageYOffset

                setTimeout(scrollDown, scrollInterval);
            }
            setTimeout(reject, 300000);
            scrollDown();
        });
    });
}

async function getUrlList() {
    let data = await readFile('url.txt', 'utf8');
    let urlList = data.split('\n');
    
    urlList = dedupe(urlList);
    
    return urlList;
    
}

async function renderPdf() {
    
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files (x86)/Google/Chrome Beta/Application/chrome.exe',
        // headless: false
    });

    let urlList = await getUrlList();

    for (let i = 0; i < urlList.length; i++) {
        link = urlList[i]
        console.log(i, link)
        let page = await browser.newPage();
        await page.goto(link, { waitUntil: 'networkidle2'});
        let title = await page.title();
        title = title.replace(/[—\?".,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ");
        console.log(`render ${title}`);
        await scrollPage(page);
        await page.pdf({ path: `./didi/${title}.pdf`, format: 'A4' });
        await page.close();
    }
    await browser.close()
}

renderPdf()