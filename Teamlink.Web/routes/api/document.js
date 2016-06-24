var keystone = require('keystone');
var async = require('async');
var Document = keystone.list('Document');

exports.list = function(req, res) {
    Document.model.find().populate('author categories').exec(function(err, items) {

        if (err) return res.apiError('database error', err);
      
        res.apiResponse(items);
    });
};

exports.get = function(req, res) {

};

exports.create = function(req, res) {

};

exports.update = function(req, res) {
};

exports.remove = function(req, res) {
};