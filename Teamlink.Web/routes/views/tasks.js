var keystone = require('keystone'),
	moment = require('moment'),
	RSVP = keystone.list('RSVP');

var Task = keystone.list('Task');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	locals.section = 'tasks';
	
	view.query('upcomingTask',
		Task.model.findOne()
			.where('state', 'active')
			.sort('-startDate')
	, 'taskcomments[who]');
	
	view.query('pastTasks',
		Task.model.find()
			.where('state').ne( 'draft' )
			.sort('-startDate')
	, 'taskcomments[who]');
	
	view.on('render', function(next) {
	
		if (!req.user || !locals.upcomingTask) return next();
		
		RSVP.model.findOne()
			.where('who', req.user._id)
			.where('task', locals.upcomingTask)
			.exec(function(err, rsvp) {
				locals.rsvpStatus = {
					rsvped: rsvp ? true : false,
					attending: rsvp && rsvp.attending ? true : false
				}
				return next();
			});
			
	});
	
	view.render('tasks');
	
}
