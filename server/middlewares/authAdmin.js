import jwt from 'jsonwebtoken'

export const authAdmin = (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
          return res.status(401).json({message:'user not autherised'}) 
        }
        
        const tokenVerified = jwt.verify(token,process.env.JWT_SECRET_KEY);
        console.log("Token verification result:", tokenVerified);
        if(!tokenVerified){
            return res.status(401).json({message:'user not autherised'}) 
        }      
        
                
        
        if(tokenVerified.role !== 'admin' ){
            return res.status(401).json({message:'access denied'}) 
        }

        req.user=tokenVerified
        
        next()
        
    } catch (error) {
        
        return res.status(401).json({message:'user autherization failed'}) 
    }
}