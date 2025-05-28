const mongoose = require("mongoose");

//set the validations for fields as mentioned in the problem statement

//setting up the players schema
const playerTypes = ["Batsman","Bowler","All-rounder"];
const handUser = ["Right","Left","NA"];
const bowlsTypes = ["Fast","Medium","Spin","Leg-spin","Chinaman","NA"];

const playersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min : 3,
        validate (value){
            if ( value.length < 3 ){
                throw new Error("name 3 letter is required");
            } 
        }
    },
    age: {
        type: Number,
        required: true,
        validate (value){
            if ( value < 15 ){
                throw new Error("age 15 is required");
            } 
        }
    },
    type: {
        type: String,
        required: true,
        validate (value){
            if (!playerTypes.some(pt => pt === value)){
                throw new Error("Invalid Player type");
            } 
        }
    },
    bats: {
        type: String,
        required: true,
        validate (value){
            if (!handUser.some(pt => pt === value)){
                throw new Error("Invalid Player bats");
            } 
        }
    },
    bowls: {
        type: String,
        required: true,
        validate (value){
            if (!handUser.some(pt => pt === value)){
                throw new Error("Invalid Player bats");
            } 
        }
    },
    bowling_style: {
        type: String,
        required: true,
        validate (value){
            if (!bowlsTypes.some(pt => pt === value)){
                throw new Error("Invalid Player bowling_style");
            } 
        }
    },
    bat_avg: {
        type: Number,
        default: 0.00
    },
    bowl_avg: {
        type: Number,
        default: 0.00
    },
    bat_strike_rate: {
        type: Number,
        default: 0.00
    },
    bowl_strike_rate: {
        type: Number,
        default: 0.00
    },
    catches: {
        type: Number,
        default: 0
    },
    run_outs: {
        type: Number,
        default: 0
    },
    thirtys: {
        type: Number,
        default: 0
    },
    fifties: {
        type: Number,
        default: 0
    },
    centuries: {
        type: Number,
        default: 0
    },
    three_WH: {
        type: Number,
        default: 0
    },
    five_WH: {
        type: Number,
        default: 0
    },
    highest_runs: {
        type: Number,
        default: 0
    },
    best_bowling: {
        type: String,
        default: "0/0"
    },
    overseas: {
        type: Boolean,
        default: false
    },
    displayed_count: {
        type: Number,
        default: 0
    },
    unsold: {
        type: Boolean,
        default: true
    },
    base_price: {
        type: Number,
        default: 1000000,
    },
    sold_price: {
        type: Number,
        default: 0
    },
    bought_by: {
        type: String,
        default: ""
    },
    bidded_by: {
        type: String,
        default: ""
    }
});

//setting up players model
const Players = mongoose.model("Players", playersSchema);

//exporting the players collection
module.exports = Players;