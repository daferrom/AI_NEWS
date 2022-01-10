const PORT = 8000
const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const { contains } = require('cheerio/lib/static');

const app = express()

const newspapers =[
    {
        name: "ArtificialIntelligenceNews",
        adress: "https://artificialintelligence-news.com"
    },
    {
        name: "Sciencedaily",
        adress: "https://www.sciencedaily.com/news/computers_math/artificial_intelligence/"
    },
    {
        name: "bbc",
        adress: "https://www.bbc.co.uk/news/topics/ce1qrvleleqt/artificial-intelligence"
    },
    {
        name: "MIT",
        adress:"https://news.mit.edu/topic/artificial-intelligence2"
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.adress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('a:contains("AI")', html).each(function(){
                const title = $(this).text()
                const url = $(this).attr('href')   
                
                articles.push({
                    title,
                    url,
                    source: newspaper.name
                })  
            })
        })
})

app.get('/',(req , res)=>{
    res.json('Welcome to Artificial Intelligence API News')
})

app.get('/news', (req, res)=>{
    res.json(articles)
}
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
