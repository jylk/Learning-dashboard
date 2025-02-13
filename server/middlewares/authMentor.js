import jwt from 'jsonwebtoken';
import { Mentor } from '../models/mentorModel.js';

export const authMentor = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        console.log("Token from cookies:", token);
        if(!token){
          return res.status(401).json({message:'user not autherised'}) 
        }
        
        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("Token verification result:", tokenVerified);
        if(!tokenVerified){
            return res.status(401).json({message:'user not autherised'}) 
        }

        
        if(tokenVerified.role!=='mentor' && tokenVerified.role !== 'admin' ){
            return res.status(401).json({message:'access denied'}) 
        }

        req.user=tokenVerified
        const mentor = await Mentor.findById(tokenVerified.id);
        if (!mentor) {
            return res.status(404).json({ message: 'Mentor not found' });
        }

        req.user = mentor; // Attach mentor details to req.user
        next();
        
        
        
    } catch (error) {
        
        return res.status(401).json({message:'user autherization failed'}) 
    }
}