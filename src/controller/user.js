import{findIndex} from '../common/helper.js'
import userModel from '../models/user.js'
import mongodb,{MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

const user = []
const client = new MongoClient(process.env.DB_URL)

const getAllUserData = async (req,res)=>{
    
    try {

        let user = await userModel.find()
        res.status(200).send({
            message:"Data fetch successful",user
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
   
}

const getUserById = async (req,res)=>{

    
    try {
            
            let user = await userModel.findOne({_id:req.params.id})
            res.status(200).send({
                message:"Data fetch successful",user
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
    
}

const addUser = async (req,res)=>{
    
        try {
            
            //check if email exists in db
            const user = await userModel.findOne({email:req.body.email})

            if(!user){
                //if email not found create user
                let newUser = await userModel.create(req.body)
                res.status(200).send({
                    message:"User added successfully!"
                })
            }
            else{
                //if email is found respond error message
                res.status(400).send({
                    message: `User with ${req.body.email} already exists`
                })
            }

            
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message:"Internal server error",
                error: error.message
            })
        }
        
}

const EditUserById = async (req,res)=>{
    
    try {
            
            let user = await userModel.findById({_id:req.params.id})

            if(user){
                
                user.name = req.body.name
                user.email = req.body.email
                user.password  = req.body.password
                user.status = req.body.status
                user.role = req.body.role

                await user.save()

                // await userModel.updateOne({_id:req.params.id},{$set:req.body})

                // !!! UPDATE will not do validation !!!
            }
            else{
                res.status(400).send({
                    message:"Invalid user id"
                })
            }
            res.status(200).send({
                message:"User edited sucessfully"
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server error",
            error: error.message
        })
    }
    
}
const deleteUserById = async (req,res)=>{
    
    try {
            
            let user = await userModel.findById({_id:req.params.id})

            if(user){
                await userModel.deleteOne({_id: req.params.id})
            }
            else{
                res.status(400).send({
                    message:"Invalid user id"
                })
            }
            res.status(200).send({
                message:"User deleted sucessfully"
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server error"
        })
    }
    
}

export default{
    getAllUserData,
    getUserById,
    addUser,
    EditUserById,
    deleteUserById
}