const express = require('express');
const bodyParser = require('body-parser');
const ourServer = express();
const port = (process.env.PORT || 8080);

//Modules
//----------------------------------------------------------------------------

const authorize = require("./authorize.js");
const user = require("./js/user.js");
const que = require("./js/requestQue.js") // Module for the que of questions / requests for help.
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./js/db.js')
const list = require('./js/list.js')

const SUPER_SECRET_KEY = process.env.TOKEN_KEY || "TransparantWindowsFlyingDonkeys"; // for use with web token.
const DEBUG = true;
//-------------------------------------------------------------

ourServer.set('port', port);
ourServer.use(express.static('public'));
ourServer.use(bodyParser.json());

ourServer.use(user);
ourServer.use(que);
ourServer.use(list);

ourServer.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Oops thats bad');
});

ourServer.listen(ourServer.get('port'), function () {
    console.log('server running', ourServer.get('port'));
});

//Autentisering
//--------------------------------------------------------------------------

// All request for authentication will come to this one spot. 
// This is for demonstration purposes. A more useful approach would be to make authentication/authorization into a middleware module 
ourServer.get("/app/authenticate", async function (req, res, next) {

    log("Authentication request recived");
    let authorizationHeader = req.headers['authorization'];

    if (!authorizationHeader) { // If there is no authorization header the client has not done a proper request.
        log("Missing authentication header, ending request with 401 code");
        res.status(401).end(); // We respond by telling the client that it has not been authenticated as of yet. (this brakes with basic auth since we are not setting the header)
    } else {

        let credentials = authorizationHeader.split(' ')[1]; // We know that the header value starts with Basic and then a space. Annything following that space will be the credentials from the client.
        let rawData = Buffer.from(credentials, 'base64'); // At the moment the the credentials are in a base 64 encoded format, so we must do a transformative step.
        credentials = rawData.toLocaleString().split(":"); // We know that the username and password are delimited by a :. Spliting on : gives us an array wit username at pos 0 and password at pos 1. 

        log(`Authenticate : ${credentials[0]} `);

        let username = credentials[0].trim();
        let password = credentials[1].trim();

        let user = null;
        try{
            user =  await databaseQuery(username, password); ///databaseQuery(username, password) // if the username and password are correct we will get a user object in return at this point.
        }catch(err){
            console.log(err);
        }
        
        if (user) {
            // There was a user in the database with the correct username and password
            // This is where we are diverging from the basic authentication standard. by creating a token for the client to use in all later corespondanse. 
            log("User is authenticated");
            log(user);
            let token = jwt.sign({
                id: user.id,
                username: user.username
            }, SUPER_SECRET_KEY); // Create token 

            res.status(200).send({
                auth: token,
                user: {
                    id: user.id,
                    name: user.username
                }
            }).end(); // Send token and authenticated user to client.

        } else {
            // The request did not have valid credentials. 
            log("Bad credentials");
            res.status(401).end(); // We respond by telling the client that it has not been authenticated as of yet.
        }
    }
});

async function databaseQuery(username, password) {

    let user = await db.select(`SELECT * from users WHERE username='${username}'`);

    // 2. If we found a user, check the password. 
    if (user && user.length === 1) {
        user = user[0];
        const isCorrect = await bcrypt.compare(password, user.hash); // We use bcrypt to compare the hash in the db with the password we recived. 
        // 3. if the password is correct the userobject is parsed on
        if (!isCorrect) {
            user = null;
        }
    }

    return Promise.resolve(user);
}

// this function is used as a midelware for endpoints that requier access token (auth user)
function validateAuthentication(req, res, next) {
    let token = req.headers['x-access-auth'] || req.body.auth || req.params.auth; // Suporting 3 ways of submiting token
    log(token);
    try {
        let decodedToken = jwt.verify(token, SUPER_SECRET_KEY); // Is the token valid?
        req.token = decodedToken; // we make the token available for later functions via the request object.
        next(); // The token was valid so we continue 
    } catch (err) {
        res.status(401).end(); // The token could not be validated so we tell the user to log in again.
    }
}


// The following function is so that we have a endpoint that requiers authentication before it can be used.
// Note how the validate function is being used. Remember that this would benefit from being a module.
ourServer.get("/app/quote", validateAuthentication, function (req, res, next) {
    log(`request token ${req.token}`); // we can se who is using this endpoint because we now have a decoded token.
    let quote = getRandomQuote();
    res.status(200).json({
        quote: quote
    });
});

// utility functions ------------------------------------------------------------------------------------

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}

