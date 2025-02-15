import e from "express";
import { adminLogin, adminLogout, adminProfile, checkAdmin, adminallusers, adminallorders, adminallmentros, adminallCourse, adminUpdate } from "../controllers/adminController.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { Mentor } from "../models/mentorModel.js";
import { User } from "../models/userModel.js";


const router = e.Router();

router.post("/log-in", adminLogin);

router.get("/profile", authAdmin, adminProfile);

//router.put("/profile-update", mentorProfile);

//router.delete("/profile-delete", (req, res, next) => {});

router.post("/log-out", authAdmin, adminLogout);

router.get("/check-admin", authAdmin, checkAdmin);
router.get('/allusers', adminallusers)
router.get('/adminallorders', adminallorders)
router.get('/adminallmentros', adminallmentros)
router.get('/adminallCourse', adminallCourse)
router.put('/adminUpdate',adminUpdate)

router.delete('/deletementor/:mentorId', async (req, res) => {
    try {
        const { mentorId } = req.params;
        const deletedMentor = await Mentor.findByIdAndDelete(mentorId);
        if (!deletedMentor) {
            return res.status(404).json({ message: "Mentor not found" });
        }
        res.status(200).json({ message: "Mentor deleted successfully" });
    } catch (error) {
        console.error("Error deleting mentor:", error);
        res.status(500).json({ message: "Failed to delete mentor" });
    }
});

// Delete user route
router.delete('/deleteuser/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user" });
    }
});






export { router as adminRouter };