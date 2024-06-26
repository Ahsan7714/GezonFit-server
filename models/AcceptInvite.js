const mongoose = require('mongoose');

const AcceptInviteSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    activePartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activePartner',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AcceptInvite', AcceptInviteSchema);
