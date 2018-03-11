const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    register: (req, res) => {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }, (err, user) => {
            if (err) {
                return res.status(400).json({
                    message: err
                })
            }
            res.status(200).json({
                message: 'User registered',
                data: user
            })
        })
    },
    login: (req, res) => {
        User.findOne({ 'email': req.body.email })
            .then(data => {
                if (data) {
                    let check = bcrypt.compareSync(req.body.password, data.password);
                    if (check) {
                        let token = jwt.sign({ id: data.id, email: data.email, name: data.name }, 'secret-ui');
                        res.status(200).json({
                            message: 'Signin success',
                            user: {
                                id: data.id,
                                email: data.email,
                                name: data.name,
                                token: token
                            }
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'user not found'
                    })
                }
            })
    }
}