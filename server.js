
const express = require('express');
const bodyParser = require('body-parser');
const ourServer = express();
const port = (process.env.PORT || 8080);
ourServer.set('port', port);
ourServer.use(express.static('public'));
ourServer.use(bodyParser.json());

ourServer.listen(ourServer.get('port'), function () {
    console.log('server running', ourServer.get('port'));
});

//Modules
//----------------------------------------------------------------------------

const authorize = require("./authorize.js");


//Post, Get, list
//----------------------------------------------------------------------------
                          
ourServer.GET("/api/list/:listID", auth ,function (req, res) {
    //return list.
});


ourServer.post("/api/user",function (req, res) {
    res.send(req.body.fornavn).end();
});


