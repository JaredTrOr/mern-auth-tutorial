import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

//MongoDB connection
mongoose.connect(process.env.DBMONGOCONNECTION)
.then(() => console.log('Connected to MongoDB database'))
.catch(err => console.log(err))

//Creation of the express server
const app = express()
app.use(express.json())

app.listen(process.env.PORT, () => console.log('Server listening on port 3000'))

//Routes
app.get('/', (req,res) => res.json({message: 'MERN-AUTH server online'}))
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
