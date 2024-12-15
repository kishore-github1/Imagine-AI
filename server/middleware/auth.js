import jwt from "jsonwebtoken";
const secret = 'secret';
const authenticateJwt = (req,res,next) =>{
    const authHeader = req.headers.authorization;

    if(authHeader){

        const token = req.headers['authorization']?.split(' ')[1];

        jwt.verify(token,secret,(err,user)=>{
            if(err){
                return res.status(403).json({message: ' Invalid token '});

            }
            req.user = user;
            next();
          })

    }
    else{
        res.status(401).json({message:"Please Login"})
    }
}

export {authenticateJwt,secret};