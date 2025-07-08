import bcrypt, { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Models/userModel.js'; // importing userModel from userModel.js

const SECRET="mySecretKey";

const register = async (req,res)=>{
    try{
        const{name,email,password,role}=req.body;
        const hashedPwd=hashSync(password,10);
        const user={name,email,password:hashedPwd,role};
        const result= await userModel.create(user);
        res.status(201).json(result);
    } catch (err){
        res.status(400).json({message:"Something went wrong", error: err});
    }
};

const login = async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if (!user) {return res.status(404).json({ message: "User not found" });}
        const flag2= bcrypt.compareSync(password,user.password);
        if(flag2){
            const userObj={
                name:user.name,
                email:user.email,
                role:user.role,
            }
            const token=jwt.sign(userObj,SECRET,{expiresIn:'1h'});
            res.status(200).json({message:"Login successfull",user,token});
        }else{res.status(403).json({message:"Invalid credentials"});}
    } catch (err){
        res.status(403).json({message:"Authentication Failed", error:err});
    }
};

const userUpdate = async(req,res)=>{
    try{
        const id=req.params.id;
        const body=req.body;
        const user=await userModel.findByIdAndUpdate(id,body,{new:true});
        // findByIdAndUpdate() returns the updated document if found, otherwise null
        // new:true returns the updated document
        // if user is not found then it returns null
        if(!user){return res.status(404).json({message:"User not found"});}
        res.status(200).json({message:"User updated successfully", user});
    } catch(err){
        res.status(400).json({message:"Something went wrong", error:err});
    }
};

const userDelete = async(req,res)=>{
    try{
        const id=req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        // findByIdAndDelete() returns the deleted document if found, otherwise null
        if(!user){return res.status(404).json({message:"User not found"});}

        res.status(200).json({message:"User deleted successfully"});
    }catch(err){
        res.status(400).json({message:"Somethig went wrong",error:err});
    }
};

const showUsers = async(req,res)=>{
    try{
        const usersList=await userModel.find();
        res.status(200).json(usersList);
    }catch(err){
        res.status(400).json({message:"Something went wrong", error:err});
    }
};

export {register, login, userUpdate, userDelete, showUsers};