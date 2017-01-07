const isWithinTimeFrame = (user) => {
	const timeFrame = 600000;
	const currentTime = Date.now();
	let isWithinTimeFrame = currentTime - user.startDate > timeFrame ? false : true;
	return isWithinTimeFrame;
}

function socket () {
	const socket = io.connect('localhost:3000');
	let user;
	socket.on('connect', (data) => {
		console.log('new user');
		user = {
			voteCount: 0,
			startDate: Date.now()
		};
	});

	socket.on('voteUpdate', (data) => {
		console.log(data);
	});

	setInterval(() => {
		if(typeof user.voteCount === 'number' && user.voteCount < 3) {
			user.voteCount++;
			socket.emit('voteIn', {_id:'5867b46bbb0bc8d3ca535c88', vote: 1});
		} else if (user.voteCount && user.voteCount === 3 && isWithinTimeFrame(user)) {
			console.log('to many votes come back in a few minute');
		} else {
			console.log('starting again');

			user = {
				voteCount: 0,
				startDate: Date.now()
			};
			socket.emit('voteIn', {_id:'5867b46bbb0bc8d3ca535c88', vote: 1});
		}
	}, 3000)
};

window.onload = socket;