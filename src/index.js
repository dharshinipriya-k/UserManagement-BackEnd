// const express = require('express')
import express from "express"
import AppRoutes from './routes/index.js'
// import { MongoClient } from "mongodb"
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

// import userRoutes from './routes/user.js'

const app = express()
const PORT = process.env.PORT 

app.use(express.json()) 

app.use(cors())
app.use('/',AppRoutes)

// app.use('/user',userRoutes)


app.listen(PORT,()=>console.log(`App is listening ${PORT}`))