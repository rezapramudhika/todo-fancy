const List = require('../models/list.model');

module.exports = {
    create: (req, res) => {
        req.body.user = req.decoded.id;
        List.create(req.body, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'List created',
                data
            })
        })
    },
    findAll: (req, res) => {
        List.find({
            user: req.decoded.id
        })
            .populate('todo')
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
        List.findOne({
            _id: req.params.id
        })
            .populate('todo')
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
        List.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'List updated',
                data
            })
        })
    },
    destroy: (req, res) => {
        List.remove({ _id: req.params.id }, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(400).json({
                    message: err.message
                })
            }
            res.status(200).json({
                message: 'List deleted',
            })
        })
    }
}
