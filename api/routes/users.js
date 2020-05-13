const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const keys = require('../../config/keys');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require("../../config/passport");
const Users = require('../../models/users');
const validator = require("../../validators/validators");
const _ = require('lodash');

router.post('/login', (req, res) => {
    const { errors, isValid } = validator.loginValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Users.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) res.status(404).json({ "username": "username doesn't exist." });
            bcrypt
                .compare(req.body.password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        res.status(400).json({ "password": "Password do not match" })
                    }
                    else {
                        const payload = {
                            id: user.id,
                            username: user.username,
                        }
                        jwt.sign(
                            payload,
                            keys.secretOrKey,
                            {
                                expiresIn: 2155926
                            },
                            (err, token) => {
                                if (err) {
                                    res.json({ "message": "error occured" });
                                } else {
                                    res.json({
                                        success: true,
                                        message: "success",
                                        accessToken: "Bearer " + token
                                    })
                                    return user.updateOne({ accessToken: token }, function (err, success) {
                                        console.log("replaced access token successfully!!!");
                                    })
                                }
                            }
                        )
                    }
                })

        })
})

router.post('/register', (req, res) => {
    const { errors, isValid } = validator.registerValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Users
        .findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                res.status(404).json({ "email": "Email Id is already taken" })
            }
            else {
                const registerUser = new Users({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    address: req.body.address,
                    accessToken:'',
                    success: true,
                    message: "success",
                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(registerUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        registerUser.password = hash;
                        registerUser
                            .save()
                            .then((user) => res.json(user))
                            .catch((err) => console.log(err));
                    })
                })
            }
        })
})


module.exports = router