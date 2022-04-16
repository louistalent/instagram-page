const mongoose = require('mongoose'),
    express = require('express'),
    router = express.Router();
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const keys = require('../config/db');
const bcrypt = require("bcryptjs");

const User = require('../models/User');
// User Check
const regiCheck = require('../check/register');
const joinCheck = require('../check/login')

// CREATE Users
router.route('/register').post((req, res, next) => {
    const { errors, isCheck } = regiCheck(req.body);
    if (isCheck) {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                res.send({ type: 'email', msg: 'Email already exists' });
            } else {
                const newUser = new User({
                    email: req.body.email,
                    fullName: req.body.fullname,
                    userName: req.body.username,
                    password: req.body.password
                });
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => res.send({ type: 'success', msg: 'Success' }))
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    } else {
        res.send(errors);
    }
});
router.route('/join').post((req, res, next) => {
    const { errors, isCheck } = joinCheck(req.body);
    if (isCheck) {
        const email = req.body.email;
        const password = req.body.password;
        User.findOne(
            { $or: [{ "email": email }, { "name": email }] }).then(user => {
                if (!user) {
                    res.send({ type: 'email', msg: "Email or Name not found" });
                }
                else {
                    bcrypt.compare(password, user.password).then(isMatch => {
                        if (isMatch) {
                            const userInfo = {
                                username: user.userName,
                                fullname: user.fullName,
                                email: user.email,
                                password: user.password
                            };
                            res.send({ type: 'success', msg: "Success", data: userInfo });
                        } else {
                            res.send({ type: 'password', msg: "Password incorrect" });
                        }
                    });
                }
            });
    } else {
        res.send(errors);
    }

})

module.exports = router;