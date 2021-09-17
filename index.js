//docker run: docker run -d --env DATA_PATH=/src/data/MenuSites.json --mount type=volume,src=testVolume,target=/src/data -p 8080:8080 cheesyphoenix/websiteapi:1.1

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");

const dataPath = path.join(process.env.DATA_PATH || "./data/Menusites.json");

app.use(express.json());
app.use(cors());

app.get("/tshirt", (req, res) => {
	res.status(200).send(JSON.parse(fs.readFileSync(dataPath)));
});
app.get("/document/:path", (req, res) => {
	const { path } = req.params;
	res.status(200).sendFile(path, { root: __dirname });
});
app.post("/tshirt", (req, res) => {
	if (req.body.password == "bananacode2043") {
		fs.writeFileSync(dataPath, JSON.stringify(req.body.data, null, 2));
		res.status(201).send("good");
	} else {
		res.status(401).send("wrong");
	}
});

app.listen(PORT, () => {
	console.log("running");
});
