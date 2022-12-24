//Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');

//Initialize app
const app = express();

//PORT
const PORT  = process.env.PORT || 3001;

//Middleware
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//GET requests
app.get('/api/notes', (req, res) => {
  res.json(notes.slice(1));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

function createNote(body, newArr) {
  const newNote = body;
  if (!Array.isArray(newArr))
      newArr = [];  
  if (newArr.length === 0)
      newArr.push(0);
  body.id = newArr[0];
  newArr[0]++;
  newArr.push(newNote);
  fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify(newArr, null, 2)
  );
  return newNote;
}

//Post new notes
app.post('/api/notes', (req, res) => {
  const newNote = createNote(req.body, notes);
  res.json(newNote);
  console.log(newNote)
});



  /*  // Convert the data to a string so we can save it - remember this is asycronous
    //const reviewString = JSON.stringify(newReview);
       let newArr = []
    fs.readFile(`./db/reviews.json`, function (err, data) {
      newArr = JSON.parse(data);
      newArr.push(newReview);
      console.error(newArr)    

    // Write the string to a file
    fs.writeFile(`./db/reviews.json`, JSON.stringify(newArr), (err) =>
      err
        ? console.error(err)
        : console.log(
            `Review for ${newReview.product} has been written to JSON file`
          )
    );
  });*/



//Listener
app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);