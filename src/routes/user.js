import express from 'express'
import userController from '../controller/user.js'
// import user from '../controller/user.js'


const router = express.Router()

router.get('/',userController.getAllUserData)
router.get('/:id',userController.getUserById)
router.post('/',userController.addUser)
router.put('/:id',userController.EditUserById)
router.delete('/:id',userController.deleteUserById)

export default router