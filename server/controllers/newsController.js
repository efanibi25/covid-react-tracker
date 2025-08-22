const flatCache = require('flat-cache');
const fetch = require('node-fetch');
require('dotenv').config();

const cache = flatCache.load('cacheId');
let news = cache.getKey('news') || [];
let titlelist = cache.getKey('titlelist') || [];

// The main function to handle the route
const getNews = async (req, res) => {
    try {
        const val = await mainNews();
        sendNews(val, res);
    } catch (mainError) {
        try {
            const val = await backupNews();
            sendNews(val, res);
        } catch (backup1Error) {
            try {
                const val = await backupNews2();
                sendNews(val, res);
            } catch (backup2Error) {
                // If all backups fail, send an empty array
                sendNews([], res);
            }
        }
    }
};

// Function to call the first API
function mainNews() {
    const dictkeys = ["title", "link", "published"];
    const urlbase = 'https://google-news.p.rapidapi.com/v1/search?q=coronavirus&country=US&when=1hr&lang=en';
    const options = {
        method: 'GET',
        qs: { q: 'coronavirus', country: 'US', when: '1hr', lang: 'en' },
        headers: {
            'x-rapidapi-key': process.env.RAPID_API,
            'x-rapidapi-host': 'google-news.p.rapidapi.com',
            useQueryString: true
        }
    };
    const max = 1;
    const accesskey = "articles";
    return callApi(urlbase, options, accesskey, max, dictkeys);
}

// Function to call the second API (backup)
function backupNews() {
    const dictkeys = ["title", "link", "published"];
    const urlbase = 'https://google-search3.p.rapidapi.com/api/v1/news/q=coronavirus&country=US&start=';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.RAPID_API,
            'x-rapidapi-host': 'google-search3.p.rapidapi.com',
            useQueryString: true
        }
    };
    const accesskey = "entries";
    const max = 5;
    return callApi(urlbase, options, accesskey, max, dictkeys);
}

// Function to call the third API (backup)
function backupNews2() {
    const dictkeys = ["name", "url", "datePublished"];
    const urlbase = 'https://bing-news-search1.p.rapidapi.com/news/search?q=coronavirus&count=100&mkt=en-US&cc=US&textFormat=Raw&safeSearch=Off&offset=';
    const options = {
        method: 'GET',
        headers: {
            'x-bingapis-sdk': 'true',
            'x-rapidapi-key': process.env.RAPID_API,
            'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
            useQueryString: true
        }
    };
    const accesskey = "value";
    const max = 5;
    return callApi(urlbase, options, accesskey, max, dictkeys);
}

// Main function to fetch data from any API
const callApi = async (urlbase, options, accesskey, max, dictkeys) => {
    let list = [];
    let start = 0;
    let url = new URL(urlbase + start.toString());

    for (let i = 0; i < max; i++) {
        const response = await fetch(url, options);
        const json = await response.json();
        start += 100;

        for (const story of json[accesskey] || []) {
            const item = story;

            if (titlelist.includes(item[dictkeys[0]])) {
                continue;
            }
            titlelist.push(item[dictkeys[0]]);

            const element = {
                title: item[dictkeys[0]],
                link: item[dictkeys[1]],
                published: item[dictkeys[2]]
            };

            list.push(element);
        }
    }
    if (list.length > 0) {
        return list;
    }
    return Promise.reject("empty");
};

// Function to send the news and save to cache
function sendNews(currentnews, res) {
    news = currentnews.concat(news);
    cache.setKey('news', news);
    cache.setKey('titlelist', titlelist);
    cache.save();
    res.send(news);
}

module.exports = {
    getNews,
};