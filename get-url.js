const puppeteer = require('puppeteer');
const fs = require('fs');
const promisify = require('util').promisify;
const writeFile = promisify(fs.writeFile);






async function scrollPage(page) {
    await page.evaluate(() => {
        const scrollInterval = 200;
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


async function getUrls() {
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files (x86)/Google/Chrome Beta/Application/chrome.exe',
        // headless: false
    });
    let page = await browser.newPage();
    
   
    await page.goto('https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzAxNzU1ODM4NA==&scene=124&uin=MTE2MDY4Nzk2MQ%3D%3D&key=c0a5de018bf99cfb5d13dffda6ddc6343417c0cdee3716ed8938fb901024574c0d29798ead84c706b0f62232ec711f46e504a552286f560df00fe509be3f5af6f49beeeae77fa02fcaf6f30fae961316&devicetype=Windows+10&version=62060028&lang=zh_CN&a8scene=7&pass_ticket=qyId4oaIMBJhO3yvGY2cai8XowcwchK5AWOEepXl4zFQl%2BPHpBaKyvJObvbJMkpM&winzoom=1', { waitUntil: 'networkidle2' });
    await scrollPage(page);

    urls = await page.$$eval('[hrefs]', aList => {
        urls = []
        for (let i = 0; i < aList.length; i++) {
            urls.push(aList[i].getAttribute('hrefs'))
        }
        return urls
    });

    console.log(urls)
    
    await writeFile('url.txt', urls.join('\n'))

    await page.close();
    await browser.close();
}



getUrls();


