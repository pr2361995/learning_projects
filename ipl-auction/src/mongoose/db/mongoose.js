const mongoose = require("mongoose");

//connection to database
const connectDB = async () => await mongoose.connect("mongodb://127.0.0.1:27017/ipl-auction", {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('Connected to MongoDB'))
.catch((error) => console.error("connection error",error));

module.exports = connectDB;