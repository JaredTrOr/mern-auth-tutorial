import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

//MongoDB connection
mongoose.connect(process.env.DBMONGOCONNECTION)
.then(() => console.log('Connected to MongoDB database'))
.catch(err => console.log(err))

//Creation of the express server
const app = express()
app.listen(process.env.PORT, () => console.log('Server listening on port 3000'))