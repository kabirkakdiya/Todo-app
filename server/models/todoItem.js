const mongoose = require('mongoose')

const todoItemSchema = new mongoose.Schema({
    task: { type: String, required: true },
    date: Date,
    completed: { type: Boolean, default: false }
}, { timestamps: true })

const TodoItem = mongoose.model('TodoItem', todoItemSchema)

module.exports = TodoItem;