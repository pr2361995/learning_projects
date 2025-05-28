const jwt = require("jsonwebtoken");
const {helpers} = require("../helper");


const getTokenfromHeader = (req) => {
    const token_parts = req.headers.authorization.split(' ');
    if(token_parts.length === 2 )
        return token_parts[1];
    throw new Error("unable to get the token");
}
//code goes here to authenticate admin
const generateToken = (id) => {
    try{
        const token = jwt.sign({id},helpers.secret_token);
        return token;
    }
    catch(err){
        throw new Error("Token genrate errror's " + err.toString())
    }
}


const verifyToken = (req,res,next) => {
    try{
        const token = getTokenfromHeader(req);
        const decode = jwt.verify(token,helpers.secret_token);
        next();
    }catch(err){
        res.status(400).send("Token genrate errror's " + err.toString())
    }
}

module.exports = {generateToken,verifyToken};