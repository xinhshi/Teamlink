var _ = require('lodash');
var keystone = require('keystone');
var moment = require('moment');
var Types = keystone.Field.Types;

/**
 * Meetups Model
 * =============
 */

var Task = new keystone.List('Task', {
	track: true,
	autokey: { path: 'key', from: 'name', unique: true }
});

Task.add({
	name: { type: String, required: true, initial: true },
	publishedDate: { type: Types.Date, index: true },

	state: { type: Types.Select, options: 'draft, scheduled, active, past', noedit: true },

	startDate: { type: Types.Datetime, required: true, initial: true, index: true, width: 'short', note: 'e.g. 2016-07-15 / 10:00am' },
	endDate: { type: Types.Datetime, required: true, initial: true, index: true, width: 'short', note: 'e.g. 2016-07-15 / 3:00pm' },

	place: { type: String, required: false, initial: true, width: 'medium', default: 'Shanghai', note: 'Usually Shanghai' },
	map: { type: String, required: false, initial: true, width: 'medium', default: 'Shanghai', note: 'Shanghai' },
	description: { type: Types.Html, wysiwyg: true },

	maxRSVPs: { type: Number, default: 100 },
	totalRSVPs: { type: Number, noedit: true },

	legacy: { type: Boolean, noedit: true, collapse: true },
});




// Relationships
// ------------------------------

Task.relationship({ ref: 'TaskComment', refPath: 'task', path: 'taskcomments' });
Task.relationship({ ref: 'RSVP', refPath: 'task', path: 'rsvps' });




// Virtuals
// ------------------------------

Task.schema.virtual('url').get(function() {
	return '/tasks/' + this.key;
});

Task.schema.virtual('remainingRSVPs').get(function() {
	if (!this.maxRSVPs) return -1;
	return Math.max(this.maxRSVPs - (this.totalRSVPs || 0), 0);
});

Task.schema.virtual('rsvpsAvailable').get(function() {
	return (this.remainingRSVPs > 0);
});




// Pre Save
// ------------------------------

Task.schema.pre('save', function(next) {
	var task = this;
	// no published date, it's a draft meetup
	if (!task.publishedDate) {
		task.state = 'draft';
	}
	// meetup date plus one day is after today, it's a past meetup
	else if (moment().isAfter(moment(task.startDate).add('day', 1))) {
		task.state = 'past';
	}
	// publish date is after today, it's an active meetup
	else if (moment().isAfter(task.publishedDate)) {
		task.state = 'active';
	}
	// publish date is before today, it's a scheduled meetup
	else if (moment().isBefore(moment(task.publishedDate))) {
		task.state = 'scheduled';
	}
	next();
});




// Methods
// ------------------------------

Task.schema.methods.refreshRSVPs = function(callback) {
	var task = this;
	keystone.list('RSVP').model.count()
		.where('task').in([task.id])
		.where('attending', true)
		.exec(function(err, count) {
			if (err) return callback(err);
			task.totalRSVPs = count;
			task.save(callback);
		});
}

Task.schema.methods.notifyAttendees = function(req, res, next) {
	var task = this;
	keystone.list('User').model.find().where('notifications.tasks', true).exec(function(err, attendees) {
		if (err) return next(err);
		if (!attendees.length) {
			next();
		} else {
			attendees.forEach(function(attendee) {
				new keystone.Email('new-task').send({
					attendee: attendee,
					task: task,
					subject: 'New task: ' + task.name,
					to: attendee.email,
					from: {
						name: 'SydJS',
						email: 'hello@sydjs.com'
					}
				}, next);
			});
		}
	});
}

Task.schema.set('toJSON', {
	transform: function(doc, rtn, options) {
		return _.pick(doc, '_id', 'name', 'startDate', 'endDate', 'place', 'map', 'description', 'rsvpsAvailable', 'remainingRSVPs');
	}
});


/**
 * Registration
 * ============
 */

Task.defaultSort = '-startDate';
Task.defaultColumns = 'name, state|10%, startDate|15%, publishedDate|15%';
Task.register();
