'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');

/**
 * Find user by id
 */
exports.user = function(req, res, id) {
    User.findById(id, function(err, user) {
        if (err) return next(err);
        if (!user) return next(new Error('Failed to load user ' + id));
        res.jsonp(user);
    });
};

exports.get = function(req, res, id) {
};
/**
 * Create a user
 */
exports.create = function(req, res) {
    var user = new User(req.body);
    //user.user = req.user;
    user.save(function(err) {
        if (err) {
            return res.send('./public/404.html', {
                errors: err.errors,
                user: user
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Update a user
 */
exports.update = function(req, res) {
    var user = req.user;

    user = _.extend(user, req.body);

    user.save(function(err) {
        if (err) {
            return res.send('./public/404.html', {
                errors: err.errors,
                user: user
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * Delete an user
 */
exports.destroy = function(req, res) {
    var user = req.user;

    user.remove(function(err) {
        if (err) {
            return res.send('./public/404.html', {
                errors: err.errors,
                user: user
            });
        } else {
            res.jsonp(user);
        }
    });
};

/**
 * List of Users
 */
exports.all = function(req, res) {
    User.find().sort('-created').populate('user', 'username').exec(function(err, users) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(users);
        }
    });
};