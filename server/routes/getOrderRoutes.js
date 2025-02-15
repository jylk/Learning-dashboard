import express from "express";
import { Order } from "../models/orderModel.js";

const router = express.Router();

router.get("/get-orders", async (req, res) => {
    try {
        const userId = req.query.userid;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Fetch orders for the specified user
        const orders = await Order.find({ userId }).populate("courses.courseId");

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found for this user" });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ success: false, message: "Failed to fetch orders" });
    }
});

export { router as picOrderRouter };
