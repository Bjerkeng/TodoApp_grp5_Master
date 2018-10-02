
const express = require('express');
const bodyParser = require('body-parser');
const ourServer = express();
const port = (process.env.PORT || 8080);
ourServer.set('port', port);
ourServer.use(express.static('public'));
ourServer.use(bodyParser.json());

ourServer.post("/api/user",function (req, res) {
    res.send(req.body.fornavn).end();
});
/*
ourServer.listen(ourServer.get('port'), function () {
    console.log('server running', ourServer.get('port'));
});*/


