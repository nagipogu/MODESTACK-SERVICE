const mongoose = require('mongoose');
const isEmpty = require('is-empty');
const validator = require('validator');

module.exports.loginValidator = loginValidator = function validateLoginInput(data) {
    const errors = {}
    data.username = !(isEmpty(data.username)) ? data.username : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";

    if (validator.isEmpty(data.username)) {
        errors.username = "username is required!"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required!!"
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

module.exports.registerValidator = registerValidator = function validateRegisterInput(data) {
    const errors = {}
    data.username = !(isEmpty(data.username)) ? data.username : "";
    data.password = !(isEmpty(data.password)) ? data.password : "";
    data.email = !(isEmpty(data.email)) ? data.email : "";
    data.address = !(isEmpty(data.address)) ? data.address : "";

    if (validator.isEmpty(data.username)) {
        errors.username = "Username is required!!"
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required!!"
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required!"
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Please provide valid email ID!"
    }

    if (validator.isEmpty(data.address)) {
        errors.address = "Address is required!!"
    }
    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}

module.exports.articleValidator = articleValidator = function validateArticleInput(data) {
    const errors = {}
    data.title = !(isEmpty(data.title)) ? data.title : "";
    data.body = !(isEmpty(data.body)) ? data.body : "";
    data.author = !(isEmpty(data.author)) ? data.author : "";
   
    if (validator.isEmpty(data.title)) {
        errors.title = "Title is required!!"
    }
    if (validator.isEmpty(data.body)) {
        errors.body = "Body is required!!"
    }
    if (validator.isEmpty(data.author)) {
        errors.author = "Author name is required!!"
    }

    return {
        errors: errors,
        isValid: isEmpty(errors)
    }
}