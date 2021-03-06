var async = require('async'),
  keystone = require('keystone');
 
var TaskComment = keystone.list('TaskComment');
 
/**
 * List Comments
 */
exports.list = function(req, res) {
  TaskComment.model.find().populate('author categories').exec(function(err, items) {
    
    if (err) return res.apiError('database error', err);
    
    // res.apiResponse({
    //   posts: items
    // });

    res.apiResponse(items);
    
  });
};
 
/**
 * Get Comment by Post
 */
exports.get = function(req, res) {
  TaskComment.model.find().populate('author categories').where('_id', req.params._id).exec(function(err, item) {
    
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
    
    res.apiResponse(
      item
    );
    
  });
};
 
 
/**
 * Create a Comment
 */
exports.create = function(req, res) {
  
  var item = new TaskComment.model(),
    data = (req.method == 'POST') ? req.body : req.query;
  
  item.getUpdateHandler(req).process(data, function(err) {
    
    if (err) return res.apiError('error', err);
    
    res.apiResponse({
      post: item
    });
    
  });
};
 
/**
 * Get Comment by ID
 */
exports.update = function(req, res) {
  TaskComment.model.findById(req.params.id).exec(function(err, item) {
    
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
 * Delete Comment by ID
 */
exports.remove = function(req, res) {
  TaskComment.model.findById(req.params.id).exec(function (err, item) {
    
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