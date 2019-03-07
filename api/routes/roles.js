const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

const Roles=require('../models/roles');
router.get('/',(req,res,next)=>{
    // res.status(200).json({
    //     message:'Handling GET reqquest to /products'
    // });
    Roles.find()
    .select()
    .exec()
    .then(docs=>{
        res.status(200).json({
            data:docs
        })
    })
    .catch(err=>{
        console.log(err);
        res.json({
            status:500,
            error:err
        });
    });
});
router.post('/',(req,res,next)=>{
    // const product={
    //     name:req.body.name,
    //     price:req.body.price
    // };
    const role=new Roles({
        _id:new mongoose.Types.ObjectId,
        role:req.body.role
    });
    role.save().then(result=>{
        console.log(result); 
        res.status(201).json({
            message:'Data saved at database'
        });
    }).catch(err=>{
        console.log(err);
        res.json({
            status:500,
            error:err
        });
    });
    
});

module.exports=router;