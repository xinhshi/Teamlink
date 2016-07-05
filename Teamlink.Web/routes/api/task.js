var _ = require('lodash');
var async = require('async');
var keystone = require('keystone');
var Task = keystone.list('Task');
var RSVP = keystone.list('RSVP');


exports.list = function(req, res) {
  Task.model.find().populate('author categories').exec(function(err, items) {
    
    if (err) return res.apiError('database error', err);
    
    // res.apiResponse({
    //   posts: items
    // });

    res.apiResponse(items);
    
  });
};
 
/**
 * Get Task by ID
 */

exports.get = function(req, res) {
  Task.model.findOne().where('_id', req.params._id).exec(function(err, item) {
    
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
    
    res.apiResponse(
      item
    );
    
  });
};
 
 
/**
 * Create a Task
 */
exports.create = function(req, res) {
  
  var item = new Task.model(),
    data = (req.method == 'POST') ? req.body : req.query;
  
  item.getUpdateHandler(req).process(data, function(err) {
    
    if (err) return res.apiError('error', err);
    
    res.apiResponse({
      post: item
    });
    
  });
};
 
/**
 * Get Task by ID
 */
exports.update = function(req, res) {
  Task.model.findById(req.params.id).exec(function(err, item) {
    
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
    
    var data = (req.method == 'POST') ? req.body : req.query;
    
    item.getUpdateHandler(req).process(data, function(err) {
      
      if (err) return res.apiError('create error', err);
      
      res.apiResponse({
        post: item
      });
      
    });
    
  });
};
 
/**
 * Delete Task by ID
 */
exports.remove = function(req, res) {
  Task.model.findById(req.params.id).exec(function (err, item) {
    
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
    
    item.remove(function (err) {
      if (err) return res.apiError('database error', err);
      
      return res.apiResponse({
        success: true
      });
    });
    
  });
};