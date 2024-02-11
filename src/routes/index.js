import express from 'express'
import IndexController from '../controller/index.js'
import userRoutes from './user.js'
const router = express.Router()

//home page route
router.get('/',IndexController.homePage)

//other routes
router.use('/user',userRoutes )


export default router