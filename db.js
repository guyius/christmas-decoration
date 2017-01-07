const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = 'mongodb://localhost:27017/socketDB';

MongoClient.connect(url, (err, db) => {
	if (err) {
		console.log("Unabel to connect to mongo server ERROR : ", err);
	} else {
		console.log("Connection sucesful to ", url);

		db.createCollection('entrants');
		const collection = db.collection('entrants');
		const data = [
			{
				"title":"first-game",
				"votes":1395,
				"location":{"lat":52.50887,"lng":13.394553},
				"entrantImageUrl": "https://cdn.pixabay.com/photo/2014/11/25/21/11/winter-545688_960_720.jpg"
			},
			{
				"title":"second-game",
				"votes":8,
				"location":{"lat":52.511562,"lng":13.395509},
				"entrantImageUrl": "https://cdn.pixabay.com/photo/2015/12/17/08/27/christmas-1097006_960_720.jpg"
			},
			{
				"title":"third-game",
				"votes": -4,
				"location":{"lat":52.516941,"lng":13.392067},
				"entrantImageUrl": "https://cdn.pixabay.com/photo/2014/12/02/22/54/christmas-house-554727_960_720.jpg"
			},
			{
				"title":"forth-game",
				"votes":3,
				"location":{"lat":52.510018,"lng":13.399538},
				"entrantImageUrl": "https://cdn.pixabay.com/photo/2015/12/07/04/16/home-1080272_960_720.jpg"
			}
		];
		collection.insert(data,(err, result) => {
			if (err) {
				console.log("ERROR ", err);
			}
			else {
				console.log("SUCCESS INSERTED in to users collection _is are ", result.length, result)
			}
		});
	}
});

