const moongose = require('mongoose');
const activeProductSchema = new moongose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDetails: {
        type: String,
        required: true
    },
    contact : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
    },
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});
module.exports= moongose.model('activeProduct', activeProductSchema);