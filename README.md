# christmas-decoration
christmas decoration voting contest.

## Running locally:
1. git clone.
2. npm install.
3. Make sure you have mongo install and running.
4. In the package.json file change SET MONGOLAB_URI to 'localhost:${your-mongo-port}/${your-local-db-name}'.
5. In the db.js file change url to the same vaule as your MONGOLAB_URI.
6. Run node db.js once to create the db and add the data locally.
6. npm start will start the app on port 3000.
7. npm test will run all the tests.

## API's
/entrants (GET, no params needed).

will return a json with an array of all the entrants in the db.


## Demo on heroku:
https://christmas-decoration.herokuapp.com to get the full app.
https://christmas-decoration.herokuapp.com/entrants to get all entrants data.
