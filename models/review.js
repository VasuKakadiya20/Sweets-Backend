const mongoose = require('mongoose')

const reviewschema = new mongoose.Schema({
    userid: {type:mongoose.Schema.Types.ObjectId, ref:"Client", required:true},
    Name: { type:String, required:true},
    Email: {type:String, required:true},
    Rating: {type:Number, required:true},
    Review_Title: {type:String, required:true},
    Review_msg: { type:String, required:true},
    Date:{type:String,required:false}
})

exports.Review = mongoose.model('review',reviewschema)