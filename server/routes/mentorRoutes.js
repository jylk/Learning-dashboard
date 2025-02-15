import e from "express";
import { checkMentor, mentorDelete, mentorLogin, mentorLogout, mentorProfile, mentorProfileUpdate, mentorSignup } from "../controllers/mentorControllers.js";
import { authMentor } from "../middlewares/authMentor.js";
import { upload } from "../middlewares/multer.js";
const router = e.Router();

router.post("/sign-up", upload.single('profilePic'), mentorSignup);

router.post("/log-in", mentorLogin);

router.get("/profile", authMentor, mentorProfile);

router.put("/profile-update",authMentor, mentorProfileUpdate);

router.delete("/profile-delete", authMentor, mentorDelete);

router.post("/log-out", authMentor, mentorLogout);

router.get("/check-mentor", authMentor, checkMentor);


export { router as mentorRouter };