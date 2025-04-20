const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    profilePic:{type:String,default:""}
 })
 
 const userDetail=mongoose.model('userDetail', userSchema)

 

exports.userDetail=userDetail




