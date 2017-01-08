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
				"entrantImageUrl": "http://imanada.com/daut/as/f/2/20-mesmerizing-outdoor-christmas-lighting-ideas-top-dreamer-decorations-online-contest-winner-orange-ca_homes-decorated-for-christmas-ideas_ideas_menu-design-ideas-bathroom-designs-wall-bedroom-master.jpg"
			},
			{
				"title":"second-game",
				"votes":8,
				"location":{"lat":52.511562,"lng":13.395509},
				"entrantImageUrl": "http://hcs435.com/wp-content/uploads/2016/11/homes-decorated-for-christmas-with-others-42710605.jpg"
			},
			{
				"title":"third-game",
				"votes": -4,
				"location":{"lat":52.516941,"lng":13.392067},
				"entrantImageUrl": "http://iranews.net/daut/as/f/f/fancy-ligthing-new-home-design-ideas-interior-lighting-showy-electrical-living-room-color-schemes-designs-fluorescent-decorating_homes-decorated-for-christmas-ideas_ideas_curtain-design-ideas-small-ba.jpg"
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

