const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")


postRouter.post("/", upload.single("image"), identifyUser ,postController.createPostController)

postRouter.get("/", identifyUser ,postController.getPostController)

postRouter.get("/details/:id", identifyUser , postController.getPostDetailsController)

module.exports = postRouter