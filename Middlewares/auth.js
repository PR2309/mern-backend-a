import jwt from 'jsonwebtoken';

const SECRET="mySecretKey";

// middlewares
const authenticate= (req,res,next)=>{
    try{
        const token=req.headers.authorization;
        const auth=jwt.verify(token.split(" ")[1],SECRET);
        if(auth){
            // res.status(200).json({message:"Authentic User"});
            req.user=auth; // storing data of authentic user
            next();
        }else{
            return res.status(403).json({message:"Unauthentic user or Token expired"});
        }
    }catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
};

const authorize = (role)=>{
    return (req,res,next)=>{
        if(req.user && req.user.role===role){
            // res.status(200).json({message:"Authorized User"});
            next();
        }else{
            return res.status(403).json({message:"Unauthorized, access denied"});
        }
    }
}

export { authenticate, authorize };