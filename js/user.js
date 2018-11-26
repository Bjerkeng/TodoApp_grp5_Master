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
  
    var bcrypt = require('bcrypt');
    bcrypt.genSalt(10, async function(err, salt) {
        bcrypt.hash(req.body.pswHash, salt, async function(err, hash) {
            let userEmail = req.body.email;
            let userName = req.body.name;
            let passwordHash = hash;
            let userRole = req.body.userRole;
            
        
let query = `INSERT INTO "public"."users"("email", "username", "hash", "role") 
        VALUES('${userEmail}', '${userName}', '${passwordHash}', ${userRole}) RETURNING "id", "email", "username", "hash", "role"`;
    
    console.log(query);
    
    let code = await db.insert(query) ? 200:500;
    res.status(code).json({}).end()
        });
    });
})

router.get('/app/user/:userName', function(req,res,next){
    
    let passwordHash = req.body.pswHash;
    let userName = req.params["userName"]
    
    
    let query = `SELECT * from users WHERE username='${userName}' and hash='${passwordHash}'`;
    
    let user = db.select(query);
    
    
    if(user){
        res.status(200).json(user).end();
    } else {
        res.status(401).json(user).end();
    }
    
    //let code = db.insert(query) ? 200:500;
    //res.status(code).json({}).end();
})

const user = {}
module.exports = router;
