const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController (req, res) {

    const followerUsername = req.user.username
    const followingUsername = req.params.username

    if(followingUsername == followerUsername) {
        return res.status(400).json({
            message: "You can not follow yourself"
        })
    }

    const isFollowingUserExists = await userModel.findOne({
        username: followingUsername
    })

    if(!isFollowingUserExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        following: followingUsername,
        follower: followerUsername
    })

    if(isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are already following ${followingUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        following: followingUsername
    })

    res.status(201).json({
        message: `You are now following ${followingUsername}`,
        follow: followRecord
    })
}

async function unfollowUserController (req, res) {

    const followerUsername = req.user.username
    const followingUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        following: followingUsername
    })

    if(!isUserFollowing) {
        return res.status(400).json ({
            message: `You are not following ${followingUsername}`
        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followingUsername}`
    })
}


async function getPendingRequestsController (req,res) {
    const username = req.user.username

    const pendingRequests = await followModel.find({
        following: username,
        status: "pending"
    })

    if(!pendingRequests) {
        return res.status(404).json({
            message: "No pending requests found"
        })
    }

    res.status(200).json({
        message: "Pending requests retrieved successfully",
        pendingRequests: pendingRequests
    })
}

async function acceptFollowRequestController (req, res) {
    const username = req.user.username
    const followerUsername = req.params.username

    const followRequest = await followModel.findOne({
        following: username,
        follower: followerUsername,
        status: "pending"
    })

    if(!followRequest) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    followRequest.status = "accepted"
    await followRequest.save()

    res.status(200).json({
        message: "Follow request accepted successfully"
    })
}

async function rejectFollowRequestController (req, res) {
    const username = req.user.username
    const followerUsername = req.params.username

    const followRequest = await followModel.findOne({
        following: username,
        follower: followerUsername,
        status: "pending"
    })

    if(!followRequest) {
        return res.status(404).json({
            message: "Follow request not found"
        })
    }

    await followModel.findByIdAndDelete(followRequest._id)

    res.status(200).json({
        message: "Follow request rejected successfully"
    })
}

module.exports = {
    followUserController,
    unfollowUserController,
    getPendingRequestsController,
    acceptFollowRequestController,
    rejectFollowRequestController
}