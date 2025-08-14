const express = require("express");
const { spacedetail } = require("../models/spaceModel");
const multer = require("multer");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleWare");
const { uploadSpace } = require("../middleware/uploadSpaceMiddle");
const { userDetail } = require("../models/userDetailModel");
const { verify } = require("crypto");


router.get('/uploadspace',(req,res)=>{
    res.send('im from photoupload to multer sector ufff')
})


router.post("/uploadspace", verifyToken, uploadSpace, async (req, res) => {
  try {  
    console.log('herum hai tw',req.body)
    console.log('yeha pani herdim',req.files)
    const spaceDetail = JSON.parse(req.body.spaceDetail); 
   
    // console.log('what we got via', files)
     console.log('lets see it',req.user)
    // Check if the space already exists
    const existingSpace = await spacedetail.findOne({
      'spaceDetail.spaceName': spaceDetail.spaceName,
      'spaceDetail.spaceInDetail': spaceDetail.spaceInDetail,
      'spaceDetail.spaceType': spaceDetail.spaceType,
    });
    console.log('aayeuu')

    if (existingSpace) return res.status(409).json({ error: "Space already exists" });
    const photoUrls = req.files.map((file) => `/spaceuploads/${file.filename}`);
   console.log('uta gako url',photoUrls)

    const newSpace = new spacedetail({
      userid: req.user.id,
      spacename: spaceDetail.spaceName,
      spacedetail: spaceDetail.spaceInDetail,
      spacetype: spaceDetail.spaceType,
      amenities: {
        ontapwater: spaceDetail.onTapWater,
        wifi: spaceDetail.wifi,
        balcony: spaceDetail.balcony,
        petfriendly: spaceDetail.petFriendly,
        aircondition: spaceDetail.airCondition,
        parkingtwowheeler: spaceDetail.parkingTwoWheeler,
        parkingfourwheeler: spaceDetail.parkingFourWheeler,
      },
      rent: spaceDetail.spaceRent,
      address: spaceDetail.spaceAddress,
      phonenumber: spaceDetail.spacePhone,
      photos: photoUrls,
      exactPosition:spaceDetail.exactPosition
    });

    await newSpace.save();
    res.json({ message: "Space saved successfully", data: newSpace });
    console.log("New space saved in database");
  } catch (err) {
    console.log("Error during space creation:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/getuploadspace',verifyToken,async(req,res)=>{
  try{
  const user=req.user.id
  const userAssociateSpace=await spacedetail.find({userid:user})
  // console.log(userAssociateSpace)
  res.status(200).json({obtainedSpace:userAssociateSpace})
  // console.log(userAssociateSpace.length)
  }
  catch(err){
    console.log('err on catch',err)
    res.send('server error',err)
  }
})

router.get('/getspecificspace',verifyToken, async(req,res)=>{
  try{
    console.log('lets see',req.query.item)
   const space=await spacedetail.findOne({_id:req.query.item})
  //  console.log(space)
   res.status(200).json({space})
  }
  catch(err){
    console.log('error on updatespecificspace',err)
  }
})

router.put('/updateSpaceDetails',verifyToken, async(req,res)=>{
 try{
  console.log('yeha ne herum',req.user)
  console.log('yeha panii', req.body)
  const {s_id, s_name, s_description, s_rent,s_address,s_phone,s_type,onTapWater, wifi,balcony,petFriendly,airCondition,parkingTwoWheeler, parkingFourWheeler}=req.body
  const space=await spacedetail.findOne({_id:s_id})
  console.log(space)
  if(!space) return res.status(404).send('space not found')

  if(space){
  space.spacename=s_name || space.spacename,
  space.spacedetail=s_description || space.spacedetail,
  space.spacetype=s_type || space.spacetype,
  space.rent=s_rent || space.rent,
  space.address=s_address || space.address,
  space.phonenumber=s_phone || space.phonenumber,
  space.amenities.ontapwater=onTapWater,
  space.amenities.wifi=wifi,
  space.amenities.balcony=balcony,
  space.amenities.petfriendly=petFriendly,
  space.amenities.aircondition=airCondition ,
  space.amenities.parkingtwowheeler=parkingTwoWheeler,
  space.amenities.parkingfourwheeler=parkingFourWheeler 

  await space.save()
  }
 }
 catch(err){
  console.log('error on updateSpaceDetails',err)
  return res.send('server error')
 }
})

router.delete('/deleteSpace', verifyToken, async(req,res)=>{
  
  try{
    console.log('see',req.body)
    const space=await spacedetail.findByIdAndDelete(req.body.spaceId)
    if(!space) return res.status(404).send('space not found')
    return res.send('space deleted')
  }
  catch(err){
    console.log('error on space delete',err)
    res.send('server error on deleting space')
  }
})
// tenant home starts from here

router.get('/allspaces',verifyToken, async (req,res)=>{
  try{
  const allspace=await spacedetail.find({})
  if(!allspace) return res.status(404).send('spaces not found')
   res.status(200).send(allspace)
  }
  catch(err){
   console.log('error on allspace server',err)
  }
})

router.get('/tenantspecificspace',verifyToken, async(req,res)=>{
  try{
  // console.log(req.query)
  // console.log(req.query.space_id)
  const space=await spacedetail.find({_id:req.query.space_id})
  if(!space) res.status(404).send('space not found')
  res.send({space})
console.log(space)
  }
  catch(err){
  console.log('error on tenantSpecificSpace',err)
  res.status(500).send('error on server')
  }
})
module.exports = router;
