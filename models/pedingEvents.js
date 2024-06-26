const moongose = require('mongoose');
const pendingEventsSchema = new moongose.Schema({
    title: String,
    image: String,
    time: String,
    date: String,
    location: String,
    description : String,
    status:{
        type: String,
        default: 'pending'
    },
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    }
}
);
module.exports = moongose.model('pendingEvents', pendingEventsSchema);