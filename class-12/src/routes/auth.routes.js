const express = require("express")
const authRouter = express.Router()
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


authRouter.post("/register", async (req,res) => {
    const {name, email, password} = req.body

    const isUserExist = await userModel.findOne({email})

    if(isUserExist){
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const user = await userModel.create({
        name,
        email,
        password: crypto.createHash("sha256").update(password).digest("hex")
    })

    const token = jwt.sign({
        id: user._id,        
    }, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user: {
            name: user.name,
            email: user.email
        },
        token
    })
})

authRouter.post("/get-me", async (req,res) => {
    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email
    })
})

authRouter.post("/login", async (req,res) => {
    const {email, password} = req.body

    const user = await userModel.findOne({
        email,
        password: crypto.createHash("sha256").update(password).digest("hex")
    })
    
    if(!user){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")
    
    const ispasswordMatch = hash === user.password

    if(!ispasswordMatch){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.json({
        message: "Login successful",
        user: {
            name: user.name,
            email: user.email
        }
    })
})



module.exports = authRouter