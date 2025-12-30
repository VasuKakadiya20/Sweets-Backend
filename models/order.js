const mongoose = require('mongoose');

const OrderitemSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref:"Client", required: true },
    OrderID: { type:String ,required:true},
    Firstname: {type:String, required:true},
    Lastname: {type:String,required:true},
    Phonenumber: {type:String,required:true},
    Email: {type:String,required:true},
    Landmark: {type:String,required:true},
    Pin_code: {type:String,required:true},
    City: {type:String,required:true},
    State: {type:String,required:true},
     items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "items" },
      name: String,
      price: Number,
      qty: Number,
      image: String,
      subtotal: Number
    }
  ],
    Total: {type:String,required:true},
    Date: {type:String,required:true},
    Status: {type:String, required:false},
    Payment_method : { type:String, required:true}
});

exports.Order = mongoose.model('Order',OrderitemSchema)

 

