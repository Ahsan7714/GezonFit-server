const moongose = require('mongoose');
const activeServiceSchema = new moongose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    serviceDetails: {
        type: String,
        required: true
    },
    contact : {
        type: String,
        required: true
    },
    postalCode : {
        type: String,
        required: true
    },
    rate: {
        type: Number,
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
module.exports= moongose.model('activeService', activeServiceSchema);