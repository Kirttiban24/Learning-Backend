const express = require("express")
const cookies = require("cookie-parser")
const authRouter = require("./router/auth.routes")

const app = express()

app.use(express.json())
app.use(cookies())

app.use("/api/auth", authRouter)

module.exports = app