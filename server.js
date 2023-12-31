const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api);

app.use(express.static('public'));


app.get('/', (_, res) => 
    res.sendFile(path.join(__dirname,'/public/index.html'))
);

 app.get('/notes', (_, res) => 
  res.sendFile(path.join(__dirname,'/public/notes.html'))
 );


app.listen(PORT, () => console.log(`Server listening @ http://localhost:${PORT}`))