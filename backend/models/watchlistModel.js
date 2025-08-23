// const mongoose=require('mongoose')

// const watchlistSchema=new mongoose.Schema({
//     hostId:{type:String, required:true},
//     spaceId:{type:String, required: true}
// })

// const TenantWatchlist=mongoose.model('TenantWatchlist',watchlistSchema)

// exports.TenantWatchlist=TenantWatchlist


const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId:{type:String, required:true},
  hostId: {type: String, required: true },
  spaceId:{type:String, required: true},
  spaceDetail:{type: mongoose.Schema.Types.ObjectId, ref: 'spacedetail'},
  hostDetail:{type: mongoose.Schema.Types.ObjectId, ref: 'userDetail'},
  userDetail:{type: mongoose.Schema.Types.ObjectId, ref: 'userDetail'}
  // ✅ Reference to SpaceDetail model
  // spaceId: { type: mongoose.Schema.Types.ObjectId, ref: 'spacedetail', required: true }
});

// Auto-fill references before saving
watchlistSchema.pre('save', async function (next) {
  try {
    // Fill userDetail if missing
    if (this.userId && !this.userDetail) {
      const user = await mongoose.model('userDetail').findById(this.userId);
      if (user) this.userDetail = user._id;
    }

    // Fill hostDetail if missing
    if (this.hostId && !this.hostDetail) {
      const host = await mongoose.model('userDetail').findById(this.hostId);
      if (host) this.hostDetail = host._id;
    }

    // Fill spaceDetail if missing
    if (this.spaceId && !this.spaceDetail) {
      const space = await mongoose.model('spacedetail').findById(this.spaceId);
      if (space) this.spaceDetail = space._id;
    }

    next();
  } catch (err) {
    next(err);
  }
});



const TenantWatchlist = mongoose.model('TenantWatchlist', watchlistSchema);

exports.TenantWatchlist = TenantWatchlist;
