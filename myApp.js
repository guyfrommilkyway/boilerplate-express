let express = require('express');
let app = express();
require('dotenv').config();

console.log('Hello World');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/views/index.html');
});

app.get(
	'/json',
	(req, res, next) => {
		console.log(`${req.method} ${req.path} - ${req.ip}`);

		next();
	},
	(req, res) => {
		const message =
			process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : 'Hello json';

		res.json({
			message,
		});
	}
);

app.get(
	'/now',
	(req, res, next) => {
		req.time = new Date().toString();

		next();
	},
	(req, res) => {
		res.json({ time: req.time });
	}
);

module.exports = app;
