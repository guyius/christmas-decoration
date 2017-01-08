module.exports = ((server, db) => {
	const io = require('socket.io')(server, {
		transports: ['polling', 'websocket'],
		allowUpgrades: true
	});
	io.on('connection', (socket) => {
		socket.on('disconnect', () => {
			socket.broadcast.send('disconnected');
		});

		socket.on('voteIn', (voter) => {
			console.log(voter);
			const collection = db.get('entrants');
			let newVoteCounter = voter.voteValue;

			//ugly hack to prevent db handling in testing...
			if(process.env.NODE_ENV.trim() !== 'dev') {
				collection.findOne({_id: voter.id}).then((entrant) => {
					newVoteCounter += entrant.votes;
					collection.update(voter.id, {$set: {votes: newVoteCounter}});
					socket.broadcast.emit('voteUpdate', {id: voter.id, voteCounter: newVoteCounter});
				});
			} else {
				socket.broadcast.emit('voteUpdate', {id: voter.id, voteCounter: newVoteCounter + 1});
			}
		});
	});
});