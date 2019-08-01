const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const Notes = require('./model/Note');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/notes_top2', { useNewUrlParser: true });
mongoose.connection.on("error", err => console.error(err));


app.use(cors());
app.use(express.json());

app.get('/notes', async (req, res, next) => {
  try {
    const notes = await Notes.find();
    console.log(notes.description)
    res.json(notes);
  } catch(err) {
    next(err);
  }
})

app.post('/notes', async (req, res, next) => {
  console.log("Bien: ", req.body);
  const note = {
    title: req.body.title,
    description: req.body.description
  };
  try {
    const response = await Notes.create(note);
    res.json(response);
  } catch(err) {
    next(err);
  }
})


const port = process.env.PORT || 3456;
app.listen(port, () => console.log(`listening on port ${port}!`));
module.exports = app;
