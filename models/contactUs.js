const moongose = require('mongoose');
const contactUsSchema = new moongose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true,
    }
})
module.exports = moongose.model('ContactUs',contactUsSchema);