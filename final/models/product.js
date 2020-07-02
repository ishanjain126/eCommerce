const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },

    description: {
        type: String,
        required: true,
        maxlength: 3200
    },

    price: {
        type: Number,
        trim: true,
        required: true,
        maxlength: 32
    },

    category: {
        type: ObjectId,
        trim: true,
        ref: 'Category',
        maxlength: 32,
        required: true
    },

    quantity: {
        type: Number
    },

    sold: {
        type: Number,
        default: 0
    },

    photo: {
        data: Buffer,
        contentType: String
    },
    
    shipping: {
        type:String,
        required:false
    }

},

 {timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);

