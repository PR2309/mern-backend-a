import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    email: {type:String, required:true},
    items: [
        {
            productName: String,
            qty: Number,
            price: Number,
            _id:String
        },
    ],
    status:{
        type:String,
        enum: ["Pending", "Shipped", "Delivered"],
        default:"Pending"
    },
    createdAt: {
        type: Date,
        default:Date.now(),
    },
});

export default mongoose.model("Order",orderSchema);