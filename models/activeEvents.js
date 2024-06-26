const moongose = require('mongoose');
const activeEventsSchema = new moongose.Schema({
    title: String,
    image: String,
    time: String,
    date: String,
    location: String,
    description : String,
    status: String, //active or inactive
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User'
    }
}
);
module.exports = moongose.model('activeEvents', activeEventsSchema);