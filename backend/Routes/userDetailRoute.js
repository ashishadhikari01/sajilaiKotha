const {userDetail}=require('../models/userDetailModel')
const bcrypt =require('bcrypt')
const express=require('express')
const router=express.Router()

router.get('/signup',async (req,res)=>{
    // res.send('signup is here')
    // console.log(req, res)
    // console.log('hello')
    const userDetails=await userDetail.find()
    res.send(userDetails)
})

router.post('/signup',async (req,res)=>{
    // console.log(res)
    // console.log(res)
    const {firstname, lastname, email, password}=req.body
    const hashedPassword=await bcrypt.hash(password,10)
    console.log(firstname, lastname, email, password)
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
    
      try {
        // Optional: Check if user already exists
        const existingUser = await userDetail.findOne({ email });
        if (existingUser) {
          return res.status(409).json({ error: 'Email already exists' });
        }
    
        const newUser = new userDetail({
          firstname,
          lastname,
          email,
          password:hashedPassword// ⚠️ store hashed passwords in real apps!
        });
    
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: savedUser });
      } catch (err) {
        res.status(500).json({ error: 'Server error: ' + err.message });
      }
    
})

module.exports=router