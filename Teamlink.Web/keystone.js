// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.



keystone.init({

	'name': 'TEAMLINK',
	'brand': 'TEAMLINK',

	'less': 'public',
    'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',

	'view engine': 'jade',

	'emails': 'templates/emails',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',

});


// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	plural: keystone.utils.plural,
	editable: keystone.content.editable,
});

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7',
		},
	},
});

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));



// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	posts: ['posts', 'post-comments', 'post-categories'],
	users: 'users',
	tasks: ['tasks', 'task-comments', 'rsvps'],

});

// Start Keystone to connect to your database and initialise the web server

//cloudcmd
// var http        = require('http'),
//     cloudcmd    = require('cloudcmd'),
//     express     = require('express'),
//     io          = require('socket.io'),
//     app         = express(),

//     PORT        = 1337,
//     PREFIX      = '/cloudcmd',
//     server,
//     socket;

// server = http.createServer(app);
// socket = io.listen(server, {
//     path: PREFIX + '/socket.io'
// });

// app.use(cloudcmd({
//     socket: socket,     /* used by Config, Edit (optional) and Console (required)   */
//     config: {           /* config data (optional)                                   */
//         prefix: PREFIX, /* base URL or function which returns base URL (optional)   */
//     }
// }));

// server.listen(PORT);

keystone.start();
