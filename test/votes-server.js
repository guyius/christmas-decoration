const expect = require('chai').expect;
const server = require('../index');
const io = require('socket.io-client');

describe("socket logics", () => {
	const socketURL = 'http://localhost:3000/';
	const options ={
		transports: ['websocket'],
		'force new connection': true
	};
	let client;
	let receiver;

	beforeEach((done) => {
		server.listen(3000);
		client = io.connect(socketURL, options);
		receiver = io.connect(socketURL, options);
		done();
	});

	afterEach((done) => {
		client.disconnect()
		receiver.disconnect()
		done()
	});

	it('should receive voteIn event and respond with voteUpdate event', (done) => {
		const voteData = {_id: '5867b46bbb0bc8d3ca535c88', vote: 1};
		client.emit('voteIn', voteData);
		client.on('voteUpdate', (data) => {
			console.log('in final test');
			expect(data.id).to.equal(voteData._id);
			expect(data.voteCounter).to.equal(voteData.vote + 1);
			done();
		});
	});
});
