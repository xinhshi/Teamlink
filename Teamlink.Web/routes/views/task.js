var keystone = require('keystone'),
	moment = require('moment'),
	Task = keystone.list('Task'),
	RSVP = keystone.list('RSVP');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'tasks';
	//locals.page.title = 'Tasks - Mobility';
	
	locals.rsvpStatus = {};
	
	
	// LOAD the Meetup
	
	view.on('init', function(next) {
		Task.model.findOne()
			.where('key', req.params.task)
			.exec(function(err, task) {
				
				if (err) return res.err(err);
				if (!task) return res.notfound('Post not found');
				
				locals.task = task;
				locals.task.populateRelated('talks[who] rsvps[who]', next);
				
			});
	});
	
	
	// LOAD an RSVP
	
	view.on('init', function(next) {
	
		if (!req.user || !locals.task) return next();
		
		RSVP.model.findOne()
			.where('who', req.user._id)
			.where('task', locals.task)
			.exec(function(err, rsvp) {
				locals.rsvpStatus = {
					rsvped: rsvp ? true : false,
					attending: rsvp && rsvp.attending ? true : false
				}
				return next();
			});
			
	});
	
	
	view.render('task');
	
}