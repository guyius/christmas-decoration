const isWithinTimeFrame = (user) => {
	const timeFrame = 600000;
	const currentTime = Date.now();
	let isWithinTimeFrame = currentTime - user.startDate > timeFrame ? false : true;
	return isWithinTimeFrame;
};

let user;

const socket = io.connect(':443');
socket.on('connect', () => {
	user = {
		voteCount: 0,
		startDate: Date.now()
	};
});

socket.on('voteUpdate', (data) => {
	const elVotes = document.querySelector('.votes');
	elVotes.innerText = data.voteCounter;
});

function voteIn(entrantId, vote) {
	if(typeof user.voteCount === 'number' && user.voteCount < 3) {
		user.voteCount++;
		socket.emit('voteIn', {id: entrantId, voteValue: vote});
	} else if (typeof user.voteCount === 'number' && user.voteCount === 3 && isWithinTimeFrame(user)) {
		alert('to many votes come back in a few minute');
	} else {
		user = {
			voteCount: 0,
			startDate: Date.now()
		};
		socket.emit('voteIn', {id: entrantId, vote: vote});
	}
}

function getData() {
	fetch('entrants').then((res) => {
		return res.json()
	}).then((users) => {
		initMap(users.entrants);
	});
}

function initMap(users) {
	const center = {lat: 52.5191389, lng: 13.3865335};
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
			map: map,
		    id: user._id
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
	const thumbUp = document.querySelector('.up');
	const thumbDown = document.querySelector('.down');
	entrant.style.display = 'block';
	elTitle.innerText = user.title;
	elVotes.innerText = user.votes;
	elImg.src = user.entrantImageUrl;
	thumbUp.src = '../img/thumb-up.png';
	thumbDown.src = '../img/thumb-down.png';
	elClose.addEventListener('click', navigateToMap);
	thumbUp.addEventListener('click', () => {
		voteIn(user._id, 1);
	});
	thumbDown.addEventListener('click', () => {
		voteIn(user._id, -1);
	});
}

function goToEntrant(user) {
	handleEntrantUI(user);
}