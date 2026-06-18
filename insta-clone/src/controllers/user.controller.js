const followModel = require("../models/follow.model")



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

    

}

module.exports = {
    followUserController
}