const express = require('express');
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const  crypto = require('crypto');
const bcrypt = require('bcrypt');
const router = express.Router();
const bcryptSalt =10;

const {User} = require('../models/user');
const Token= require('../models/token');
const sendEmail = require('../utils/sendEmail');
const  emailService  = require('../utils/sendmail');
const Otp = require('../models/otp');
const checkAuth = require("../middleware/checkAuth");

// const otp = require('../models/otp');





router.post('/' , async(req,res) =>{
    try{
        const {email,password,role,team,type,level} = req.body;

        const useremail = await User.findOne({email});
        if(useremail) return res.status(400).json({msg: "This email already exists."});

        const user = new User({ email , password,role,type,team ,level});
        await user.save();

        let Id = await User.findOne({_id:user._id});
        console.log(Id);
       

        // let token = await Token.findOne({userId : user._id});
        // if(!token){
        //     token = await new Token({
        //         userId: user._id ,
        //         token: crypto.randomBytes(32).toString('hex'),
            
        //     }).save();
        // }
        // console.log(user._id);

        
        // const link = `${process.env.CLIENT_URL}/password-set/${user._id}`;
        const link = `https://localhost:8080/password-set/${user._id}`;
        
        



        await sendEmail(user.email , "password set" , link );


        // const data = {
        //     from: `simakasare@gmail.com`,
        //     to: user.email,
        //     subject: "Your Activation Link for YOUR Email",
        //     text: `Please use the following link to activate your account : ${process.env.CLIENT_URL}/verify-account/${user._id}`,
        //     html: `<p>Please use the following link to activate your account: <strong><a href="${process.env.CLIENT_URL}/verify-account/${user._id}" target="_blank">Email activation and password set</a></strong></p>`,
        // };
        // await emailService.sendMail(data)

        res.send("password set link sent on your mail")

        
        

    }catch(error){
        
        res.send("an error occered")
        console.log(error);


    }
})

router.put('/:Id', async(req,res) =>{
    try{
        const Id = req.params.Id;
        
        const{password} = req.body;
        // const token = await Token.findOne({userId});


        const hash = await bcrypt.hash(password, Number(bcryptSalt));
        // const newpass = await (password);

        await User.updateOne(
            { _id: Id },
            { $set: { password: hash } },
            { new: true }
            );

            // await token.delete();

            

            

    


        
        
        //  const{password} = req.body ;
        // const user = await User.findById(req.params.userId);
        // if(!user) return res.status(400).send("invalid link");

        // // const token = await Token.findOne({userId:user._id});
        // if(!token) return res.status(400).send("Invalid link or expired");
        // user.password = req.body.password ;
        // await user.save();
        // await token.delete();

        // const newpass = await (password);
        // const id = req.params.id;
        // await User.findOneAndUpdate({_id:id},{
        //     password : newpass
        // })
        
        // await User.updateOne( 
        //     { $set: { password: newpass } }),

        // await  User.updateOne({password:newpass});
        // await token.delete();
        res.send("password set sucessfully.");



    }catch(error){
        res.send("An error occured");
        console.log(error);

    }

})





router.post("/login", async (req, res) => {
    const {email , password} = req.body;
    const user = await User.findOne({ email });
    if (user) {
      
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign({_id:user._id , role:user.role} , "dummy data" , { expiresIn : "24 hr"});
        const {_id , email , role} = user ;
        res.json({token , user:{_id ,email , role} });
        // res.status(200).json({ message: "Valid password and your login is successfull" });
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }

    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  });

// router.post('/login' , (req,res,next) =>{
//   User.find({email:req.body.email})
//   .exec()
//   .then(user=>{
//       if(user.length < 1)
//       {
//           return res.status(400).json({
//               msg:'user not exit'
//           })
//       }

//       if(user.role !== role){
//         return res.status(400).json({message:"this role not role"})
//       }
//       bcrypt.compare(req.body.password , user[0].password,(err,result)=>{
//           if(!result){
//               res.status(400).json({
//                   msg:'password not match'
//               })
//           }
//           if(result)
//           {
//               const token = jwt.sign({
//                 email:user[0].email, 
//                 level:user[0].level,
//                 team:user[0].team,
//                 type:user[0].type,
//                 role:user[0].role,
              
                  
//               },
//               'this id dummy text',
//               {expiresIn:"24 hr"}
//               );
//               res.status(200).json({
//                 email:user[0].email, 
//                 level:user[0].level,
//                 team:user[0].team,
//                 type:user[0].type,
//                 role:user[0].role,
//                 token:token
//               })

//           }
//       })

//   })
//   .catch(err =>{
//       res.status(400).json({
//           error:err
//       })
//   })
// })
router.get('/' ,async (req,res,next) =>{
  res.send("all data");

});
//   password forgot
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service : 'Gmail',
  
  auth: {
    user: 'simakasare@gmail.com',
    pass: 'spk@12345',
  }
  
});

router.post('/forgotpassword' , async(req,res,next) =>{
  try{
    const{email} = req.body ;
    const user = User.findOne({email});
    if(!user) throw new Error("Email does not exist");

    let otpcode = Math.floor((Math.random()*10000)+1);
 

    let otpData = new Otp({
      userId: user._id,
      otp:otpcode,
      expireIn:new Date().getTime()+300*1000


    });
    console.log(otpData)

    var mailOptions={
      to: req.body.email,
      subject: "Otp for registration is: ",
      html: "<h3>OTP for reset your password is </h3>"  + "<h1 style='font-weight:bold;'>" + otpcode+"</h1>" // html body
   };

   transporter.sendMail(mailOptions, (error, info) =>{
    if (error) {
      return console.log(error);
  }
  res.send('otp send on your register email for reset password')

   })

    
    


  }
  catch(error){
    return res.send("error occered"),
    console.log(error)
    
  }
})

router.put('/reset/:Id', async( req,res,next) =>{
  try{
    const Id = req.params.Id;
    const{password , otp} = req.body ;
    
  if(req.body.otp==otp){
    // const hash = await bcrypt.hash(password, Number(bcryptSalt));
    // await User.updateOne(
    //   {_id:Id},
    //   {$set:{passwprd:hash}},
    //   {new:true}
    // );
    return res.send("password update")
  }
  else{
    res.render('otp', { msg: 'otp is incorrect' } )
  }
    
    

  }
  catch(error){
    return res.send("error occered"),
    console.log(error)

  }

});


router.post('/resend', async( req,res,next) =>{
  try{

  }catch(error){

  }

})



module.exports = router;