const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todo: String,
    time: String,
    starred: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', todoSchema);