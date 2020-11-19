// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), (err) => {if(err) throw err})); 
console.log(notes);

// Express app
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Routes

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "notes.html"));
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/api/notes", (req, res) => {
    return (res.json(notes));
})

app.post("/api/notes", (req, res) => {
    notes.push(req.body);
    res.sendFile(path.join(__dirname, "notes.html"));
})





app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});