const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const identifyUser = require("../middlewares/auth.middleware")

/** Auth Routes 
 * POST/api/auth/register
*/
authRouter.post("/register", authController.registerController)

/** Auth Routes 
 * POST/api/auth/login
*/
authRouter.post("/login", authController.loginController)


/** Auth Routes 
 * @route GET/api/auth/get-me
 * @desc Get the currently logged-in user
 * @access Private
*/
authRouter.get("/get-me",identifyUser, authController.getMeController)



module.exports = authRouter