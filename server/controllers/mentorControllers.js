import bcrypt from 'bcrypt'
import { generateToken } from '../utils/token.js';
import { Mentor } from '../models/mentorModel.js';
import { handleImageUpload } from "../utils/cloudinary.js";
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const mentorSignup = async (req, res, next) => {
    try {
        let imageUrl;
        const { name, email, password, mobile, profilePic } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "all fields required" });
        }
        const isMentorExist = await Mentor.findOne({ email });

        if (isMentorExist) {
            return res.status(400).json({ message: "user already exist" });
        }
        if (req.file) {
            const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
            imageUrl = cloudinaryRes.url;
        
        }

        console.log('====imageUrl',imageUrl, );

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newMentor = new Mentor({ name, email, password: hashedPassword, mobile, profilePic: imageUrl });
        await newMentor.save();

        const token = generateToken(newMentor._id,'mentor');

        res.cookie("token", token ,{
            sameSite:"None",
            secure:true,
            httpOnly:true});

        res.json({ success: true, message: "mentor account created successfully" });
    } catch (error) {
        console.log(error);
    res.status(error.statusCode || 500).json(error.message || 'Internal server error')        
    }
};

//

export const mentorLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const mentorExist = await Mentor.findOne({ email });
        if (!mentorExist) {
            return res.status(404).json({ success: false, message: "Mentor does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, mentorExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: "User not authorized" });
        }

        const token = generateToken(mentorExist._id, "mentor");

        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true
        });

        // ✅ Return mentor details in response
        res.json({
            success: true,
            message: "Mentor login successful",
            user: {
                id: mentorExist._id,
                email: mentorExist.email,
                role: "mentor"
            },
            token
        });

    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json({ success: false, message: error.message || 'Internal server error' });
    }
};



export const mentorProfile = async (req, res, next) => {
    try {

        const {user}=req

        const userData = await Mentor.findById(user.id).select('-password')

        res.json({ success: true, message: "mentor profile fetched", userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const mentorProfileUpdate = async (req, res) => {
    try {
        const userId = req.user.id; // Get authenticated user's ID
        const { name, email, currentPassword, newPassword, profilePic } = req.body;

        const user = await Mentor.findById(userId); // Find mentor by ID

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify current password if provided
        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }
            
            // Hash new password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        // Update user details if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (profilePic) user.profilePic = profilePic; // Store profile picture if sent

        await user.save(); // Save the updated profile

        res.status(200).json({
            message: "Profile updated successfully",
            mentor: {
                id: user._id,
                name: user.name,
                email: user.email,
                profilePic: user.profilePic,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

//

export const mentorLogout = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            sameSite: "None",
            secure: true,
            httpOnly: true
        });

        res.json({ success: true, message: "User logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error');
    }
};


export const mentorDelete = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const deletedUser = await Mentor.findByIdAndDelete(userId);
        if(!deletedUser){
            return res.status(404).json({message:"User not found"});
        }
        res.clearCookie('token', {
            sameSite:"None",
            secure:true,
            httpOnly:true
        }).status(200).json({message:"user deleted Sucessfully"});
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const checkMentor = async (req, res, next) => {
    try {

        res.json({ success: true, message: "mentor autherized" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};
