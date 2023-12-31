import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'

export class AuthController {
    
    static async signup(req,res, next) {
        const {username, email, password} = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)
        const newUser = new User({username, email, password: hashedPassword})

        try {
            await newUser.save()
            res.status(201).json({success: true, message: 'User created succesfully'})
        }
        catch(err) {
            next(err)
        }
    }
}