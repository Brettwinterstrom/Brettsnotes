const path = require("path");
const app = require("express").Router();

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = app;