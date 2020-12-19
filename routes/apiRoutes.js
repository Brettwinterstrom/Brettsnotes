//Dependencies  
const fs = require("fs");
const app = require("express").Router();
const path = require("path");
const util = require("util");
const uuidv1 = require("uuid/v1")

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const getNotes = function () {
    return readFile(path.join(__dirname, "../db/db.json"), "utf8");
}

const addNotes = function (note) {
    const updatedNote = {
        title: note.title,
        text: note.text,
        id: uuidv1()
    }
    return getNotes().then(function (notes) {
        const allNotes = JSON.parse(notes);
        allNotes.push(updatedNote);
        writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(allNotes)).then((newNotes) => newNotes);
    });
};

// Api get request
app.get("/api/notes", function (req, res) {
    getNotes().then(function (notes) {
        res.json(JSON.parse(notes));
    });
});

// Api Post request
app.post("/api/notes", function (req, res) {
    addNotes(req.body).then(function (notes) {
        res.send(notes);
    });
});

// Delete request
app.delete("/api/notes/:id", function (req, res) {
    const removedNote = req.params.id;

    getNotes().then(function (notes) {
        const allNotes = JSON.parse(notes);
        for (i = 0; i < allNotes.length; i++) {
            if (allNotes[i].id === removedNote) {
                allNotes.splice(i, 1);
                writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(allNotes)).then((updatedNotes) => updatedNotes);
            }
        }
    });
    res.end();
})
// export module
module.exports = app;