import e from "express";
import { authUser } from "../middlewares/authUser.js";
import { addReview, getCourseReviews, getAverageRating, deleteReview } from "../controllers/reviewControllers.js";

const router = e.Router();

router.put("/add-review",authUser,addReview);
router.get("/get-course-review", authUser, getCourseReviews);
router.get("/get-average-rating", authUser, getAverageRating);
router.delete("/remove-review",authUser, deleteReview);

export { router as reviewRouter };