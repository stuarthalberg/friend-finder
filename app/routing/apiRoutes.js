var waitingArray = require('../data/waitinglistData.js');
var tableArray = require('../data/tableData.js');
var characters = require('../data/characters.js');


module.exports = function (app) {
	app.get('/api/tables', function(req, res) {
		return res.json(tableArray);
	});
	app.get('/api/waitlist', function(req, res) {
		return res.json(waitingArray);
	});
	app.get('/api/characters', function(req, res) {
		return res.json(characters);
	});
	app.get('/api/:default?', function(req, res) {
		return res.send("Path not available");
	});

	// app.get('/api/waitlist', function(req, res) {
	// 	return res.json(waitingArray);
	// });
	// app.get('/api/tables', function(req, res) {
	// 	return res.json(tableArray);
	// });
	app.get('/api/tables/:customerId?', function(req, res) {
		var chosen = req.params.customerId; //variable
		console.log(chosen);

		for (var i = 0; i < tableArray.length; i ++) {
			if (chosen === tableArray[i].customerID) {
				return res.json(tableArray[i]);
			}
		}
		return res.send("customer not found");
		// return res.send(chosen);
		// res.end();
	});
	app.get('/api/waitlist/:customerId?', function(req, res) {
		var chosen = req.params.customerId; //variable
		console.log(chosen);

		for (var i = 0; i < waitingArray.length; i ++) {
			if (chosen === waitingArray[i].customerID) {
				return res.json(waitingArray[i]);
			}
		}
		return res.send("customer not found");
		// return res.send(chosen);
		// res.end();
	});

	app.post('/api/new', function(req, res) {
		var newCustomer = req.body;

		if (tableArray.length < 5) {
			
			//newCustomer.customerID = newCustomer.customerID.replace(/\s+/g, "").toLowerCase();

			tableArray.push(newCustomer);
			return res.send("true")
		} else {
			waitingArray.push(newCustomer);
			return res.send("false")
		}
	});

}

