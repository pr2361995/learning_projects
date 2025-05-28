const express = require("express");
const adminRouter = require("./routers/admin");
const connectDB = require("./mongoose/db/mongoose")
const Players = require("./mongoose/models/players");
const Admin = require("./mongoose/models/admin");
const adminAuth = require("./middlewares/adminAuth");
const jwt = require("jsonwebtoken");

//setting up express router
const app = express();

//setting up the express middlewares
app.use(express.json());
app.use(adminRouter);


connectDB();

app.post("/signup",async (req,res) => {
    const admin = await new Admin(req.body);
    admin.save().then(data => res.send(data))
    .catch(e => res.status(400).send(e.toString()))
});

app.post('/login',async (req,res) => {
    const {name = "",password=""} = req.body
    const admin = await Admin.findOne({name:name,password:password}).exec();
    if(!admin){
      res.status(400).send("login failure");
    }
    if(admin){
      const token = jwt.sign({_id: admin._id},
          admin.tokens[0].token,
          { expiresIn: "24h" }
      );
      res.status(200).send({
              userId: admin._id,
              email: admin.email,
              token: !admin.token ? [token] : admin.token.concat(token),
          });
    }
});

app.post('/addPlayer',(req,res)=>{
    const players = new Players({...req.body});
    players.save()
    .then(da => res.status(201).send(players))
    .catch(e => res.status(400).send(e.toString()))
});

app.get('/viewPlayer/:playerId',async (req,res)=>{
    const player = await Players.findOne({_id:req.params.playerId}).exec();
    if(Object.keys(player).length <= 0){
        res.status(400).send("Player not founded")
    }
    res.send(player);
});

app.patch('/editPlayer/:playerId',async (req,res)=>{
    const player = await Players.findById(req.params.playerId).exec();
    if(!player){
        res.status(400).send("Player not founded")
    }
    Object.keys(req.body).forEach(field => !player[field] ? (delete req.body[field])   : "")
    const updatePlayer = await Players.updateOne({_id:req.params.playerId},req.body).exec();
    res.send(updatePlayer);
});

app.delete('/deletePlayer/:playerId',async (req,res)=>{
    const player = await Players.findById(req.params.playerId).exec();
    if(!player){
        res.status(400).send("Player not founded")
    }
    const deletePlayer = await Players.deleteOne({_id:req.params.playerId}).exec();
    res.send(deletePlayer);
});

app.get('/viewPlayers/:teamName',async (req,res) => {
    const player = await Players.find({bought_by : req.params.teamName}).exec();
    if(!player){
        res.status(400).send("Player not founded")
    }
    res.send(player);
});

app.patch('/playerBought/:teamName',async (req,res) => {
    const player = await Players.findById(req.body.id).exec();
    if(!player){
        res.status(400).send("Player not founded")
    }
    const boughtPlayer = await Players.updateOne({_id:req.body.id},{unsold:false,bidded_by : req.params.teamName}).exec();
    res.send(boughtPlayer);
});

const player_sold_price_update = (base_price,sold_price) => {
  if(sold_price === 0){
    sold_price = base_price
  }
    if(1000000 <= sold_price && sold_price < 10000000 )
        return sold_price += 500000;
    else if(10000000 <= sold_price && sold_price < 50000000)
        return sold_price += 1000000;
    else if(50000000 <= sold_price && sold_price < 100000000)
        return sold_price += 2500000;
    else if(100000000 <= sold_price && sold_price < 200000000)
        return sold_price += 5000000;
    else if(200000000 <= sold_price )
        return sold_price += 10000000;
    else 
        return sold_price;
}

app.patch('/players/bid/:playerId',async (req,res)=>{
    const player = await Players.findById(req.params.playerId).exec();
    if(!player){
        res.status(400).send("Player not founded")
    }
    const updatePlayer = await Players.updateOne({_id:req.params.playerId},{bidded_by : req.body.teamName,
      sold_price : player_sold_price_update(player.base_price,player.sold_price)}).exec();
    res.send(updatePlayer);
});

app.get('/displayPlayer/:count',async (req,res)=>{
    // const player = await Players.aggregate([
    //     {  $match:
    //         {
    //             "type" : req.query.type,
    //             "displayed_count" : 0,
    //             "unsold" : true
    //         } 
    //     },{
    //       $group:
    //         {
    //           _id: "$_id",
    //           maxQuantity: { $max: "$base_price" }
    //         }
    //     }
    //   ]).exec();
      const player = await Players.findOne(
            {
                "type" : req.query.type,
                "displayed_count" : req.params.count,
                "unsold" : true
            } 
      ).sort({base_price : -1}).exec();
    if(!player){
        res.status(400).send("Player not founded")
    }
    player.displayed_count += 1;
    player.save();
    res.send([player]);
});


//exporting the app
module.exports = app;