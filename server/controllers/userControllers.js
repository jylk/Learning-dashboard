import bcrypt from 'bcrypt'
import { User } from "../models/userModel.js";
import { generateToken } from '../utils/token.js';
import { handleImageUpload } from "../utils/cloudinary.js";
import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const userSignup = async (req, res, next) => {
    try {
        let imageUrl = "";
        const { name, email, password, mobile } = req.body;
        console.log("body------------", req.body);

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (req.file) {
            const cloudinaryRes = await cloudinaryInstance.uploader.upload(req.file.path);
            imageUrl = cloudinaryRes.url;
        }

        console.log("==== imageUrl ====", imageUrl);

        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
            profilePic: imageUrl,
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        res.json({ success: true, message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};


// export const userLogin = async (req, res, next) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ message: "all fields are required" });
//         }

//         const userExist = await User.findOne({ email });
//         if (!userExist) {
//             return res.status(404).json({ success: false, message: "user does not exist" });
//         }

//         const passwordMatch = bcrypt.compareSync(password, userExist.password);
//         if (!passwordMatch) {
//             return res.status(401).json({ message: "user not autherized" });
//         }

//         const token = generateToken(userExist._id);

//         res.cookie("token", token , {
//             sameSite:"None",
//             secure:true,
//             httpOnly:true});

//         res.json({ success: true, message: "user login successfull" });
//     } catch (error) {
//         console.log(error);
//         res.status(error.statusCode || 500).json(error.message || 'Internal server error')
//     }
// };


export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(404).json({ success: false, message: "User does not exist" });
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "User not authorized" });
        }

        const token = generateToken(userExist._id);

        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true
        });

        // ✅ Return user details in response
        res.json({
            success: true,
            message: "User login successful",
            user: {
                id: userExist._id,
                name: userExist.name,
                email: userExist.email
            }
        });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || "Internal server error");
    }
};


export const userProfile = async (req, res, next) => {
    try {

        const { user } = req

        const userData = await User.findById(user.id).select('-password')

        res.json({ success: true, message: "user profile fetched", data: userData });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const userProfileUpdate = async (req, res, next) => {
    try {
        const userId = req.user.id; // Get the user ID from the authenticated user
        const { name, email, mobile, currentPassword, newPassword } = req.body; // Get updated fields

        const user = await User.findById(userId); // Find user by ID

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update user fields conditionally
        if (name) user.name = name;
        if (email) user.email = email;
        if (mobile) user.mobile = mobile;

        // If the password is being updated, check the current password first
        if (newPassword) {
            if (!currentPassword) {
                return res.status(400).send('Current password is required to update the password');
            }

            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return res.status(400).send('Current password is incorrect');
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }

        // Save the updated user data
        await user.save();

        res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};


export const userLogout = async (req, res, next) => {
    try {

        res.clearCookie('token', {
            sameSite: "None",
            secure: true,
            httpOnly: true
        });

        res.json({ success: true, message: "user logged out" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const userDelete = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.clearCookie('token', {
            sameSite: "None",
            secure: true,
            httpOnly: true
        }).status(200).json({ message: "user deleted Sucessfully" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};

export const checkUser = async (req, res, next) => {
    try {

        res.json({ success: true, message: "autherized user" });
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(error.message || 'Internal server error')
    }
};