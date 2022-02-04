const {User} = require('../models/user');

const AuthAdmin = async(req,res,next)=>{
    try{
        User.findOne({_id:req.user_id})
        .then(user =>{
            if(user.role !== admin) return res.status(400).send("access dennien");
            next()
        })
    }catch(error){
        res.send("an error occered")
        console.log(error);}
    
} 
    
    // try{
    //     let user = await User.findOne({user:req.user.id});
    //     console.log(user);
    //     // const user = await  User.findOne({_id:user._id});
    //     if(user){
    //         if(user.role !== admin)
    //         return res.status(400).json({msg:"admi dennien"});
    //         next()

    //     }
        

        
    // }catch(error){
        
    //     res.send("an error occered")
    //     console.log(error);


    // }



module.exports = AuthAdmin