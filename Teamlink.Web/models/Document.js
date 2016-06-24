var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Document Model
 * ==========
 */
var Document = new keystone.List('Document', {
	map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
});

Document.add({
	title: { type: String, required: true },
	state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
	author: { type: Types.Relationship, ref: 'User', index: true },
	publishedDate: { type: Types.Date, index: true, dependsOn: { state: 'published' } },
	content: {
		brief: { type: Types.Html, wysiwyg: true, height: 150 },
		extended: { type: Types.Html, wysiwyg: true, height: 400 },
	},
	categories: { type: Types.Relationship, ref: 'DocumentCategory', many: true },
});

Document.schema.virtual('content.full').get(function () {
	return this.content.extended || this.content.brief;
});

Document.track = true;
Document.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Document.register();
