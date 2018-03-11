const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
    title: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    todo:[{type: Schema.Types.ObjectId, ref: 'Todo'}],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('List', listSchema);