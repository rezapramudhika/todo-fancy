const Todo = require('../models/todo.model');
const List = require('../models/list.model');

module.exports = {
    create: (req, res) => {
        Todo.create(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            List.findOne({
                _id: req.params.listId
            })
                .exec()
                .then((list) => {
                    let updateTodo = list.todo;
                    updateTodo.push(data._id)
                    List.findByIdAndUpdate(req.params.listId, {
                        todo: updateTodo,
                    }, { new: true }, (err) => {
                        if (err) {
                            return res.status(400).json({
                                message: err.message
                            })
                        }
                        List.findOne({
                            _id: req.params.listId
                        })
                            .populate('todo')
                            .exec()
                            .then((list) => {
                                res.status(200).json({
                                    message: 'Todo added',
                                    data: list
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(400).json({
                                    message: err.message
                                })
                            })
                    })
                })
        })
    },
    findAll: (req, res) => {
        Todo.find()
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get all data !',
                    data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err.message
                })
            })
    },
    findById: (req, res) => {
        Todo.findOne({
            _id: req.params.id
        })
            .exec()
            .then((data) => {
                res.status(200).json({
                    message: 'Success get data !',
                    data
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json({
                    message: err.message
                })
            })
    },
    update: (req, res) => {
        req.body.updatedAt = Date.now();
        Todo.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'Todo updated',
                data
            })
        })
    },
    destroy: (req, res) => {
        Todo.remove({ _id: req.params.id }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'Todo deleted',
            })
        })
    }
}
