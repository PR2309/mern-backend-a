import express from 'express';
import { googleLogin } from '../Controllers/userController.js';
import {authenticate, authorize} from '../Middlewares/auth.js'; // importing middlewares for authentication and authorization
import {register, login, profile, updateProfile, userUpdate, userDelete, showUsers, getUser, addUser,} from '../Controllers/userController.js'; // importing register function from userController.js

const Router=express.Router();

// Route Paths

// USER
// registering
Router.post("/register",register);
Router.post("/google-login",googleLogin);

// login
Router.post("/login",login);

// updating user
// Router.patch("/update-user/:id",authenticate,authorize("admin"),userUpdate);
Router.patch("/update-user/:id",userUpdate);

// deleting user
Router.delete("/delete-user/:id",userDelete);

// Fetching all users list
Router.get("/all-users",showUsers);

// Router.post("/", authenticate, authorize("admin"), addUser);
Router.post("/", addUser);

// Admin getting user details
// Router.get("/:id", authenticate, authorize("admin"), getUser);
Router.get("/:id", getUser);

// Router.get("/all-users",authenticate, authorize("admin"),showUsers);

Router.get("/:id/profile", authenticate, profile);
Router.patch("/:id/profile", authenticate, updateProfile);

export default Router;