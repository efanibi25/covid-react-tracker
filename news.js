const express = require('express');
const router = express.Router()
const fs = require("fs");
var flatCache = require('flat-cache')
var cache = flatCache.load('cacheId');
const fetch = require('node-fetch')

let news = cache.getKey('news') || []
let titlelist = cache.getKey('titlelist')

router.get('/newsgrabber', function (req, res) {
    mainNews().then(function (val) {
        sendNews(val,res)

    })
        .catch(function (val) {
            backupNews().then(function (val) {
                sendNews(val,res)
            }).catch(function (val) {
                backupNews2().then(function (val) {
                    sendNews(val,res)
                }).catch(function (val) {
                    sendNews([],res)
                })


            }

            )

        }
        )
})


function mainNews() {
    dictkeys = ["title", "link", "published"]
    urlbase = 'https://google-news.p.rapidapi.com/v1/search?q=coronavirus&country=US&when=1hr&lang=en';
    options = {
        method: 'GET',
        qs: { q: 'coronavirus', country: 'US', when: '1hr', lang: 'en' },
        headers: {
            'x-rapidapi-key': '49e0aea771mshb777d8a5bc99279p162735jsn31aa6d573916',
            'x-rapidapi-host': 'google-news.p.rapidapi.com',
            useQueryString: true
        }
    };
    max = 1;
    accesskey = "articles"
    return callApi(urlbase, options, accesskey, max)

}


function backupNews() {
    dictkeys = ["title", "link", "published"]
    urlbase = 'https://google-search3.p.rapidapi.com/api/v1/news/q=coronavirus&start='
    options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '49e0aea771mshb777d8a5bc99279p162735jsn31aa6d573916',
            'x-rapidapi-host': 'google-search3.p.rapidapi.com',
            useQueryString: true
        }
    };
    accesskey = "entries";
    max = 5;

    return callApi(urlbase, options, accesskey, max)

}


function backupNews2() {
    dictkeys = ["name", "url", "datePublished"]
    urlbase = 'https://bing-news-search1.p.rapidapi.com/news/search?q=coronavirus&count=100&mkt=en-US&textFormat=Raw&safeSearch=Off&offset='
    options = {
        method: 'GET',
        headers: {
            'x-bingapis-sdk': 'true',
            'x-rapidapi-key': '49e0aea771mshb777d8a5bc99279p162735jsn31aa6d573916',
            'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
            useQueryString: true
        }
    };
    accesskey = "value";


    return callApi(urlbase, options, accesskey, max)

}

callApi = async (urlbase, options, accesskey, max) => {
    let list = []
    let start = 0;
    url = new URL(urlbase + start.toString()) || urlbase
    console.log(url)
    for (let i = 0; i < max; i++) {
        console.log("Page Number ", i + 1)
        //get results

        const response = await fetch(url, options);
        const json = await response.json();
        start = start + 100;




        //loop through results need accesskey to get to list
        for (story in json[accesskey]) {
            let item = json[accesskey][story];

            if (titlelist.indexOf(item[dictkeys[0]]) != -1) {
                continue
            }
            titlelist.push(item[dictkeys[0]])

            element = {};
            //Limit use of API plus google api seems to dupe
            element.title = item[dictkeys[0]];
            element.link = item[dictkeys[1]];
            element.published = item[dictkeys[2]]

            list.push(element)
        }
    }
    if (list.length > 0) {
        return list;
    }
    return Promise.reject("empty")

}

function sendNews(currentnews,res){
    news=currentnews.concat(news)
    cache.setKey('news', news);
    cache.setKey('titlelist', titlelist);
    cache.save();
    res.send(news);
}
module.exports = router
