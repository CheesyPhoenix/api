//docker run: docker run -d --env DATA_PATH=/src/data/MenuSites.json --mount type=volume,src=testVolume,target=/src/data -p 8080:8080 cheesyphoenix/websiteapi:2.2

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");
const { randomInt } = require("crypto");

const dataPath = path.join(process.env.DATA_PATH || "./data/Menusites.json");

let activeLogin = "dsadsae219ufhnndsux__dsa1A***dasd221#1";

app.use(express.json());
app.use(cors());
function generateToken() {
	let _token = "";
	for (let i = 0; i < 15; i++) {
		_token += Math.floor(randomInt(0, 10));
	}
	activeLogin = _token;
}
generateToken();
setInterval(() => {
	generateToken();
}, 10 * 60 * 1000);

app.get("/tshirt", (req, res) => {
	res.status(200).send(JSON.parse(fs.readFileSync(dataPath)));
});
app.get("/document/:path", (req, res) => {
	const { path } = req.params;
	res.status(200).sendFile(path + ".html", { root: __dirname });
});
app.post("/tshirt", (req, res) => {
	if (req.body.password == activeLogin) {
		fs.writeFileSync(dataPath, JSON.stringify(req.body.data, null, 2));
		res.status(201).send("good");
	} else {
		res.status(401).send("wrong");
	}
});
app.post("/login", (req, res) => {
	const password = JSON.parse(fs.readFileSync("password.json")).password;

	if (req.body.password == password) {
		res.send({ token: activeLogin });
	}
});
app.get("/status/:token", (req, res) => {
	const token = req.params.token;
	if (token == activeLogin) {
		res.status(200).send();
	} else {
		res.status(401).send();
	}
});

app.listen(PORT, () => {
	console.log("running");
});
