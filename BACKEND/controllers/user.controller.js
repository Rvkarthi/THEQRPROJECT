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
export const login = async (req, res) => {
    try {
        const body = req.body;
        const details = await users.findOne({ "username": body.username });
        if (!details) {
            return res.status(400).json({ message: "username invalid", success: false });
        }

        const isMatch = await bcrypt.compare(body.password, details.password);
        if (!isMatch) {
            return res.status(200).json({ message: "password invalid", success: false });
        }

        return res.status(200).json({ data: details,message: "password invalid", success: true });

    } catch (error) {
        return res.status(400).json({ error: error.message, message: "not found" });
    }
};



export const createUser = async (req,res)=> {
    try {
        const body = req.body;
        const existingUser = await users.findOne({ username:   body.username });
        if (existingUser) {
            return res.status(400).json({ message: "username already exists", success: false });
        }
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