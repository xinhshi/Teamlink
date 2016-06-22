var keystone = require('keystone');
var async = require('async');
var Document = keystone.list('Document');

exports.list = function(req, res) {
  Document.model.find().populate('author categories').exec(function(err, items) {
    
    if (err) return res.apiError('database error', err);
    
    // res.apiResponse({
    //   Documents: items
    // });

    // res.apiResponse(items);
    
  });
};

exports.get = function(req, res) {
  Document.model.findOne().populate('author categories').where('slug', req.params.slug).exec(function(err, item) {
    
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
    
    res.apiResponse(
      item
    );
    
  });
};

exports.create = function(req, res) {
  
  var item = new Document.model(),
    data = (req.method == 'Document') ? req.body : req.query;
  
  item.getUpdateHandler(req).process(data, function(err) {
    
    if (err) return res.apiError('error', err);
    
    res.apiResponse({
      Document: item
    });
    
  });
};

exports.update = function(req, res) {
  Document.model.findById(req.params.id).exec(function(err, item) {
    
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
    
    var data = (req.method == 'Document') ? req.body : req.query;
    
    item.getUpdateHandler(req).process(data, function(err) {
      
      if (err) return res.apiError('create error', err);
      
      res.apiResponse({
        Document: item
      });
      
    });
    
  });
};

exports.remove = function(req, res) {
  Document.model.findById(req.params.id).exec(function (err, item) {
    
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