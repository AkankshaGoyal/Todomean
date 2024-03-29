const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    console.log('req.body:::', req.body)
    console.log('req.headers :::', req.headers)
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token,process.env.JWT_KEY);
        console.log("decodedToken", decodedToken)
        req.userData ={email:decodedToken.email,userId: decodedToken.userId}
        next();
    }   
    catch(e)
    {
        res.status(401).json({
            status:{
                message:"Auth Failed!",
                code: 401
            }
        })
    }
    
}