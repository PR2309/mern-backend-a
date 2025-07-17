import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    productName:{type:String},
    description: {type:String},
    price:{type:Number},
    imgUrl:{type:String}
},{timestanps:true});

export default mongoose.model("Product",productSchema);