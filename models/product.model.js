const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name:  String, 
    price:  Number,
    productImage: String //mesh nrml nsameha kima samitha ghady product image
});


// Export the model
module.exports = mongoose.model('Product', ProductSchema);