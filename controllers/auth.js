import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import users from '../models/auth.js'

export const signup = async(req,res) => {
    const { name, email,password } = req.body;
    try{
        const existinguser = await users.findOne({email})
        if(existinguser){
            return res.status(404).json({message:"User already exist"});
        }

        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = await users.create({ name, email, hashedPassword})
        const token = jwt.sign({email: newUser.email,id: newUser._id}, "test", {expiresIn:"1h"})
        res.status(200).json({message: newUser, token})
    }
    catch(error){
        res.status(500).json({message:"Something went wrong..."})
    }
} 

export const login = async(req,res) => {
    const { email,password } = req.body;
    try{
        const existinguser = await users.findOne({email})
        if(!existinguser){
            return res.status(404).json({message:"user do not exist"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, existinguser.password)
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({email: newUser.email,id: newUser._id}, "test", {expiresIn:"1h"})
        res.status(200).json({message: newUser, token})
        
    }catch(error){
        res.status(500).json({message:"Something went wrong..."})

    }

} 