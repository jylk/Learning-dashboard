import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import { authUser } from "../middlewares/authUser.js";


dotenv.config();

const router = express.Router();
const client_domain = process.env.CLIENT_DOMAIN;

const stripe = new Stripe(process.env.Stripe_Private_Api_Key);

router.post('/create-checkout-session', authUser, async (req, res, next) => {
    try {
        const { products } = req.body;

        const lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.courseId?.title,
                    images: [product?.courseId?.image],
                },
                unit_amount: Math.round(product?.courseId?.price * 100),
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${client_domain}/user/payment/success`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });
        res.json({ success: true, sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        next(error);
    }
});



export { router as paymentRouter };
