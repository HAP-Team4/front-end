const express = require("express");
const bodyParser = require("body-parser")

let db = {
	movies: [
		{
			movie_id: 1,
			title: "Hello world",
			attendee: [],
			date: "2020-01-01T00:00:00Z",
			genre: "Horror",
			location: "Some Cinema, London"
		}
	],
	users: [
		{
			id: "1",
			password: "xxx"
		},
		{
			id: "2",
			password: "yyy"
		},
		{
			id: "3",
			password: "zzz"
		},
		{
			id: "4",
			password: "aaa"
		}
	]
};
let movie_id_counter = db.movies.length + 1;

let app = express()
app.use(function (req, res, next) {
	res.set("Access-Control-Allow-Origin", "*")
	res.set("Access-Control-Allow-Methods", "*")
	res.set("Access-Control-Allow-Headers", "*")
	next()
})
app.use(express.static("build"))

app.get("/all_movies", async function(req, res) {
	res.send(db.movies)
});
app.put("/going", async function (req, res) {
	let movie = db.movies.find(x => x.movie_id.toString() == req.query.movie_id)
	if (!movie) {
		res.status(404)
		res.end()
	} else {
		let uid = req.query.user_id
		if (!movie.attendee.includes(uid)) {
			movie.attendee.push(uid)
		}
		res.end()
	}
});
app.post("/login", bodyParser.json(), async function (req, res) {
	let {user_id, password} = req.body;
	let user = db.users.find(x => x.id === user_id && x.password === password);
	if (!user) {
		res.status(404)
		res.send("User not found")
	} else {
		res.send(user.id)
	}
});
app.post("/create_movie", bodyParser.json(), async function (req, res) {
	db.movies.push(Object.assign({}, req.body, {
		movie_id: movie_id_counter++
	}))
	res.end()
});

app.listen(8080, "0.0.0.0")
