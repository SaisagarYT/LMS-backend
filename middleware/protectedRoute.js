const jwt = require('jsonwebtoken');

const protect = (req,res,next) =>{
    try{
        const token = req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(404).json({message:"Authorization required!"});
        }
        jwt.verify(token, process.env.SECRET,(err,decode) =>{
            if(err){
                return res.status(403).json({message:"Invalid token!"})
            }
            req.user = decode;
            next();
        });
    }
    catch(err){
        return res.status(500).json({error:"Internal server error"});
    }
}

module.exports = protect;