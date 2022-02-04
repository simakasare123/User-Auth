const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Member = require('../model/member')

// for jwt
const checkAuth = require('../middleware/check.auth');
// const adminAuth = require('../middleware/admin');
const auth = require('../middleware/cheker');



// to get all data

router.get('/show',auth,(req,res,next)=>{
    Member.find()
    .then(result =>{
        res.status(200).json({
            memberdata:result
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({
            error:err
        })
        
    });
})

// to create data

router.post('/create' , (req,res,next) =>{
    const member = new Member({
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age,
        gender:req.body.gender
    
    })
    member.save()
    .then(response =>{
        console.log(response);
        res.status(200).json({
            newMember : response
        })
    })
    .catch(error =>{
        console.log(error);
        res.status(400).json({
            error:error
        })
    })
})

// get data by id

router.get('/index' , (req,res,next)=>{
    memberID =req.body.memberID
    Member.findById(memberID)
    .then(result =>{
        res.status(200).json({
            message:result
        });

    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({
            error:err
        })    
    });
})

// for delete

router.delete('/delete' , (req,res,next) =>{
    memberID =req.body.memberID
    Member.findByIdAndDelete(memberID)
    .then(result =>{
        res.status(200).json({
            message:'delete'
        });

    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({
            error:err
        })  
    });
    
})

// update data

router.put('/update' , (req,res,next) =>{
    memberID =req.body.memberID

    updateData = {
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age
    }
    Member.findByIdAndUpdate(memberID , {$set:updateData})
    .then(result =>{
        res.json({
            message:result
        })
    })
    .catch(error =>{
        res.json({
            message:'error'
        })
    })

})










module.exports = router;
