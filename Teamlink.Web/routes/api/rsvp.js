var keystone = require('keystone');
var async = require('async');
var RSVP = keystone.list('RSVP');

exports.list = function(req, res) {
    RSVP.model.find().populate('author categories').exec(function(err, items) {

        if (err) return res.apiError('database error', err);
      
        res.apiResponse(items);
    });
};

 
/**
 * Get People by Task
 */
exports.get = function(req, res) {
  RSVP.model.find().where('task', req.params.task).exec(function(err, item) {
    
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
    
    res.apiResponse(item);
    
  });
};
 
 
exports.create = function(req, res) {

};

exports.update = function(req, res) {
};

exports.remove = function(req, res) {
};