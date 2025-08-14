const mongoose=require('mongoose')

const watchlistSchema=new mongoose.Schema({
    userId:{type:String, required:true},
    spaceId:{type:String, required: true}
})

const TenantWatchlist=mongoose.model('TenantWatchlist',watchlistSchema)

exports.TenantWatchlist=TenantWatchlist
