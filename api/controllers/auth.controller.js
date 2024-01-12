import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

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

    static async signin(req, res, next) {
        const { email, password } = req.body
        
        try {
            //Sign in validation
            const validUser = await User.findOne({ email })
            if (!validUser) return next(errorHandler(404, 'User not found'))
            const validPassword = bcryptjs.compareSync(password, validUser.password)
            if (!validPassword) return next(errorHandler(401, 'Wrong credentials'))

            //Creation of the web token
            const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET)
            const {password: hashedPassword, ...rest} = validUser._doc
            
            const expireDate = new Date(Date.now() + 36000000) //1 hour

            res.cookie('access_token', token, {httpOnly: true, expires: expireDate}).status(200).json(rest)
        }catch (err) {
            next(err)
        }
    }
}