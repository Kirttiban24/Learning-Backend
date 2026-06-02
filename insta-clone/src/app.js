const express = require("express")
const cookies = require("cookie-parser")
const authRouter = require("./router/auth.routes")
const postRouter = require("./router/post.routes")

const app = express()

app.use(express.json())
app.use(cookies())

app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
module.exports = app