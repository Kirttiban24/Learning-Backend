const express = require("express")
const cookies = require("cookie-parser")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cookies())
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

/* require routes */
const authRouter = require("./router/auth.routes")
const postRouter = require("./router/post.routes")
const userRouter = require("./router/users.routes")

/* use routes */
app.use("/api/auth", authRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)


module.exports = app