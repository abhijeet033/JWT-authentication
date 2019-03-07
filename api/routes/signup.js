const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
 

const DemoUser=require('../models/signup');
const Roles=require('../models/roles')

router.post('/',(req,res,next)=>{
    // const role=req.body.role;
    //console.log('this is role', req.body.role);
    Roles.findById(req.body.role)
    .then(role => {
        // console.log('this is inside role', role);
      
        if(!role){
                 return res.status(500).json({
                message:"role not exist"
            });
        }
        DemoUser.find({email:req.body.email})
        .exec()
        .then(user=>{
            console.log(user)
            if(user.length>0){
            return res.status(409).json({
                message:'User with this email aready exists'
            });
            }else{
                bcrypt.hash(req.body.password,10,(err,hash)=>{
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const demouser=new DemoUser({
                            _id:new mongoose.Types.ObjectId,
                            fname:req.body.fname,
                            lname:req.body.lname,
                            dob:req.body.dob,
                            gender:req.body.gender,
                            email:req.body.email,
                            mobile:req.body.mobile,
                            role:req.body.role,
                            address:req.body.address,
                            password:hash
                        });
                        demouser.save()
                        .then(result=>{
                            console.log(result);
                            res.status(201).json({
                                message:'User created'
                            });
                        })
                        .catch(err=>{
                            console.log(err);
                            res.status(500).json({
                                error:err
                            })
                        });
                    }
                })
                    
            }
        });
    })
 
});
module.exports=router;