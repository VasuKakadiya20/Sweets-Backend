const mongoose = require('mongoose')

const itemschema = mongoose.Schema({
    itemtitle: { type: String, required: true },
    price: { type: Number, require: true },
    Description: { type: String, required: true },
    images: [{ type: String, required: false, }],
})

exports.items = mongoose.model('Item',itemschema)