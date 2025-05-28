const jwt = require("jsonwebtoken");

//write your code for JWT token authentication for admin

const adminAuth = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(400).send("Invalid token");
    }
    try{
        const decodedToken = jwt.verify(token, "secretkeyappearshere");
        req.user = decodedToken;
        next();
    }catch(e){
        res.status(400).send("Invalid token");
    }

}
module.exports = adminAuth;