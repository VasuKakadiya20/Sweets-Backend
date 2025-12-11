const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema({
    Firstname: {type:String, required:true},
    Lastname: {type:String,required:true},
    phonenumber: { type: String, required: true },
    Email: { type: String, required: true },
    password: { type:String,required:true },
    Landmark: {type:String, required:false},
    Pin_Code: {type:String, required:false},
    City: {type:String, required:false},
    State: {type:String,required:false},
});

exports.Client = mongoose.model('client', ClientSchema);
