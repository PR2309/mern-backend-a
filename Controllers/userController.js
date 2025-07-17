import bcrypt, { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Models/userModel.js'; // importing userModel from userModel.js

import { OAuth2Client } from 'google-auth-library';
const client= new OAuth2Client(process.env.GOOGLE_AUTH)

const SECRET="mySecretKey";

const googleLogin = async (req,res) => {
    const {token}=req.body;
    try{
        const ticket=await client.verifyIdToken({
            idToken:token,
            audience:process.env.GOOGLE_AUTH
        });

        const payload= ticket.getPayload();
        const { email, name = "Unknown", sub } = payload;
        if (!email || !sub) {
            return res.status(400).json({ message: "Invalid Google payload" });
        }
        let user=await userModel.findOne({email}); // if already exists
        if(!user){
            user = await userModel.create({name,email,password:sub,role:"user"});
        }

        const userObj={
            id:user._id,
            email:user.email,
            role:user.role
        }
        const jwtToken=jwt.sign(userObj,SECRET,{expiresIn:"1h"});
        res.status(200).json({message:"Google Login Successfull", token:jwtToken, user});
    }catch(err){
        console.log(err);
        res.status(401).json({message:"Google login failed", error:err.message});
    }
};

const profile =async (req,res) => {
    try{
        const id=req.params.id;
        const result=await userModel.findOne({_id:id});
        res.status(200).json(result);
    }catch(err){
        res.status(300).json({message:"Failed to fetch User profile"});
    }
};

const updateProfile = async(req,res) => {
    try{
        const id=req.params.id;
        const {name, email, password } =req.body;
        const hashedPwd = bcrypt.hashSync(password,10);
        const userObj={name,email, password:hashedPwd};
        const result = await userModel.findByIdAndUpdate(id,userObj);
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Failed to update details..."});
    }
};

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
        if (body.password) {body.password = await bcrypt.hash(body.password, 10);}
        const user=await userModel.findByIdAndUpdate(id,body,{new:true});
        // findByIdAndUpdate() returns the updated document if found, otherwise null
        // new:true returns the updated document
        // if user is not found then it returns null
        if(!user){return res.status(404).json({message:"User not found"});}
        res.status(200).json({message:"User updated successfully", user});
    } catch(err){
        console.log(err);
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

const addUser = async (req,res) => {
    try{
        const body = req.body;
        const hashedPwd = bcrypt.hashSync(body.password,10);
        body.password=hashedPwd;
        const result = await userModel.create(body);
        res.status(200).json(result);
    } catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to add new user"});
    }
};

const showUsers = async(req,res)=>{
    try{
        const {page=1,limit=2,search=""}=req.query;
        console.log(page, limit, search);
        const skip = (page-1)*limit;
        const count = await userModel.countDocuments({ name: { $regex: search, $options: "i" } });
        const totalPages = Math.ceil(count / limit); // total pages
        // const usersList=await userModel.find();
        const users = await userModel
            .find({ name: { $regex: search, $options: "i" } })
            .skip(skip)
            .limit(limit)
            .sort({updatedAt:-1});
        console.log({users, totalPages, currentPage:page});
        res.status(200).json({users, totalPages, currentPage:page});
    }catch(err){
        res.status(400).json({message:"Something went wrong", error:err});
    }
};


const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await userModel.findOne({ _id: id });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Something went wrong" });
    }
};

export {register, login, userUpdate, userDelete, showUsers, profile, updateProfile, googleLogin, getUser, addUser};