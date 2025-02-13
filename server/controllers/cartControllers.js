import { Cart } from "../models/cartModel.js";
import { Course } from "../models/courseModel.js";
import mongoose from "mongoose";

export const getCart = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ userId: user.id }).populate("courses.courseId");

        if (!cart) {
            return res.status(404).json({ message: "cart is empty" });
        }

        res.json({ message: "cart details fetched", data: cart });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

export const getCartItems = async (req, res, next) => {
    try {
        const { user } = req;
        const cart = await Cart.findOne({ userId: user.id }).populate("courses.courseId");

        if (!cart) {
            return res.status(404).json({ message: "cart is empty" });
        }

        res.json({ message: "cart details fetched", data: cart.courses });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};

export const addCourseToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { courseId } = req.body;

        // Find the course to ensure it exists and fetch its price
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Find the user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, courses: [] });
        }

        // Check if the course is already in the cart
        const courseExists = cart.courses.some((item) => item.courseId.equals(courseId));
        if (courseExists) {
            return res.status(400).json({ message: "Course already in cart" });
        }

        // Add the course to the cart
        cart.courses.push({
            courseId,
            price: course.price,
        });

        // Recalculate the total price
        cart.calculateTotalPrice();

        await cart.save();

        res.status(200).json({ message: "added to cart", data: cart });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

// Removing add to cart one product



export const removeCourseFromCart = async (req, res) => {
    try {
        const { userId, courseId } = req.body;
        const _id = courseId

        // Validate userId and _id
        if (!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID or course item ID" });
        }

        // Convert _id to ObjectId
        const objectIdItemId = new mongoose.Types.ObjectId(_id);

        // Fetch the cart directly
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found for the user" });
        }

        // Debugging: Log the _id being searched for
        console.log("Searching for course item _id:", objectIdItemId.toString());

        // Debugging: Log all course items in the cart
        console.log("Courses in cart before removal:", cart.courses.map(course => ({
            _id: course._id.toString(),
            courseId: course.courseId.toString(),
            type: typeof course._id
        })));

        // Filter out the course by _id comparison
        const initialLength = cart.courses.length;
        cart.courses = cart.courses.filter(
            (item) => !item._id.equals(objectIdItemId) // Compare _id instead of courseId
        );

        if (cart.courses.length === initialLength) {
            console.log("Course item not found in the cart during filtering");
            return res.status(404).json({ message: "Course item not found in the cart" });
        }

        // Recalculate the total price
        cart.calculateTotalPrice();
        await cart.save();

        console.log("Cart after removal:", JSON.stringify(cart, null, 2));

        res.status(200).json({ message: "Course removed from cart", data: cart });
    } catch (error) {
        console.error("Error removing course from cart:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};





export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        let cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.courses = [];
        cart.totalPrice = 0;

        await cart.save();

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Error clearing cart:", error);
        res.status(500).json({ message: "Failed to clear cart" });
    }
};