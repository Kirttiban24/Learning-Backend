const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    bio: String,
    profileImage: {
        type: String, 
        default: "https://ik.imagekit.io/i4pjkric2/insta-clone-posts/user.png?updatedAt=1783880245239"
    },

})

const userModel = mongoose.model("User", userSchema)

module.exports = userModel