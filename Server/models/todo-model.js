const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo : { type : String, required : true },
    user : { type: mongoose.Types.ObjectId, required : true, ref:'User' }
});



module.exports = mongoose.model('Todo', todoSchema);