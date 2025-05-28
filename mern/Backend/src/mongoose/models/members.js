const mongoose = require("mongoose");


const memberSchema = new mongoose.Schema({
    employee_id: {
        type : Number,
        required:true,
        min  : 100000,
        max  : 3000000,
    },
    employee_name: {
        type:String,
        required:true,
        minLength:3,
        validate: {
            validator: function(v) {
                var regex = /^[a-zA-Z ]*$/;
                return regex.test(v) === true;
            },
            message: props => `${props.value} Employee name must be alhpha and space`
        },
    },
    technology_name:{
        type:String,
        required:true,
    },
    experience : {
        type : Number,
        required:true,
        min : 0,
    }
})

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;