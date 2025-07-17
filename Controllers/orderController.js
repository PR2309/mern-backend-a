import orderModel  from "../Models/orderModel.js";

const newOrder = async (req,res) =>{
    try{
        const body=req.body;
        const result= await orderModel.create(body);
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to place order"});
    }
};

const showOrders = async (req,res)=>{
    try{
        const id=req.params;
        const result=await orderModel.find({email:id});
        res.status(200).json(result);
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Failed to fetch order details"});
    }
};

const showAllOrders = async (req,res)=>{
    try{
        const {page=1, limit=5, status=""} = req.query;
        const skip=(page-1)*limit;
        const count=await orderModel.countDocuments({status:{$regex:status}});
        const total=Math.ceil(count/limit);
        const result = await orderModel
            .find({status:{$regex:status}})
            .skipe(skip)
            .limit(limit);
        res.status(200).json({result,total})
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to fetch orders"})
    }
};

const updateOrder = async (req,res) =>{
    try {
        const id = req.params.id;
        const { status } = req.body;
        const result = await orderModel.updateOne({ _id: id },{ $set: { status }});
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { newOrder, showOrders, showAllOrders, updateOrder };