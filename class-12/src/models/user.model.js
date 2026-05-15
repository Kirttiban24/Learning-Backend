const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
 const userModel = mongoose.model("User", UserSchema)

 module.exports = userModel;