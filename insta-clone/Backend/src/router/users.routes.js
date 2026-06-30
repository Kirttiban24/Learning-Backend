const express = require("express");
const userController = require("../controllers/user.controller")
const identifyUser = require("../middlewares/auth.middleware")


const userRouter = express.Router();

/** 
 * @route POST /api/users/follow/:username
 * @description Follow a user
 * @access Private
*/
userRouter.post("/follow/:username", identifyUser, userController.followUserController)


/** 
 * @route POST /api/users/unfollow/:username
 * @description Unfollow a user
 * @access Private
*/
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUserController)

/**
 * @route GET /api/users/pending-requests
 * @description Get pending follow requests for the logged-in user
 * @access Private
*/
userRouter.get("/pending-requests", identifyUser, userController.getPendingRequestsController)
 

/**
 * @route POST /api/users/accept-request/:username
 * @description Accept a follow request from a user
 * @access Private
*/
userRouter.post("/accept-request/:username", identifyUser, userController.acceptFollowRequestController)

/**
 * @route POST /api/users/reject-request/:username
 * @description Reject a follow request from a user
 * @access Private
*/
userRouter.post("/reject-request/:username", identifyUser, userController.rejectFollowRequestController)

module.exports = userRouter;