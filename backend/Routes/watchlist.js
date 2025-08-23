const {TenantWatchlist}=require('../models/watchlistModel')
const verifyToken=require('../middleware/authMiddleWare')
const express=require('express')
const { userDetail } = require('../models/userDetailModel')
const router=express.Router()

router.get('/watchlist',(req,res)=>{
    res.send('im from space watchlist')
})

router.post('/watchlist',verifyToken, async(req,res)=>{
  try{
    const {spaceId, hostId}=req.body
    if(!hostId || !spaceId){
      return res.status(400).json({message: 'Missing userId or spaceId'})
    }
     const alreadyExists = await TenantWatchlist.findOne({
      userId: req.user.id,
      spaceId: spaceId
    })

    if (alreadyExists) {
      res.json({ message: 'Space already in watchlist' })
      return 
    }

     const addWatchlist=new TenantWatchlist({
        userId:req.user.id,
        hostId:hostId, 
        spaceId:spaceId
    })
    await addWatchlist.save()
    res.json({message:'Space added to watchlist'})
  }catch(err){
    console.log('error during watchlist adding')
    res.status(500).json({message:'server error'})
  }
})

router.delete('/watchlistdelete',verifyToken,async(req,res)=>{
    try{
      console.log(req.body)
        const {space_id,userid}=req.body
        // console.log(space_id)
        const deleteItem=await TenantWatchlist.findOneAndDelete({spaceId:space_id,userId:userid})
        if(!deleteItem){
        res.json({message:'Space not listed on watchlist yet'})
        }
        res.json({message:'Space removed from watchlist sucessfully'})
    }
    catch(err){
      console.log('error on watchlist deleting')
    }
})

router.get('/watchlistspace', verifyToken, async (req, res) => {
  try {
    console.log('user is',req.user.id);
    const findUser = await TenantWatchlist.find({ userId: req.user.id })
    .populate('spaceDetail')
    .populate('userDetail')
    console.log('here goo',findUser);
    res.json(findUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.get('/potentialtenant',verifyToken, async (req,res)=>{
  try{
    const {id}=req.query
    console.log('xxxxx',id)
    const findUser = await TenantWatchlist.find({hostId:id })
    .populate('userDetail')
    res.json({findUser})
    console.log('here gooooo',findUser)
  }
  catch(err){
  console.log('error on potential tenant',err)
  }
})

module.exports=router