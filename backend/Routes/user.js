const express = require('express');
const multer=require('multer')
const router = express.Router();
const verifyToken = require('../middleware/authMiddleWare');
const { userDetail } = require('../models/userDetailModel');
const bcrypt=require('bcrypt');
const { use } = require('react');

// router.get('/profile/auth/verify',verifyToken, (req,res)=>{
//   if(req.user) {
//     console.log('checkkkk: true')
//      return res.json({authenticated:true})
//   }
//   return res.json({authenticated:false})
// })

router.get('/profile', verifyToken, async (req, res) => {
  // res.send('uff')
  try {
    const user = await userDetail.findById(req.user.id).select('-password'); // Don't send password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/profile/update',verifyToken, async(req,res)=>{
  console.log(req.body)
  try{
  const {firstName, lastName}=req.body
  const user =await userDetail.findById(req.user.id)
  if(!user) return res.status(404).send("user not found")
  user.firstname=firstName || user.firstname
  user.lastname=lastName || user.lastname

  await user.save()
  res.status(200).send("user updated sucessfully")
}
catch(err){
  console.log(err.message)
  res.status(500).send("server error")
}
})

router.put('/profile/updatepassword', verifyToken, async(req,res)=>{
  console.log('lets what we get on password:',req.body)
  try{
     const {oldPassword, newPassword}=req.body
     const user=await userDetail.findById(req.user.id)
     if(!user) return res.status(404).send('user not found')
     const newHashedPassword=await bcrypt.hash(newPassword,10)
     const isMatch= await bcrypt.compare(oldPassword,user.password)
     if(!isMatch) return res.status(409).send("Old password is invalid")
    if(isMatch){
      user.password=newHashedPassword || user.password
      await user.save()
      console.log('password updated sucessfully')
      return res.send('password Updated')
    }
  }
  catch(err){
    console.log(err.message)
    return res.status(500).send('server error')
  }
})

router.delete('/profile/delete', verifyToken,async (req,res)=>{
  console.log('deletion data what obtained:',req.body)
  try{
  const {email, password}=req.body
  const user= await userDetail.findById(req.user.id)
  console.log(user)
  if(!user) return res.status(404).send('user not found')
  const isMatchEmail=user.email===email
  const isMatchPassword=await bcrypt.compare(password,user.password)
  if(!isMatchEmail || !isMatchPassword){
    return res.status(403).send('credentials mis-matched!')
  }
  await user.deleteOne()
  return res.status(200).send("Account deleted!")
}
catch(err){
  console.log('error on deleting account',err.message)
  return res.send('Server error:Deletion Failed')
}
})

// const storage = multer.diskStorage({
//   destination: './uploads/',  // Folder where files will be stored
//   filename: (req, file, cb) => {
//       cb(null, Date.now() + '-' + file.originalname); // Unique filename
//   }
// });

const storage=multer.diskStorage({
  destination:'./uploads',
  filename:(req,file,cb)=>{
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

router.post('/profile/updateProfilePic',verifyToken,upload.single('profilePic'),async(req,res)=>{
  // console.log(req.user.id, req.body)
  try{
    const userId=req.user.id
    const imageUrl=`/uploads/${req.file.filename}`
    const user=await userDetail.findById(userId)
    // console.log(user)
    if(!user) return res.send('user not found')
    const existingUser = user.profilePic
    if (existingUser===imageUrl) {
      console.log('image already uploaded')
        return res.send("this image already been uploaded!");
    }
    user.profilePic=imageUrl
    await user.save()
    console.log('uff:profile uploaded')
   res.send('profile uploaded')
  }
  catch(err){
 console.log('error on catch', err)
  }
})

router.get('/profile/pic',verifyToken,async(req,res)=>{
  try{
  const user=await userDetail.findById(req.user.id)
  if(!user) return res.send("user not found")
  return res.status(200).json({
    userProfile:`http://localhost:5000${user.profilePic}`,
    message:'profile picture fetched'
})
  }
  catch(err){
    console.log('error on getting profile picture',err)
    res.send('server error',err)
  }
})

router.post('/profile/logout',(req,res)=>{
  try{
//    res.clearCookie("token",{
//     httpOnly:true,
//     secure:false,
//     sameSite:'lax',
//     path:'/login',
//     maxAge:Date.now()
//   })
res.cookie('token', '', {
  httpOnly: true,
  secure: false,
  sameSite: 'lax',
  expires: new Date(0), // old date then cookie created cuzs cookie to expire.
  path: '/',
  
});
return res.send('yayy')
}
catch(err){
  console.log('error on cookies clear:',err)
}
})

module.exports = router;
