const express=require('express')
const {userDetail}=require('../models/userDetailModel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const router=express.Router()
require('dotenv').config()


const secretKey=process.env.JWT_SECRET 
// console.log(secretKey)

router.get('/login',(req,res)=>{
  res.send('im from login route')
})
router.post('/login',async (req,res)=>{
//   console.log(req.body)
  const {email, password}=req.body
  
  try{
    const user= await userDetail.findOne({email})
    console.log(user)
    if(!user) return res.status(404).send("user not registered")
    const isMatch= await bcrypt.compare(password,user.password)
    if (isMatch) {
        // ✅ Generate JWT
        const token = jwt.sign(
          { id: user._id, email: user.email }, // payload
          secretKey,
          { expiresIn: '1h' } // optional: token expiry
        )
  
        console.log('Login successful')
        // return res.status(200).json({
        //   message: 'Login successful',
        //   token: token
        // })
        res.cookie('token',token,{
          httpOnly:true,
          secure:false,
          sameSite:'lax',
          maxAge:3600000,
          path:'/' // it ensure that cookie is available across all route in backend.
        })
        return res.status(200).json({message:'login sucessful'})
      } else {
        console.log('Invalid password')
        return res.status(401).send("Invalid credentials")
      }
  }
  catch(err){
   console.log('error:', err.message)
  }
})

router.post('/profile/logout',(req,res)=>{
  res.clearCookie("token",{path:'/'})
 // res.json({message:logged out})
 console.log('logged out')
})

// console.clear()
module.exports=router