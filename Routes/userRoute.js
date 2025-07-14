import express from 'express';
import { googleLogin } from '../Controllers/userController.js';
import {authenticate, authorize} from '../Middlewares/auth.js'; // importing middlewares for authentication and authorization
import {register, login, profile, updateProfile, userUpdate, userDelete, showUsers} from '../Controllers/userController.js'; // importing register function from userController.js

const Router=express.Router();

// Route Paths

// registering
Router.post("/register",register);
Router.post("/google-login",googleLogin);

// login
Router.post("/login",login);

// updating user
Router.patch("/update-user/:id",authenticate,authorize("admin"),userUpdate);

// deleting user
Router.delete("/delete-user/:id",userDelete);

// Admin getting user details
// Router.get("/:id", authenticate, authorize("admin"), profile);

// Fetching all users list
Router.get("/all-users",showUsers);
// Router.get("/all-users",authenticate, authorize("admin"),showUsers);

Router.get("/:id/profile", authenticate, profile);
Router.patch("/:id/profile", authenticate, updateProfile);

export default Router;