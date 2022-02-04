const jwt = require('jsonwebtoken');

// use split() here   in console to  remove space betwean token nd bearer
module.exports =(req,res,next)=>{
    try{
        const token =req.headers.authorization.split(" ")[1];
        console.log(token);
        //  'dummy data' is a key ...used in Auth.js file at login time
        const verify = jwt.verify(token , 'dummy data');
        console.log(verify);
        
        next();


    }
    catch(error)
    {
        res.status(400).json({
            msg:'invalid token'
        })
    }
}

