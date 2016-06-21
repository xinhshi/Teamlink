var _ = require('lodash');
var async = require('async');
var keystone = require('keystone');
var Task = keystone.list('Task');
var RSVP = keystone.list('RSVP');

exports = module.exports = function(req, res) {

	var taskId = req.params.id;

	var rtn = {
		task: {},
		attendees: [],
		rsvp: {
			exists: false,
			attending: false
		}
	};

	async.series([

		function(next) {
			keystone.list('Task').model.findById(taskId, function(err, task) {
				if (err) {
					console.log('Error finding task: ', err)
				}
				rtn.task = task;
				return next();
			});
		},

		function(next) {
			if (!rtn.task || !req.user) return next();
			keystone.list('RSVP').model.findOne()
				.where('who', req.user.id)
				.where('task', rtn.task.id)
				.exec(function(err, rsvp) {
					if (err) {
						console.log('Error finding current user RSVP', err);
					}
					if (rsvp) {
						rtn.rsvp.exists = true;
						rtn.rsvp.attending = rsvp.attending;
					}
					return next(err);
				});
		},

		function(next) {
			if (!rtn.task) return next();
			keystone.list('RSVP').model.find()
				.where('task', rtn.task.id)
				.where('attending', true)
				.populate('who')
				.exec(function(err, results) {
					if (err) {
						console.log('Error loading attendee RSVPs', err);
					}
					if (results) {
						rtn.attendees = _.compact(results.map(function(rsvp) {
							if (!rsvp.who) return;
							return {
								url: rsvp.who.isPublic ? rsvp.who.url : false,
								photo: rsvp.who.photo.exists ? rsvp.who._.photo.thumbnail(80,80) : rsvp.who.avatarUrl || '/images/avatar.png',
								name: rsvp.name
							};
						}));
					}
					return next();
				});
		},

	], function(err) {
		if (err) {
			rtn.err = err;
		}
		res.json(rtn);
	});
}
