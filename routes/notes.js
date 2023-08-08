const express = require('express');
const app = express();
const uuid = require('../helpers/uuid');

const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');

app.get('/', (req,res)=>{
    readFromFile('./db/db.json').then((data)=>res.json(JSON.parse(data)))});

app.post('/', (req,res)=>{
    const {title, text} = req.body;

    if (title&&text){
        const newNote = {
            title,
            text,
            noteId: uuid(),
        };
        const response = {
            status:'A new note has been saved!',
            body: newNote,
        };
        console.log(response);
        readAndAppend(newNote,'./db/db.json')

    }
})





module.exports = app;