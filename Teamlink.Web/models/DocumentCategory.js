var keystone = require('keystone');
var Types = keystone.Field.Types;

var DocumentCategory = new keystone.List('DocumentCategory', {
	autokey: { from: 'name', path: 'key', unique: true },
	label: 'Categories',
});

DocumentCategory.add({
	name: { type: String, required: true },
});

DocumentCategory.relationship({ ref: 'Document', refPath: 'categories' });

DocumentCategory.track = true;
DocumentCategory.register();
