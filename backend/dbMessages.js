const mongoose = require("mongoose");


const whatsappSechma =  new mongoose.Schema({
    message:String,
    name:String,
    timestamp:String,
    received:Boolean
});


const MessageContent =  mongoose.model( "MessageContent",whatsappSechma);
module.exports = MessageContent;