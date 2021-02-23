const express = require('express')
const app = express()
const path = require('path')
const {v4} = require('uuid')

let ARTICLES = [
    {id: v4(), title: 'SOme', description:' some description'}
]


app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'images')))

app.use(express.json())

app.get('/api/articles', (req, res) => {
    res.status(200).json(ARTICLES)
})

app.post('/api/articles', (req, res) => {
    const article = {...req.body, id: v4(), marked: false}
    ARTICLES.push(article)
    res.status(201).json(article)
})

app.delete('/api/articles/:id', (req,res) =>{
    ARTICLES = ARTICLES.filter(c => c.id !== req.params.id)
    res.status(200).json({message: "Article has been deleted"})
})

app.put('/api/articles/:id',(req, res) => {
    const idx = ARTICLES.findIndex(c => c.id === req.params.id)
    ARTICLES[idx] = req.body
    res.json(ARTICLES[idx])
})
app.use(express.static(path.resolve(__dirname, 'client')))


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

app.listen(3000, () => console.log('Server has been started...'))