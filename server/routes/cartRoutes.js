import e from "express";
import { authUser } from "../middlewares/authUser.js";
import { addCourseToCart, clearCart, getCart, getCartItems, removeCourseFromCart } from "../controllers/cartControllers.js";
const router = e.Router();

router.post("/add-to-cart",authUser,addCourseToCart);
router.get("/get-cart", authUser, getCart);
router.get("/get-cartItems", authUser, getCartItems);
router.delete("/remove-course",authUser, removeCourseFromCart);
router.post("/clear-cart", authUser, clearCart);

export { router as cartRouter };