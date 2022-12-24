//Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const database = require('./Develop/db/db.json');

//Initialize app
const app = express();

//PORT
const PORT  = process.env.PORT || 3001;

//Middleware
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET request for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

//GET request for index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// POST request to add a review
app.post('/api/reviews', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { product, review, username } = req.body;

  // If all the required properties are present
  if (product && review && username) {
    // Variable for the object we will save
    const newReview = {
      product,
      review,
      username,
      upvotes: Math.floor(Math.random() * 100),
      review_id: uuid(),
    };

    // Convert the data to a string so we can save it - remember this is asycronous
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
  });

    const response = {
      status: 'success',
      body: newReview,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

//Listener
app.listen(PORT, () =>
  console.log(`Listening on port http://localhost:${PORT}`)
);