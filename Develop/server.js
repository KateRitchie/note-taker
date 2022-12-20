//Dependencies
const express = require('express');

//Initialize app
const app = express();

//PORT
const PORT  = process.env.PORT || 3001;

//Middleware
app.use(express.static('public'));





//Listener
app.listen(PORT, () =>
  console.log(`Listeing on port http://localhost:${PORT}`)
);