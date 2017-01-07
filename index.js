const app = require('express')();
const server = require('http').createServer(app);
const monk = require('monk');
const db = monk(process.env.MONGOLAB_URI.trim());
require('./votes-server')(server, db);

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

app.get('/entrants', (req, res) => {
	const collection = db.get('entrants');
	collection.find({},{},(entrants) => {
		res.send({"entrants": entrants});
	});
});

server.listen(process.env.PORT  || 3000);
module.exports = server;