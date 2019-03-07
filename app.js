const express=require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const url='mongodb://admin:admin123@ds041546.mlab.com:41546/demo';

 const signupRoutes=require('./api/routes/signup');
 const roleRoutes=require('./api/routes/roles')
  const signinRoutes=require('./api/routes/signin');
 

 mongoose.connect(url,{useNewUrlParser:true});
  app.use(morgan('dev'));
 app.use(bodyParser.urlencoded({extended:false}));
 app.use(bodyParser.json());



 app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-request-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-request-Headers', 'X-Requested-With,content-type,Authorization');

    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


 app.use('/',signinRoutes);
  app.use('/signup',signupRoutes);
  app.use('/roles',roleRoutes)


app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message   
        } 
    }) 
});

module.exports=app;  