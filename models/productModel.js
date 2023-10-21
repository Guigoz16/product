const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please enter product name']
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number, 
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    
    
},
{
    timestamps: true
}
)

//creating model
const Product = mongoose.model('Product', productSchema);
module.exports = Product;