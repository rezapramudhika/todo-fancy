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
    loginFB: (req, res) => {
        const idFB = req.body.idFB;
        const email = req.body.email;
        // const fbToken = req.body.fbToken;
        // const imgUrl = req.body.imgUrl;
        const username = req.body.username;
        User.findOne({ 'email': email })
            .exec()
            .then(dataUser => {
                if (dataUser) {
                    const token = jwt.sign({ id: dataUser.id, email: dataUser.email, name: dataUser.name }, process.env.SECRETKEY)
                    res.status(200).json({
                        message: 'Signin success',
                        user: {
                            id: dataUser.id,
                            email: dataUser.email,
                            name: dataUser.name,
                            token: token
                        }
                    })
                } else {
                    User.create({
                        name: username,
                        email: email,
                        facebookId: idFB
                    }, (err, user) => {
                        if (err) {
                            return res.status(400).json({
                                message: err
                            })
                        }
                        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.SECRETKEY)
                        res.status(200).json({
                            message: 'Signin success',
                            user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                token: token
                            }
                        })
                    })
                }
            })
    },
    login: (req, res) => {
        User.findOne({ 'email': req.body.email })
            .then(data => {
                if (data) {
                    let check = bcrypt.compareSync(req.body.password, data.password);
                    if (check) {
                        let token = jwt.sign({ id: data.id, email: data.email, name: data.name }, process.env.SECRETKEY);
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
    },
    getAllUsers: (req, res) => {
        User.find()
            .exec()
            .then(data => {
                res.status(200).json({
                    message: 'Success get all users',
                    data
                })
            })
            .catch(err => {
                return res.status(500).json({
                    message: 'Internal server error',
                    err
                })
            })
    },
    findOne: (req, res) => {
        
    }
}