const moongose = require('mongoose');
const NewsLetterSchema = new moongose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    }
})
module.exports = moongose.model('NewsLetter',NewsLetterSchema);