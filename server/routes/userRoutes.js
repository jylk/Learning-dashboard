import e from "express";
const router = e.Router();
import { checkUser, userLogin, userProfile, userLogout, userSignup, userDelete, userProfileUpdate } from "../controllers/userControllers.js";
import { authUser } from "../middlewares/authUser.js";
import { upload } from "../middlewares/multer.js";

router.post("/sign-up", upload.single('profilePic'), userSignup);
router.post("/log-in", userLogin);
router.get("/profile", authUser, userProfile);
router.put("/profile-update", authUser, userProfileUpdate);
router.delete("/profile-delete", authUser, userDelete);
router.post("/log-out", authUser, userLogout);
router.get("/check-user", authUser, checkUser);



export { router as userRouter };