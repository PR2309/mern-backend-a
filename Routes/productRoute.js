import express from 'express';
import { addProduct, updateProduct, deleteProduct, showProducts, displayProducts, getProduct } from '../Controllers/productController.js';

const Router=express.Router();

// user
Router.get("/all",displayProducts);

// admin
Router.get("/",showProducts);
Router.post("/",addProduct);
Router.get("/:id",getProduct);
Router.patch("/:id",updateProduct);
Router.delete("/:id",deleteProduct);

export default Router;