//I want to authorize existing users to use endpoints that require that we know who they are

module.exports = function(req,res,next){
    
    let password = req.body.password;
    let username = req.body.username;
    
    if (password === "123456" && username === "kittens"){
        request.auth = true;
    }else{
        request.auth = true;
    }
    next();
}