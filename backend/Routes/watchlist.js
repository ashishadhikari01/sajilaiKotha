const {TenantWatchlist}=require('../models/watchlistModel')
const verifyToken=require('../middleware/authMiddleWare')
const express=require('express')
const router=express.Router()

router.get('/watchlist',(req,res)=>{
    res.send('im from space watchlist')
})

router.post('/watchlist',verifyToken,async(req,res)=>{
    try{
        console.log(req.body)
        const {userId,spaceId}=req.body
        if (!userId || !spaceId) {
      return res.status(400).json({ error: 'Missing userId or spaceId' });
    }

        const addWatchlist=new TenantWatchlist({
        userId:userId,
        spaceId:spaceId
    })
    await addWatchlist.save()
    res.json({message:'watchlist added to database'})
    }
    catch(err){
        console.log('error during watchlist adding')
        res.status(500).json({error:'internal server error'})
    } 
})

router.delete('/watchlistdelete',verifyToken,async(req,res)=>{
    try{
        const {space_id}=req.body
        console.log(space_id)
        const deleteItem=await TenantWatchlist.findOneAndDelete({spaceId:space_id})
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
    console.log(req.user.id);
    const findUser = await TenantWatchlist.find({ userId: req.user.id });
    console.log(findUser);
    res.json(findUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports=router