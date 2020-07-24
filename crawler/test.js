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
    /**
     * 
     Software grad
        https://www.indeed.com/jobs?q=software+grad&l=United+States&jt=fulltime&explvl=entry_level

        Software college
        https://www.indeed.com/jobs?q=software+college&l=United+States&jt=fulltime&explvl=entry_level

        Software university
        https://www.indeed.com/jobs?q=software+university&l=United+States&jt=fulltime&explvl=entry_level

        Software graduate
        https://www.indeed.com/jobs?q=software+graduate&l=United+States&jt=fulltime&explvl=entry_level

        entry software
        https://www.indeed.com/jobs?q=entry+software&l=United+States&jt=fulltime&explvl=entry_level

        junior developer
        https://www.indeed.com/jobs?q=junior+developer&l=United+States&jt=fulltime&explvl=entry_level
     */
    const url = "https://www.indeed.com/jobs?q=software+grad&l=United+States&jt=fulltime&explvl=entry_level";
    const url_i = 'https://www.indeed.com/jobs?q=';
    const query = "Software Engineer";
    const location = "United States";

    const browser = await puppeteer.launch(options);
    browser && browser.removeAllListeners();
    console.info("0")

    const page = await browser.newPage();
    await page.goto(url);
    console.info("1")
    // await Promise.all([
    //     page.waitForSelector("form#whatWhereFormId", {timeout: 10000}),
    //     page.waitForSelector(`div[class="icl-WhatWhere-buttonWrapper"] button`, {timeout: 10000})
    // ])

    // // const whereValue = document.querySelector(`form#whatWhereFormId input#text-input-where`).value;
    // await page.evaluate(() => document.querySelector(`form#whatWhereFormId input#text-input-what`).value = "");
    // // await page.evaluate(() => document.querySelector(`form#whatWhereFormId input#text-input-where`).value = "");
    
    // await page.click(`form#whatWhereFormId input#text-input-where`, {clickCount : 3});
    // // await page.keyboard.down('Shift');
    // // for (let i = 0; i < whereValue.length; i++)
    // // await page.keyboard.press('ArrowLeft');
    // // await page.keyboard.up('Shift');
    // await page.keyboard.press('Backspace');
    
    // console.info("2")
    // await page.type(`form#whatWhereFormId input#text-input-what`, query);
    // await page.type(`form#whatWhereFormId input#text-input-where`, location);
    // console.info("3")
    // await page.focus(`div[class="icl-WhatWhere-buttonWrapper"] button`)
    // await page.keyboard.press("Enter")
    // await page.waitForNavigation()
    // await Promise.all([
        
    // console.info("4")
    // ]);

    /**
     * 
     * document.querySelectorAll('h2.title')[0].innerText

    document.querySelectorAll('span.company')[0].innerText

    document.querySelectorAll('div.location')[0].innerText

    document.querySelectorAll('span.date')[0].innerText 

    document.querySelectorAll('a.jobtitle')[0].href

    document.querySelector(`a[aria-label='Next']`).href
     */ 



    await page.screenshot({path: 'example.png'});

    await browser.close();
  })(); 