import puppeteer from 'puppeteer';
import { EventEmitter } from 'events';

const states =  {
    NOT_INITIALIZED: "notInitialized",
    INITIALIZING: "initializing",
    INITIALIZED: "initialized",
}

const customEvents = {
    data : "customEventData"
}

const wait = ms => new Promise(resolve => setTimeout(resolve.bind(null, ms), ms));

const urls = [
    'https://www.indeed.com/jobs?q=software+grad&l=United+States&jt=fulltime&explvl=entry_level',
    'https://www.indeed.com/jobs?q=software+college&l=United+States&jt=fulltime&explvl=entry_level',
    'https://www.indeed.com/jobs?q=software+university&l=United+States&jt=fulltime&explvl=entry_level',
    'https://www.indeed.com/jobs?q=software+graduate&l=United+States&jt=fulltime&explvl=entry_level',
    'https://www.indeed.com/jobs?q=entry+software&l=United+States&jt=fulltime&explvl=entry_level',
    'https://www.indeed.com/jobs?q=junior+developer&l=United+States&jt=fulltime&explvl=entry_level',
];

const titleSelector = 'h2.title';
const companySelector = 'span.company';
const locationSelector = 'div.location';
const dateSelector = 'span.date';

const paginationMax = 2;

/**
 * Main Class
 * @extends EventEmitter
 * @constructor
 */
class Crawler extends EventEmitter{
    constructor(options){
        super();
        this._options = options;
        this._browser = undefined;
        this._state = states.NOT_INITIALIZED;
    }

    /**
     * Initize browser
     * @returns {Promise<void>}
     * @private
     */
    _init = async () => {
        this._state = states.INITIALIZING;
        this._browser && this._browser.removeAllListeners();
        const options = Object.assign(
            {},
            {
                headless: true,
                args: [
                    "--lang=en-GB",
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--disable-gpu",
                    "--disable-dev-shm-usage",
                ],
                defaultViewport: null,
                pipe: true,
                slowMo: 10,
            },
            this._options
        )
        this._browser = await puppeteer.launch(options);

        this._state = states.INITIALIZED;
    }

    /**
     * Run crawler
     * @private
     */
    _run = async() => {
        const page = await this._browser.newPage();
        

        for (const url in urls){
            await page.goto(url);
            
            const jobCount = await page.evaluate(
                companySelector => document.querySelectorAll(companySelector).length,
                companySelector
            )
            for (paginationIndex = 0; paginationIndex < paginationMax; paginationIndex++){

                const nextPageUrl = await page.evaluate(
                    _ => document.querySelector(`a[aria-label='Next']`).href
                )
                await page.goto(nextPageUrl);

                let title, link, company, place, type = "Full-Time", level = "Entry Level", date;
                for (jobIndex = 0; jobIndex < jobCount; jobIndex++){
                    [company, place, date, title, link] = await page.evaluate(
                        (
                            companySelector,
                            locationSelector,
                            dateSelector,
                            titleSelector,
                        ) => {
                            return [
                                document.querySelectorAll(companySelector)[jobIndex].innerText,
                                document.querySelectorAll(locationSelector)[jobIndex].innerText,
                                document.querySelectorAll(dateSelector)[jobIndex].innerText,
                                document.querySelectorAll(titleSelector)[jobIndex].innerText,
                                document.querySelectorAll('a.jobtitle')[0].href,
                            ]
                        },
                        companySelector,
                        locationSelector,
                        dateSelector,
                        titleSelector,
                        jobIndex
                    )
                    
                    this.emit(customEvents.data, {
                        link: link,
                        title: title,
                        company: company,
                        place: place,
                        date: date,
                        senorityLevel: level,
                        employmentType: type,
                        industries: "N/A",
                    })
                }
            }
        }
    }

    run = async() => {
        if (this._state === states.NOT_INITIALIZED){
            await this._init();
        }else if (this._state == states.INITIALIZING){
            const timeout = 10000;
            const waitTime = 10;
            let elapsed = 0;

            while(_state !== states.initialized) {
                await wait(waitTime);
                elapsed += waitTime;

                if (elapsed >= timeout) {
                    throw new Error(`Initialize timeout exceeded: ${timeout}ms`);
                }
            }
        }
        await _run();
    }

    close = async() => {
        _browser && _browser.removeAllListeners() && await _browser.close();
        _browser = undefined;
        _state = states.notInitialized;
    }
}

(
    async() => {
        let crawler = new Crawler({});
        crawler.on(events.custom.data, ({ link, title, company, place, senorityLevel, date,  employmentType, industries}) => {
            console.log(
                `Title='${title}'`,
                `Company='${company}'`,
                `Place='${place}'`,
                `Date='${date}'`,
                `Link='${link}'`,
            );
        });

        await Promise.all([
            crawler.run()
        ])
    }
)
