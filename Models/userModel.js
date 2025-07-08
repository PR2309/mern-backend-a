import mongoose from 'mongoose';

// models > userModel
const userSchema=mongoose.Schema({ // defining Structure 
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    role:{type:String}
},{timestamps:true}); // save creation and updation date & time

// const userModel=mongoose.model("User",userSchema); // name of collection in lowercase with s at end User -> users,
export default mongoose.model("User",userSchema); // name of collection in lowercase with s at end User -> users,
