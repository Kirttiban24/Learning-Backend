const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")

/** 
 * @routes POST /api/posts [protected]
 * @description Create a new post
 */
postRouter.post("/", upload.single("image"), identifyUser ,postController.createPostController)

/**
 * @routes GET /api/posts [protected]
 * @description Get all posts
 */
postRouter.get("/", identifyUser ,postController.getPostController)

/**
 * @routes GET /api/posts/details/:postId
 * @description Get details of a specific post
 */
postRouter.get("/details/:postId", identifyUser , postController.getPostDetailsController)


postRouter.post("/like/:postId", identifyUser, postController.likePostController)

module.exports = postRouter