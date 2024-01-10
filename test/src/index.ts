import express from 'express'
import {postsRouter, appRouter} from './postsApi'
import bodyParser from 'body-parser'



const port = process.env.PORT || 3000


const app = express()

app.use(bodyParser.json())
app.use("/api/posts", postsRouter)
app.use("/api", appRouter)



app.get('/', (req, res) => {
    res.send('Hello Express!')
})

app.get('/error', (req, res) => {
    throw new Error('Intentional Error!')
    //express seems to send the stack trace to the client, not ideal for security in production but its probably fine for my use case im guessing (not that this is serious project atow)
    res.send('Errorific')
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})