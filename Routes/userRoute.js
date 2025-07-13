import express from 'express';
import {authenticate, authorize} from '../Middlewares/auth.js'; // importing middlewares for authentication and authorization
import {register, login, userUpdate, userDelete, showUsers} from '../Controllers/userController.js'; // importing register function from userController.js

const Router=express.Router();

// Route Paths

// registering
Router.post("/register",register);

// updating user
Router.patch("/update-user/:id",authenticate,authorize("admin"),userUpdate);

// deleting user
Router.delete("/delete-user/:id",userDelete);

// Fetching all users list
Router.get("/all-users",authenticate, authorize("admin"),showUsers);

// login
Router.post("/login",login);

export default Router;