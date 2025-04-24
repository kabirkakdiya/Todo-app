const TodoItem = require("../models/todoItem");

exports.createTodoItem = async (req, res, next) => {
    console.log(req.body)
    const { task, date } = req.body;
    const todoItem = new TodoItem({ task, date })
    await todoItem.save();
    res.status(201).json(todoItem)
}

exports.getTodoItems = async (req, res) => {
    const todoItems = await TodoItem.find({})
    return res.status(200).json(todoItems);
}

exports.deleteTodoItem = async (req, res) => {
    await TodoItem.findByIdAndDelete(req.params.id)
    return res.status(204).json({ message: "Item deleted successfully." });
}

exports.markCompleted = async (req, res) => {
    const todoItem = await TodoItem.findById(req.params.id)
    todoItem.completed = true;
    await todoItem.save();
    return res.status(200).json(todoItem)
}