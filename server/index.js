const path = require('path');
const express = require('express');

const db = require('../db');
const { syncAndSeed } = db;
const students = require('./students');
const schools = require('./schools');
const app = express();
const port = process.env.PORT || 3000;

syncAndSeed();

app.use('/api/schools', schools);
app.use('/api/students', students);
app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use(require('body-parser').json());
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'index.html'))
);
app.listen(port, () => console.log(`on port ${port}`));
