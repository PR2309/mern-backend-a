import express from "express";
import { authenticate, authorize } from "../Middlewares/auth.js";
import { newOrder, showOrders, showAllOrders, updateOrder} from "../Controllers/orderController.js";
const Router = express.Router();

Router.post("/", newOrder);
Router.get("/", authenticate, authorize("admin"), showAllOrders);
Router.patch("/:id", updateOrder);
Router.get("/:id", showOrders);

export default Router;