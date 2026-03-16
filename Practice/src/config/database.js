const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb+srv://sonu:SSDijK9aaYTqCKPY@cluster0.41wpkht.mongodb.net/Practice")
    .then(() => {
        console.log("connected to Database");
    })
}


module.exports = connectToDb