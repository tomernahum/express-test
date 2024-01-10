
import express from 'express'
import db from './db'


const postsRouter = express.Router()
const appRouter = express.Router()


//get all posts //todo pagination
const getPosts = db.query(`SELECT * FROM posts`)
postsRouter.get('', (req, res) => {
    const x = getPosts.all()

    console.log(req.body)
    res.send(x)
})

//get posts by a certain user:
const getPostByOwnerId = db.query(`SELECT * FROM posts WHERE ownerId = $ownerId`)
appRouter.get('/users/:ownerId/posts', (req, res) => {
    const x = getPostByOwnerId.all({ $ownerId: req.params.ownerId })
    res.send(x)
})

//get posts by a list of users



const getPost = db.query(`SELECT * FROM posts WHERE id = $id`)
postsRouter.get('/:id', (req, res) => {
    const x:any = getPost.get({ $id: req.params.id })
    res.send(x?.content)
})

// const getPost = db.query(`SELECT * FROM posts WHERE id = $id`)
postsRouter.get('/:id/content', (req, res) => {
    const x = getPost.get({ $id: req.params.id })
    // console.log(getPost.toString());
    res.send(x)
})


const insertPost = db.transaction(({$ownerId, $content})=>{
    db.query(`INSERT INTO posts (ownerId, content) VALUES ($ownerId, $content)`).run({ $ownerId: $ownerId, $content: $content })
    return db.query(`SELECT last_insert_rowid()`).values()[0][0];
    //guessing making this a transaction will stop the possibility of race conditions on whats the last inserted id. using last_insert_rowid() is how you get the last inserted row's id from what i've googled
})
postsRouter.post('', (req, res) => {
    if (!req?.body?.ownerId || !req?.body?.content)  {
        return res.sendStatus(400);
    }

    const id = insertPost({ $ownerId: req.body.ownerId, $content: req.body.content })
    console.log("added post", id, req.body)
    return res.send({ insertedPostId: id })
})


//not 100% on meaning of put in REST/HTTP convention, if its supposed to have the id and timestamp column as well or not, and if its supposed to be allowed to do partial updates (maybe that's patch?)
const updatePost = db.query(`UPDATE posts SET ownerId = $ownerId, content = $content WHERE id = $id`)
postsRouter.put('/:id', (req, res) => {
    if (!req?.body?.ownerId || !req?.body?.content)  {
        return res.sendStatus(400);
    }

    updatePost.get({ $id: req.params.id, $ownerId: req.body.ownerId, $content: req.body.content })
    
    res.sendStatus(200)
})


const deletePost = db.query(`DELETE FROM posts WHERE id = $id`)
postsRouter.delete('/:id', (req, res) => {

    deletePost.get({ $id: req.params.id })
    
    res.sendStatus(200)
})


export {postsRouter, appRouter}