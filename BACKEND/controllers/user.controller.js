import { users } from "../models/user.model.js"
import bcrypt from "bcrypt"

export const getAllUser = async (req, res) => {
    try {
        const data = await  users.find()
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json({"error": error})
    }
    
} 

export const getUserByName = async (req, res)=>{

    try {
        const name = req.params.name;
        const details = await users.findOne({"username": name})
        res.status(200).json({instagramId: details.instagramId,email: details.email})

    } catch (error) {
        res.status(400).json({"error": error})
    }

}

export const login = async (req, res)=>{

    try {
        const body = req.body;
        const details = await users.findOne({"username": body.username})
        if(!details){
            res.status(400).json({"data": "username invalid", success: false}) 
        }
        const isMatch = bcrypt.compare(body.password, details.password)
        if(!isMatch){
            res.status(200).json({data: "password invalid", success: false})
        }
        else{
            res.status(200).json({data: details, success: true})
        }

    } catch (error) {
        res.status(400).json({"error": error, "message": "not found"})
    }

}

export const createUser = async (req,res)=> {
    try {
        const body = req.body;
        const newUser = await users.create(body)
        res.status(201).json({message: "new user created", "body" : newUser, success: true})
    } catch (error) {
        res.status(400).json({"error": error, success: false})
    }
}

export const deleteUser = (req, res)=>{
    const id = req.params.id
    res.status(200).json({message: `i will delete ${id} user`})
}