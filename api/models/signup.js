const mongoose=require('mongoose');
const userSchema= mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    dob:Date,
    gender:{type:String,required:true},
    email:{type:String,
        required:true,
        unique:true,
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    role:{type:mongoose.Schema.Types.ObjectId,ref:'roles',required:true},
    address:String,
    password:{type:String,required:true}
    
});
module.exports=mongoose.model('DemoUser',userSchema);