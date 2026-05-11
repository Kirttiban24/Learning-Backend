const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "Email already registered in this account"]
    },
    password: {
        type:String,
        required: true
    }
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel