const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const checkAuth=require('../middleware/check-auth');
const DemoUser=require('../models/signup');
const Roles=require('../models/roles');


router.get('/getdata',checkAuth,(req,res,next)=>{
   const id=req.userdata.userId;
//    console.log(id);
   const role=req.userdata.role;
//     
   DemoUser.findById(id)
   .then(docs=>{
       res.status(200).json({
           user_id:id,
            fname:docs.fname,
            lname:docs.lname,
            dob:docs.dob,
            gender:docs.gender,
            email:docs.email,
            mobile:docs.mobile,
            role:role,
            role_id:docs.role,
            address:docs.address
       })
   })
   .catch(err=>{
       res.status(500).json({
           error:err
       });
   });
});
router.post('/signin',(req,res,next)=>{
    
    DemoUser.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:'Authentication failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Authentication failed'
                });
            }
            var role=user[0].role;
            Roles.findById(role)
            .then(doc=>{
                const role_=doc.role;
                if(result){
                    const token= jwt.sign({
                       email:user[0].email,
                       role:role_,
                       userId:user[0]._id,
                   }
                   ,'secret'
                   ,{
                       expiresIn:'1h'
                   });
                   return res.status(200).json({
                       message:'Authentication Successful',
                       token:token
                   });
               }
               return res.status(401).json({
                   message:'Authentication failed'
               });
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
            });
            
        });
    })
    
});
 
module.exports=router;