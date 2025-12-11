const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    Firstname: {type:String, required:true},
    Lastname: {type:String,required:true},
    phonenumber: { type: String, required: true },
    Email: { type: String, required: true },
    password: { type:String,required:true },
});

exports.user = mongoose.model('user', UserSchema);
