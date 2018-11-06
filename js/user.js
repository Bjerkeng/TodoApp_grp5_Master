var express = require('express');
var router = express.Router();
var db = require("./db.js")

router.get('/app/user', function(req,res,next){
    let query = "Select * from users";
    let users = db.select(query);
    
    if(users){
        console.log(users)
       res.status(200).json(JSON.parse(users));
    }else{
    //??
    }
});


router.post('/app/user',async function(req,res,next){
  
    let userEmail = req.body.email;
    let userName = req.body.name;
    let passwordHash = req.body.pswHash;
    let userRole = req.body.role;
    
     let query = `INSERT INTO "public"."Users"("email", "username", "hash", "role") 
        VALUES('${userEmail}', '${userName}', '${passwordHash}', ${userRole}) RETURNING "id", "email", "username", "hash", "role"`;
    let code = await db.insert(query) ? 200:500;
    res.status(code).json({}).end();
})

router.get('/app/user/:userName', function(req,res,next){
    
    let passwordHash = req.body.pswHash;
    let userName = req.params["userName"]
    
    
    let query = `SELECT * from users WHERE userName='${userName}' and hash='${passwordHash}'`;
    
    let user = db.select(query);
    
    
    if(user){
        res.status(200).json(user).end();
    } else {
        res.status(401).json(user).end();
    }
    
    //let code = db.insert(query) ? 200:500;
    //res.status(code).json({}).end();
})
/*
router.post('/app/users', function(req,res,next){
    //let checkId = ??;
    //let checkEmail = req.body.email;
    let updatePassword = req.body.passWord;
    
    let query = `UPDATE user SET hash = ${updatePassword} WHERE email = ${checkId}`;
    
    let code = db.update(query) ? 200:500;
    res.status(code).json({}).end();
 
 
 router.delete('/delete/users', function(req,res,next){
    
    let query = `UPDATE user SET hash = ${updatePassword} WHERE email = ${checkId}`;
    
    let code = db.update(query) ? 200:500;
    res.status(code).json({}).end();
    
}
    
router.post('/app/users', function(req,res,next){
    let checkId = req.body.id;
    let checkEmail = req.body.email;
    let updatePassword = req.body.passWord;
    
    let query = 
    `UPDATE user SET hash = 0, WHERE email = ${checkId}`
    `INSERT INTO "public"."Delted-Users"("email", "username", "hash", "role") VALUES('${userEmail}','${userName}', '${passwordHash}', ${userRole}) RETURNING "id", "email", "hash", "role"`
    ;
    
    let code = db.update(query) ? 200:500;
    res.status(code).json({}).end();    
})*/

const user = {}
module.exports = router;
