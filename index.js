const PORT = 8000
const express = require('express')
const axios = require('axios');
const cheerio = require('cheerio');
const { contains } = require('cheerio/lib/static');

const app = express()

const articles = []

app.get('/',(req , res)=>{
    res.json('Welcome to Artificial Intelligence API News')
})

app.get('/news', (req, res)=>{
    axios.get(`https://artificialintelligence-news.com/`)
        .then((response)=>{
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("AI")',html).each(function(){
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url
                })
            })
            res.json(articles)
        }).catch((err)=> console.log(err))

}
)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
