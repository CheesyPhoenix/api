const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.get("/tshirt", (req, res) => {
	res.status(200).send(JSON.parse(fs.readFileSync("MenuSites.json")));
});
app.get("/document/:path", (req, res) => {
	const { path } = req.params;
	res.status(200).sendFile(path, { root: __dirname });
});
app.post("/tshirt", (req, res) => {
	fs.writeFileSync("MenuSites.json", JSON.stringify(req.body, null, 2));
	res.status(201);
});

app.listen(PORT, () => {
	console.log("running");
});
