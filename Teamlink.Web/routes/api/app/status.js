var keystone = require('keystone'),
	async = require('async'),
	_ = require('lodash'),
	moment = require('moment'),
	crypto = require('crypto');

exports = module.exports = function(req, res) {
	
	var data = { tasks: {}, taskcomments: {}, rsvp: {} };
	
	async.series([
		function(next) {
			if (!req.body.user) return next();
			keystone.list('User').model.findById(req.body.user).exec(function(err, user) {
				if (err || !user) return next();
				data.user = user;
				return next();
			});
		},
		function(next) {
			keystone.list('Task').model.findOne()
				.where('state', 'past')
				.sort('-startDate')
				.exec(function(err, task) {
					data.tasks.last = task ? task.toJSON() : false;
					return next();
				});
		},
		function(next) {
			keystone.list('Task').model.findOne()
				.where('state', 'active')
				.sort('-startDate')
				.exec(function(err, task) {
					data.tasks.next = task ? task.toJSON() : false;
					return next();
				});
		},
		function(next) {
			if (!data.tasks.last) return next();
			keystone.list('TaskComment').model.find()
				.where('task', data.tasks.last)
				.populate('who')
				.sort('sortOrder')
				.exec(function(err, taskcomments) {
					data.taskcomments.last = taskcomments && taskcomments.length ? taskcomments.map(function(i) {
						return i.toJSON();
					}) : false;
					return next();
				});
		},
		function(next) {
			if (!data.tasks.next) return next();
			keystone.list('TaskComment').model.find()
				.where('task', data.tasks.next)
				.populate('who')
				.sort('sortOrder')
				.exec(function(err, taskcomments) {
					data.taskcomments.next = taskcomments && taskcomments.length ? taskcomments.map(function(i) {
						return i.toJSON();
					}) : false;
					return next();
				});
		},
		function(next) {
			if (!req.body.user) return next();
			if (!data.tasks.next) return next();
			keystone.list('RSVP').model.findOne()
				.where('who', data.user)
				.where('task', data.tasks.next)
				.exec(function(err, rsvp) {
					data.rsvp = rsvp;
					return next();
				});
		}
	], function(err) {
		
		var response = {
			success: true,
			config: {
				versions: { 
					compatibility: process.env.APP_COMPATIBILITY_VERSION,
					production: process.env.APP_PRODUCTION_VERSION
				},
				killSwitch: false
			},
			tasks: {
				last: false,
				next: false
			},
			rsvp: {
				responded: false,
				attending: false
			},
			user: false
		}
		
		var parseTask = function(task, current) {
			var taskData = {
				id: task._id,
				
				name: task.name,
				
				starts: task.startDate,
				ends: task.endDate,
				
				place: task.place,
				map: task.map,
				
				description: keystone.utils.cropString(keystone.utils.htmlToText(task.description), 250, '...', true),
				
				ticketsAvailable: task.rsvpsAvailable,
				ticketsRemaining: task.remainingRSVPs,
				
				taskcomments: current ? data.taskcomments.next : data.taskcomments.last
			}
			taskData.hash = crypto.createHash('md5').update(JSON.stringify(taskData)).digest('hex');
			return taskData;
		}
		
		if (data.tasks.last) {
			response.tasks.last = parseTask(data.tasks.last);
		}
		
		if (data.tasks.next && moment().isBefore(data.tasks.next.endDate)) {
			response.tasks.next = parseTask(data.tasks.next, true);
			if (data.user) {
				response.rsvp.responded = data.rsvp ? true : false;
				response.rsvp.attending = data.rsvp && data.rsvp.attending ? true : false;
				response.rsvp.date = data.rsvp ? data.rsvp.changedAt : false;
			}
		}
		
		if (data.user) {
			response.user = {
				date: new Date().getTime(),
				userId: data.user.id,
				name: {
					first: data.user.name.first,
					last: data.user.name.last,
					full: data.user.name.full
				},
				email: data.user.email,
				avatar: data.user.avatarUrl
			}
		}
		
		res.apiResponse(response);
		
	});
}
