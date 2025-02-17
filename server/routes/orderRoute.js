import express from "express";
import { authUser } from "../middlewares/authUser.js";
import { Order } from "../models/orderModel.js";

const router = express.Router();

// router.post("/create-order", authUser, async (req, res) => {
//     try {
//         const { courses, totalAmount,userid } = req.body;
//         const userId = userid;
//         console.log("from orders ", courses, totalAmount, userId);


//         const order = new Order({
//             userId,
//             courses,
//             totalAmount,
//             paymentStatus: "Paid", // assuming payment is successful
//         });

//         await order.save();

//         res.status(201).json({ success: true, message: "Order created successfully", order });
//     } catch (error) {
//         console.error("Error creating order:", error);
//         res.status(500).json({ success: false, message: "Failed to create order" });
//     }
// });

router.post("/create-order", authUser, async (req, res) => {
    try {
        const { courses, totalAmount, userid } = req.body;
        const userId = userid;
        console.log("from orders ", courses, totalAmount, userId);

        const order = new Order({
            userId: userid,
            courses: courses.map(course => ({
                courseId: course.courseId,  // Ensure correct ID is stored
                title: course.title,
                price: course.price,
                image: course.image
            })),
            totalAmount,
            paymentStatus: "Paid", // assuming payment is successful
        });

        await order.save();

        res.status(201).json({ success: true, message: "Order created successfully", order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: "Failed to create order" });
    }
});

export { router as orderRouter };
