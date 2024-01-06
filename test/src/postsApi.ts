
import express from 'express'
import db from './db'


const router = express.Router()



const getPosts = db.query(`SELECT * FROM posts`)
router.get('', (req, res) => {
    const x = getPosts.all()
    res.send(x)
})

const insertPost = db.query(`INSERT INTO posts (ownerId, content) VALUES ($ownerId, $content)`)
router.post('', (req, res) => {
    // console.log("body: ", req.body)
    if (!req?.body?.ownerId || !req?.body?.content)  {
        return res.sendStatus(400);
    }

    
    
    insertPost.run({ $ownerId: req.body.ownerId, $content: req.body.content })
    console.log("added post", req.body)
    return res.sendStatus(200)
})

router.put('/:id', (req, res) => {

})

router.delete('/:id', (req, res) => {

})


export default router