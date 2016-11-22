var mongoose = require('mongoose');                     // mongoose for mongodb
var Schema = mongoose.Schema;
var todoschema = new Schema(
    {
        text: String, 
        done: Boolean
    }
);
module.exports = mongoose.model('Todo' , todoschema);
console.log("Loaded model: " + __filename);
