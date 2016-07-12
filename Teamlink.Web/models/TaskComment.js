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
	author: { type: Types.Relationship, initial: true, ref: 'User', index: true },
	description: { type: Types.Html, wysiwyg: true },
	//slides: { type: Types.Url },
	link: { type: Types.Url }
});

TaskComment.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	if (!this.isModified('publishedOn') && this.isModified('commentState') && this.commentState === 'published') {
		this.publishedOn = new Date();
	}
	next();
});

TaskComment.schema.post('save', function () {
	if (!this.wasNew) return;
	if (this.author) {
		keystone.list('User').model.findById(this.author).exec(function (err, user) {
			if (user) {
				user.wasActive().save();
			}
		});
	}
});

/**
 * Registration
 * ============
 */

TaskComment.defaultColumns = 'name, task|20%, who|20%';
TaskComment.register();
