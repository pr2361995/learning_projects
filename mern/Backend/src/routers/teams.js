const express = require("express");
const Admin = require("../mongoose/models/admin");
const Member = require("../mongoose/models/members");
const Team = require("../mongoose/models/teams");
const auth = require("../middlewares/auth")
//setting up router for teams
const membersRouter = new express.Router();

//code goes here for endpoints
const bt = express();

membersRouter.route("/admin/signup").post(async (req,res)=>{
    const {name="",password=""} = req.body
    try {
        const admin = await Admin.find({name}).exec();
        if(admin.length > 0){
            res.status(400).send("Already exist the name");
            return;
        }
        const newadmin = new Admin({name,password});
        const adminData = await newadmin.save();
        res.status(201).send(adminData);
    }catch(e){
        res.status(400).send(e.toString());
    }
});

membersRouter.route("/admins").get(async (req,res)=>{
    try {
        const admins = await Admin.find({}).exec();
        res.status(201).send(admins);
    }catch(e){
        res.status(400).send(e.toString());
    }
});


membersRouter.route("/admins").delete(async (req,res)=>{
    try {
        const admins = await Admin.deleteMany({}).exec();
        res.status(201).send(admins);
    }catch(e){
        res.status(400).send(e.toString());
    }
});

membersRouter.route("/admin/login").post(async (req,res)=>{
    const {name="",password=""} = req.body
    const admin = await Admin.findOne({name:name,password:password}).exec();
    if(admin && Object.keys(admin).length > 0){
        const token = await admin.generateToken(admin._id);
        res.status(200).send({token});
    }else
        res.status(400).send({"error":"Username or password is wrong"});
}) 


membersRouter.route("/tracker/members/add").post(auth.verifyToken,async (req,res)=>{
    try {
        const {employee_id,employee_name,technology_name,experience} = req.body;
        if(employee_id && employee_name && technology_name && experience){
            const members = await Member.find({employee_id,technology_name}).exec();
            if(members.length <= 0){
                const teams = await Team.find({name:technology_name}).exec();
                if(teams.length <= 0){
                    const team = new Team({name:technology_name});
                    team.save();
                }
                const member = new Member({...req.body});
                member.save().then(resp => {
                    res.status(201).send(member);
                }).catch(e => res.status(400).send({"error":e.toString()}));
                return;
            }else
               res.status(400).send({"error":"Member with same team already exists"});
        }else 
            res.status(400).send({"error":"Member with same team already exists"});
    }catch(e){
        res.status(400).send({"error":"Member with same team already exists"});
    }
}) 

membersRouter.route("/tracker/members/update/:id").patch(auth.verifyToken,async (req,res)=>{
    try {
        const member = await Member.findOne({_id:req.params.id}).exec();
        if(Object.keys(member).length <= 0){
            res.status(400).send({"error":"Not founded"});
            return;
        }else {
            const updateDetails = await Member.updateOne({_id:req.params.id},req.body,{runValidators:true}).exec();
            res.status(200).send(updateDetails);
            return;
        }
    }catch(e){
        res.status(400).send({"error":e.toString()})
    }
})

membersRouter.route("/tracker/members/display").get(auth.verifyToken,async (req,res)=>{
    const {tech : technology_name=null,experience=0} = req.query;
    try{
        const members = await Member.find(!technology_name ? { experience : { $gte : experience }} : {technology_name,experience:{$gte : experience}}).exec();
        res.status(200).send(members)
    }catch(e){
        res.status(400).send({"error":e.toString()})
    }
}); 

membersRouter.route("/tracker/members/delete/:id").delete(auth.verifyToken,async (req,res)=>{
    try{
        const deleteDetails = await Member.deleteOne({_id:req.params.id}).exec();
        res.status(200).send(deleteDetails)
    }catch(e){
        res.status(400).send({"error":e.toString()})
    }
})

membersRouter.route("/tracker/technologies/add").post(auth.verifyToken,async (req,res)=>{
    try {
        const {technology_name} = req.body;
        const teams = await Team.find({name:technology_name}).exec();
        if(teams.length <= 0){
            const team = new Team({name:technology_name});
            team.save()
            .then(resp => res.status(201).send(resp) )
            .catch(e => res.status(400).send({"error":e.toString()}))
        }else 
            res.status(400).send("teams name already exist");
    }catch(e){
        res.status(400).send("error : "+e.toString());
    }
}) 

membersRouter.route("/tracker/technologies/get").get(auth.verifyToken,async (req,res)=>{
    try{
        const teams = await Team.find({}).exec();
        res.status(200).send(teams)
    }catch(e){
        res.status(400).send({"error":e.toString()})
    }
}) 
membersRouter.route("/tracker/technologies/remove/:name").delete(auth.verifyToken,async (req,res)=>{
    try{
        const {name}  = req.params;
        await Team.deleteMany({name}).exec();
        const deleteDetails = await Member.deleteMany({technology_name:name}).exec();
        res.status(200).send(deleteDetails)
    }catch(e){
        res.status(400).send({"error":e.toString()})
    }
})

module.exports = membersRouter;

