import productModel from "../Models/productModel.js";

const addProduct = async (req,res) => {
    try{
        const product=req.body;
        const result = await productModel.create(product);
        res.status(201).json({message:"Product created successfully",result});
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to add new product"});
    }
};

const updateProduct = async (req,res)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const product = productModel.findByIdAndUpdate(id,data);
        res.status(200).json({message:"Product updated successfully",product});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Failed to update product"})
    }
};

const deleteProduct = async (req,res)=>{
    try{
        const id=req.params.id;
        const result=await productModel.findByIdAndDelete(id);
        res.status(200).status({message:"Product deleted successfully"});
    }catch (err){
        console.log(err);
        res.status(400).json({message:"Failed to delete product"});
    }
};

const showProducts = async (req,res)=>{
    try{
        const {page =1,limit=1,search=""}=req.query;
        const skip=(page-1)*limit;
        const count= await productModel.countDocuments({productName:{$regex:search,$options:"i"}});
        const total=Math.ceil(count/limit);
        const products=await productModel
            .find({productName:{$regex:search,$options:"i"}})
            .skip(skip)
            .limit(limit)
            .sort({updateAt:-1});
        res.status(200).json({products,total});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Failed to fetch products"});
    }
};

const displayProducts = async (req,res) =>{
    try{
        const {page=1, limit=3, search=""}= req.query;
        const skip=(page-1)*limit;
        const count = await productModel.countDocuments({productName:{$regex:search,$options:"i"}});
        const total = Math.ceil(count/limit);
        const products = await productModel.find().skip(skip).limit(limit);
        res.status(200).json({products,total});
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Failed to Display products"});
    }
};

const getProduct = async (req,res)=>{
    try{
        const id= req.params.id;
        const product=productModel.findById({_id:id});
        res.status(200).json(product);
    }catch(err){
        console.log(err);
        res.status(400).json({message:"Failed to get product details"});
    }
};

export { addProduct, updateProduct, deleteProduct, showProducts, displayProducts, getProduct };