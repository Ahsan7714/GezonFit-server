const mongoose = require('mongoose');
const pendingBlogsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'pending'
    },
    // reference to the User model
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
}, {timestamps : true});

module.exports = mongoose.model('PendingBlogs', pendingBlogsSchema);