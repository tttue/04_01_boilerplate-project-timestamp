// server.js
// where your node app starts
/*
	npm install express cors
	Date Invalid : https://qiita.com/muddydixon/items/2edf6dcb84295eccf4f3
*/

// init project
var express = require('express');
var app = express();
var tools =  require('./tools.js');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
	res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
	res.json({ greeting: 'hello API' });
});

// Main
app.get("/api/timestamp/:date_string?", function (req, res) {
	var date = new Date();
	let checkS = /^[0-9]*$/;
	var date_string = req.params.date_string;
	if (checkS.test(date_string)) {
		date_string = parseInt(date_string)*1000;
		date = new Date(date_string);
	} else {
		date = new Date(tools.refineDateString(date_string));
	}
	if (isNaN(date.getTime())){
		res.json({ error: "Invalid Date" });
	}else {
		res.json({ "unix": date.getTime(), "utc": date.toUTCString() });
	}


});


// listen for requests :)
var listener = app.listen(process.env.PORT|3000, function () {
	console.log('Your app is listening on port ' + listener.address().port);
});
