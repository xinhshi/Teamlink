/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('underscore');
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

//added for html path
var express = require("express");
var app     = express();
var path    = require("path");


// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api'),
	ang_bootm: importRoutes('./ang_bootm')
};

// Setup Route Bindings
exports = module.exports = function (app) {
    

	// Views
	app.get('/', routes.views.index);
	app.get('/blog/:category?', routes.views.blog);
	app.all('/blog/post/:post', routes.views.post);
    
    app.get('/app', function(req,res){
    	res.sendFile(path.join(__dirname,'../templates/views','app.html'));
	});

    app.get('/api/document/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.document.list);
	
	//angbootm
     app.get('/api/post/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.list);
	 app.all('/api/post/create', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.create);
	 app.get('/api/post/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.get);
	 app.all('/api/post/:id/update', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.update);
	 app.get('/api/post/:id/remove', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.remove);

	 app.get('/api/post-category/list', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_categories.list);
     app.get('/api/post-category/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_categories.get);
	 app.get('/api/post-by-category/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_by_category.list);


    // App Routes for Angular Bootstrap Material Project
	app.get('/ang_bootm', [keystone.middleware.api, keystone.middleware.cors], routes.ang_bootm.app);
	app.get('/ang_bootm/blog', [keystone.middleware.api, keystone.middleware.cors], routes.ang_bootm.blog);
	app.get('/ang_bootm/post', [keystone.middleware.api, keystone.middleware.cors], routes.ang_bootm.post);
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);
};
