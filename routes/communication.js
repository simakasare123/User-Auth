const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  Communication = require('../models/communication')


// for jwt
// const checkAuth = require('../middleware/check.auth');
// const adminAuth = require('../middleware/admin');
// const auth = require('../middleware/cheker');



// to get all data

router.get('/show',(req,res,next)=>{
    Communication.find()
    .then(result =>{
        res.status(200).json({
            communicationdata:result
        })

    })
    .catch(err =>{
        console.log(err);
        res.status(400).json({
            error:err

        });
    });
    
    
})

// to create data

router.post('/create' , (req,res,next) =>{
    const communication = new Communication({
        communicationId:req.body.communicationId,
        communicationType:req.body. communicationType,
        dateAndTime:req.body. dateAndTime,
        visibleTo:req.body.visibleTo,
        url:req.body.url,
        description:req.body.description,
        title:req.body.title,
        attachmentUrl:req.body.attachmentUrl




    })
    communication.save()
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
    communicationId =req.body.communicationId
    Communication.findById(communicationId)
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

// for delete

router.delete('/delete' , (req,res,next) =>{
    communicationId= req.body.communicationId
    Communication.findByIdAndDelete(communicationId)

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
    communicationId = req.body.communicationId
    updateData ={
        communicationType: req.body.communicationType,
        url : req.body.url,
        title: req.body.title,
        dateAndTime:req.body. dateAndTime,
        visibleTo:req.body.visibleTo,
        attachmentUrl:req.body.attachmentUrl

    }
    Communication.findByIdAndUpdate(communicationId, {$set:updateData})
   
    .then(result =>{
        res.json({
            message:result
        })
    })
    .catch(error =>{
        res.json({
            message:'error'
        }),
        console.log(error);
    })

})


















module.exports = router;
