const mongoose=require('mongoose')

const spaceSchema=new mongoose.Schema({
    userid:{type:String, required:true},
    spacename:{type:String, required:true},
    spacedetail:{type:String, required:true},
    spacetype:{type:String, required:true},
    amenities:{
        ontapwater:{type:Boolean},
        wifi:{type:Boolean},
        balcony:{type:Boolean},
        petfriendly:{type:Boolean},
        aircondition:{type:Boolean},
        parkingtwowheeler:{type:Boolean},
        parkingfourwheeler:{type:Boolean}
    },
    rent:{type:Number, required:true},
    address:{type:String, required:true},
    phonenumber:{type:Number, required:true},
    photos:{type:[String], required:true }
})

const spacedetail=mongoose.model('spacedetail',spaceSchema)

exports.spacedetail=spacedetail