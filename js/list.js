var express = require('express');
var router = express.Router();
var db = require("./db.js")

router.get('/app/posts', async function(req, res, next){
   // let query = "";
    let tittel = req.body.tittel;
    let innhold = req.body.innhold;
    let userID = 23;

    let query = `INSERT INTO "public"."posts"("userID", "tittel", "innhold") 
        VALUES('${userID}', '${tittel}', '${innhold}') RETURNING "postID", "userID", "tittel", "innhold", "date"`;


    console.log(query);

    let code = await db.insert(query) ? 200:500;
    res.status(code).json({}).end()
});




const list = {}
module.exports = router;
