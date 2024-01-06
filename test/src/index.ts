import express from 'express'
import postsRouter from './postsApi'
import bodyParser from 'body-parser'



const port = process.env.PORT || 3000


const app = express()

app.use(bodyParser.json())
app.use("/api/posts", postsRouter)





app.get('/', (req, res) => {
    res.send('Hello Express!')
})





app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})