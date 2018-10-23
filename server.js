const express = require('express');
const bodyParser = require('body-parser');
const ourServer = express();
const port = (process.env.PORT || 8080);

//let user = db.select("Selct * from Users where id=123")
//Modules
//----------------------------------------------------------------------------

const authorize = require("./authorize.js");
const db = require("./js/db.js");
const user = require("./js/user.js");

//-------------------------------------------------------------

ourServer.set('port', port);
ourServer.use(express.static('public'));
ourServer.use(bodyParser.json());

ourServer.use(user);

ourServer.listen(ourServer.get('port'), function () {
    console.log('server running', ourServer.get('port'));
});

//Post, Get, list
//----------------------------------------------------------------------------
/* 
ourServer.get('/app/requsts', function(req,res, next){
    res.json(studentNames).end();
})

                       
ourServer.GET("/api/list/:listID", auth ,function (req, res) {
    //return list.
});


ourServer.post("/api/user",function (req, res) {
    res.send(req.body.fornavn).end();
});

ourServer.get('/app/users', function(req,res,next){
    let query = "Select * from Users";
    let users = db.select(query);
    
    if(users){
       res.status(200).json(JSON.parse(users));
    }else{
    //??
    }
});

ourServer.post('/app/users', function(res,res,next){
    
    let userEmail = req.body.email;
    let userName = req.body.name;
    let passwordHash = req.body.pswHash;
    let userRole = req.body.role;
    
    let query = `INSERT INTO "public"."Users"("email", "username", "hash", "role") VALUES('${userEmail}','${userName}', '${passwordHash}', ${userRole}) RETURNING "id", "email", "hash", "role"`;
    
    let code = db.insert(query) ? 200:500;
    res.status(code).json({}).end();
})
*/



