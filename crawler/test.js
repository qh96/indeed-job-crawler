import puppeteer from 'puppeteer'

(async () => {
    const options = {
        headless : true,
        // args: [
        //     "--lang=en-GB",
        //     "--no-sandbox",
        //     "--disable-setuid-sandbox",
        //     "--disable-gpu",
        //     "--disable-dev-shm-usage",
        // ],
        // defaultViewport: null,
        // pipe: true,
        // slowMo: 10,
    };
    const url_l = "https://www.linkedin.com/jobs";
    const url_i = 'https://www.indeed.com/';
    const query = "Software Engineer";
    const location = "United States";

    const browser = await puppeteer.launch(options);
    browser && browser.removeAllListeners();
    console.info("0")

    const page = await browser.newPage();
    await page.goto(url_i);
    console.info("1")
    await Promise.all([
        page.waitForSelector("form#whatWhereFormId", {timeout: 10000}),
        page.waitForSelector(`div[class="icl-WhatWhere-buttonWrapper"] button`, {timeout: 10000})
    ])

    // const whereValue = document.querySelector(`form#whatWhereFormId input#text-input-where`).value;
    await page.evaluate(() => document.querySelector(`form#whatWhereFormId input#text-input-what`).value = "");
    // await page.evaluate(() => document.querySelector(`form#whatWhereFormId input#text-input-where`).value = "");
    
    await page.click(`form#whatWhereFormId input#text-input-where`, {clickCount : 3});
    // await page.keyboard.down('Shift');
    // for (let i = 0; i < whereValue.length; i++)
    // await page.keyboard.press('ArrowLeft');
    // await page.keyboard.up('Shift');
    await page.keyboard.press('Backspace');
    
    console.info("2")
    await page.type(`form#whatWhereFormId input#text-input-what`, query);
    await page.type(`form#whatWhereFormId input#text-input-where`, location);
    console.info("3")
    await page.focus(`div[class="icl-WhatWhere-buttonWrapper"] button`)
    await page.keyboard.press("Enter")
    await page.waitForNavigation()
    // await Promise.all([
        
    console.info("4")
    // ]);

    await page.screenshot({path: 'example.png'});

    await browser.close();
  })();