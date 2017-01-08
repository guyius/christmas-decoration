const isWithinTimeFrame = (user) => {
	const timeFrame = 600000;
	const currentTime = Date.now();
	let isWithinTimeFrame = currentTime - user.startDate > timeFrame ? false : true;
	return isWithinTimeFrame;
}

function socket () {
	const socket = io.connect('localhost:3000');
	let user;
	socket.on('connect', () => {
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
		} else if (typeof user.voteCount === 'number' && user.voteCount === 3 && isWithinTimeFrame(user)) {
			console.log('to many votes come back in a few minute');
		} else {
			user = {
				voteCount: 0,
				startDate: Date.now()
			};
			socket.emit('voteIn', {_id:'5867b46bbb0bc8d3ca535c88', vote: 1});
		}
	}, 3000)
};

window.onload = socket;

function getData() {
	fetch('entrants').then((res) => {
		return res.json()
	}).then((users) => {
		initMap(users.entrants);
	});
}

function initMap(users) {
	const centerLat = 52.5211482;
	const centerLng = 13.3884423;
	const center = {lat: centerLat, lng: centerLng};
	const mapEl = document.querySelector('.app')
	const map = new google.maps.Map(mapEl, {
	    zoom: 14,
	    center: center
	});
	const icon = {
		url: '../img/icon.png',
		size: new google.maps.Size(32, 32),
		labelOrigin: new google.maps.Point(16, -3),
	};

	users.forEach((user) => {
	    new google.maps.Marker({
	        position: {lat: user.location.lat, lng: user.location.lng},
		    label: {
			    color: '#e60000',
			    fontWeight: 'light',
			    text: user.votes.toString()
		    },
		    title: user.title,
		    icon: icon,
			map: map
		}).addListener('click', () => {
		    mapEl.style.display = 'none';
		    goToEntrant(user);
	    });
    });
}

function navigateToMap() {
	document.querySelector('.entrant').style.display = 'none';
	document.querySelector('.app').style.display = 'block';
}

function handleEntrantUI(user) {
	const entrant = document.querySelector('.entrant');
	const elTitle = document.querySelector('.title');
	const elVotes = document.querySelector('.votes');
	const elImg = document.querySelector('.image');
	const elClose = document.querySelector('.close');
	entrant.style.display = 'block';
	elTitle.innerText = user.title;
	elVotes.innerText = user.votes;
	elImg.src = user.entrantImageUrl;
	elClose.addEventListener('click', navigateToMap);
}

function goToEntrant(user) {
	handleEntrantUI(user);
}