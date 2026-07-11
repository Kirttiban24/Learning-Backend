const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage()})
const identifyUser = require("../middlewares/auth.middleware")
const User = require("../models/user.model")

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

/** 
 * @routes POST /api/posts/like/:postId [protected]
 * @description Like a specific post
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

/**
 * @route Get /api/posts/feed
 * @description Get all the post created in the DB
 * @access private
 */
postRouter.get("/feed", identifyUser, postController.getFeedPostsController)

module.exports = postRouter