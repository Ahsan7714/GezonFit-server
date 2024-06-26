const mongoose = require('mongoose');
const activePartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     age: {
        type: Number,
        required: true
    },
    gender :{
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    route : {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
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
        required: true,
        default: "active"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
module.exports = mongoose.model('activePartner', activePartnerSchema);