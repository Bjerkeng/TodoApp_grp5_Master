var express = require('express');
var router = express.Router();
var db = require("./db.js")

router.get("/app/lists", async function(req,res,next){
    let query = "Select * from lists where userid = " + req.query.token + " and active = 1";
    let lists = await db.select(query);
    
    if(lists){
    res.status(200).json(lists).end()
        }else{
            res.status(500).end()
        }
});

router.get("/app/posts", async function(req,res,next){
    let query = "Select * from posts where userid = " + req.query.token;
    //listid = " + req.body.listeid + " and 
    let posts = await db.select(query)
    
    
    if(posts){
    res.status(200).json(posts).end()
        }else{
            res.status(500).end()
        }
});

router.post("/app/list", async function(req,res,next){
    // Lager ny liste eks: Handlliste, Julgaveliste etc.
    // retuner ny liste (inkludert id etc)..
    let tittel = req.body.tittel;
    let innhold = req.body.innhold;
    let userID = req.body.user.id;

    let query = `INSERT INTO "public"."lists"("userid", "title", "description") 
        VALUES('${userID}', '${tittel}', '${innhold}') RETURNING *`;


    console.log(query);

   
    let post = await db.insert(query) 
    if(post){
    res.status(200).json(JSON.stringify(post)).end()
        }else{
            res.status(500).end()
        }
    
});

router.post("/app/list/delete", async function(req,res,next){

    let deleteListId = req.body.deleteListId;
    let query = `UPDATE lists SET active = '0' WHERE id = '${deleteListId}'`;
    
    console.log(query);

    let post = await db.update(query) 
    if(post){
    res.status(200).json(JSON.stringify(post)).end()
        }else{
            res.status(500).end()
        }
    
});

router.post("/app/list/update", async function(req,res,next){

    let updateListId = req.body.updateListId;
    let oppdaterTittel = req.body.oppdaterTittel;
    let oppdaterInnhold = req.body.oppdaterInnhold;
    
    let query = `UPDATE lists SET title = '${oppdaterTittel}', description = '${oppdaterInnhold}' WHERE id = '${updateListId}'`;
    
    console.log(query);

    let post = await db.update(query) 
    if(post){
    res.status(200).json(JSON.stringify(post)).end()
        }else{
            res.status(500).end()
        }
    
});

router.post("/app/post/update", async function(req,res,next){

    let updatePostId = req.body.updatePostId;
    let oppdaterOverskrift = req.body.oppdaterOverskrift;
    let oppdaterInnhold = req.body.oppdaterPostInnhold;

    let query = `UPDATE posts SET tittel = '${oppdaterOverskrift}', innhold = '${oppdaterPostInnhold}' WHERE postid = '${updatePostId}'`;
    
    console.log(query);

    let post = await db.update(query) 
    if(post){
    res.status(200).json(JSON.stringify(post)).end()
        }else{
            res.status(500).end()
        }
    
});

router.post('/app/list/posts', async function(req, res, next){
   // let query = "";
    let overskrift = req.body.overskrift;
    let postinnhold = req.body.postinnhold;
    let userID = req.body.user.id;
    let listeid = req.body.listeid; //listeid

    let query = `INSERT INTO "public"."posts"("userid", "tittel", "innhold", "listid") 
        VALUES('${userID}', '${overskrift}', '${postinnhold}', '${listeid}') RETURNING *`;


    console.log(query);

   
    let post = await db.insert(query) 
    if(post){
    res.status(200).json(JSON.stringify(post)).end()
        }else{
            res.status(500).end()
        }
});
/*
router.get('/app/list/:listID', async function(req, res, next){

    let listID = req.params.listID
    let query = `select * from posts where listId = ${listID}`;
    console.log(query);
    
    let post = await db.insert(query) 
    if(post){
    res.status(200).json(JSON.stringify(post)).end()
        }else{
            res.status(500).end()
        }
});

*/

const list = {}
module.exports = router;
