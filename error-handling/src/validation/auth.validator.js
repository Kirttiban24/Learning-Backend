import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    res.status(400).json({
        errors: errors.array()
    })
}


export const registerValidation = [
    body("username").isString().withMessage("username should be string"),
    body("email").isEmail().withMessage("email should be valid email address"),
    body("password").custom((value) => {
        if (value.length < 6 ) {
            throw new Error("password should be at least 6 characters long")
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(value)) {
            throw new Error("password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character")
        }
        return true
    }).withMessage("password should be valid password"),
    validate
]