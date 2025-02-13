import e from "express";
const router = e.Router();
import { searchCourse } from "../controllers/searchController.js";

router.get("/search-course", searchCourse);


export { router as searchRouter };