const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const keys = require('../../config/keys');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const passport = require("../../config/passport");
const validator = require("../../validators/validators");
const _ = require('lodash');
const Articles = require("../../models/articles");

router.post('/articles', (req, res) => {
    console.log(req.body)
    const { errors, isValid } = validator.articleValidator(req.body);
    if (!isValid) {
        res.status(404).json(errors);
    }
    Articles.findOne({ title: req.body.title })
        .then((article) => {
            const newArticle = new Articles(req.body);
            article = _.extend(article, newArticle);
            newArticle.save((err, result) => {
                if (err) {
                    return res.status(400).json({ error: "article error" });
                } else {
                    return res.status(200).json({ message: 'article created' });
                }
            });
            res.json(newArticle);
        })
})



router.get('/articles', (req, res) => {
    Articles.find()
        .select("title _id body author accessToken")
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;