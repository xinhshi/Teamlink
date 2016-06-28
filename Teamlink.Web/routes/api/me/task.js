var keystone = require('keystone'),
	RSVP = keystone.list('RSVP');

exports = module.exports = function(req, res) {

	console.log("User ID is", req.user._id);
	console.log("The task is", req.body.data.task)
	
	RSVP.model.findOne()
		.where('who', req.user._id)
		.where('task', req.body.data.task)
		.exec(function(err, rsvp) {
		
			if (req.body.statusOnly) {
				console.log("==========statusOnly=============")
			
				return res.apiResponse({
					success: true,
					rsvped: rsvp ? true : false,
					attending: rsvp && rsvp.attending ? true : false
				});
				
			} else {
				
				if (rsvp) {
					console.log("==========rsvp=============")
					console.log("req.body.attending", req.body);
					rsvp.set({
						attending: req.body.data.attending
					}).save(function(err) {
						if (err) return res.apiResponse({ success: false, err: err });
						return res.apiResponse({ success: true, attending: req.body.data.attending });
					});
				
				} else {
					console.log("==========saving to rsvp model=============")
					new RSVP.model({
						task: req.body.data.task,
						who: req.user,
						attending: req.body.data.attending
					}).save(function(err) {
						if (err) return res.apiResponse({ success: false, err: err });
						return res.apiResponse({ success: true });
					});
				
				}
				
			}
		
		});

}
