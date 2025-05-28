const mongoose = require("mongoose");


const teamSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
})

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;