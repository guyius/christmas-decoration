const request = require('supertest');

describe("app server", () => {
	let server;
	beforeEach(() => {
		server = require('../index');
	});
	afterEach(() => {
		server.close();
	});

	it('on GET (/) should load html', (done) => {
		request(server)
			.get('/')
			.expect(200)
			.expect('Content-Type', /html/, done);
	});

	it('on GET (/entrants) should return entrants', (done) => {
		request(server)
			.get('/entrants')
			.expect(200)
			.expect('Content-Type', /json/)
			.expect({'entrants': null}, done);
	});
});
