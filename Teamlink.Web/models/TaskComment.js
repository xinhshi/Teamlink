var _ = require('lodash');
var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Talks Model
 * ===========
 */

var TaskComment = new keystone.List('TaskComment', {
	track: true,
	sortable: true,
	sortContext: 'Task:taskcomments'
});

TaskComment.add({
	name: { type: String, required: true, initial: true },
	isLightningTalk: { type: Boolean },
	task: { type: Types.Relationship, ref: 'Task', required: true, initial: true, index: true },
	who: { type: Types.Relationship, ref: 'User', many: true, index: true },
	description: { type: Types.Html, wysiwyg: true },
	//slides: { type: Types.Url },
	link: { type: Types.Url }
});

TaskComment.schema.set('toJSON', {
	virtuals: true,
	transform: function(doc, rtn, options) {
		rtn = _.pick(rtn, '_id', 'name', 'place', 'map', 'description', 'link');
		if (doc.who) {
			rtn.who = doc.who.map(function(i) {
				return {
					name: i.name,
					twitter: i.twitter,
					avatarUrl: i.avatarUrl
				}
			});
		}
		return rtn;
	}
});

/**
 * Registration
 * ============
 */

TaskComment.defaultColumns = 'name, task|20%, who|20%';
TaskComment.register();
