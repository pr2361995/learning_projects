const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {helpers} = require("../../helper");

const adminSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true,
    },
    tokens:[{
        token: {
            type : String,
            required:true
        }
    }]
})

adminSchema.methods.generateToken = async function(id){
    const admin = this;
    const token = jwt.sign({id},helpers.secret_token);
    if(admin.tokens)
        admin.tokens = admin.tokens.concat({token});
    else 
        admin.tokens = [{token}];
    await admin.save();
    return token;
}

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;