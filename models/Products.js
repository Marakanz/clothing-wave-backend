const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true },
    desc: {type: String, unique: true },
    img: {type: String, required: true },
    categories: {type: Array, required: true},
    size: {type: Array },
    color: {type: Array},
    price: {type: Number, required: true },
    inStock: {type: Boolean, default: true},
    
},
 {timestamps: true}
 );

 module.exports = mongoose.model('Products', productSchema);