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
			const collection = db.get('entrants');
			let newVoteCounter = voter.vote;

			//ugly hack to prevent db handling in testing...
			if(process.env.NODE_ENV.trim() !== 'dev') {
				collection.findOne({_id: voter._id}).then((entrant) => {
					newVoteCounter += entrant.votes;
					collection.update(voter._id, {$set: {votes: newVoteCounter}});
					socket.broadcast.emit('voteUpdate', {id: voter._id, voteCounter: newVoteCounter});
				});
			} else {
				socket.broadcast.emit('voteUpdate', {id: voter._id, voteCounter: newVoteCounter + 1});
			}
		});
	});
});