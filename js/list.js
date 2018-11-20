var express = require('express');
var router = express.Router();
var db = require("./db.js")

router.post('/app/posts', async function(req, res, next){
   // let query = "";
    let tittel = req.body.tittel;
    let innhold = req.body.innhold;
    let userID = req.body.user.id;

    let query = `INSERT INTO "public"."posts"("userid", "tittel", "innhold") 
        VALUES('${userID}', '${tittel}', '${innhold}') RETURNING *`;


    console.log(query);

   
    let post = await db.insert(query) 
    if(post){
    res.status(200).json(JSON.stringify(post)).end()
        }else{
            res.status(500).end()
        }
});




const list = {}
module.exports = router;
