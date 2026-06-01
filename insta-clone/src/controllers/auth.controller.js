const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


async function registerController (req, res) {
    const {username, email, password, bio, profileImages} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
    })

    if(isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImages
    })

    const token = jwt.sign({
        id: user._id
        },
        process.env.JWT_SECRET,
        {expiresIn: "24h"
})

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user:{
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImages: user.profileImages
        },
        token
    })
}

async function loginController (req, res)  {
    const {username, email, password} = req.body

    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },

            {
                email: email
            }
        ]
    })

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    if(hash !== user.password) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {expiresIn: "24h"}
    )
    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImages: user.profileImages
        }
    })
}

module.exports = {
    registerController,
    loginController
}