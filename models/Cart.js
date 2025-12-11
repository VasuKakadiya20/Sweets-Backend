const mongoose = require('mongoose');

const cartitemSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref:"Client", required: true },
    itemid: { type: mongoose.Schema.Types.ObjectId, ref:"items", required: true },
    qty: { type: Number, required: true },
    producttitle: { type: String, required: true },
    price: { type: Number, required: true },
    totalprice: {type:Number,required:true},
    itemimg: {type:String,required:true }
});

exports.Cart = mongoose.model('Cart',cartitemSchema)