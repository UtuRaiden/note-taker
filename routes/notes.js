const express = require('express');
const app = express();
const uuid = require('../helpers/uuid');
const notes = require('../db/db.json');

const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');

app.get('/', (req,res)=>{
    readFromFile('./db/db.json').then((data)=>res.json(JSON.parse(data)))});

app.post('/', (req,res)=>{
    const {title, text} = req.body;

    if (title&&text){
        const newNote = {
            title,
            text,
            Id: uuid(),
        };
        const response = {
            status:'A new note has been saved!',
            body: newNote,
        };
        console.log(response);
        readAndAppend(newNote,'./db/db.json')

    }
})

app.get('/:id', (req, res) => {
if(req.params.id){
    console.info(`${req.method} request received for single note`);
    const noteId = req.params.id;
    for (let i =0; i < notes.length; i++) {
        const currentNote = notes[i];
        console.info(currentNote.id);
        if(currentNote.id === noteId){
            res.json(currentNote)
            return;
        }
    }
    res.status(404).json('Review ID not found');
}
})



module.exports = app;