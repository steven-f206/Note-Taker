const express = require('express');
const path = require('path');

// Init express
const app = express();


/*
app.get('/', (req, res) => {
  res.send(path.join(__dirname, 'public', 'index.html'));
});
*/

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Assign PORT
const PORT = process.env.PORT || 5000;

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




/* Create your endpoint/route handlers
app.get('/', function(req, res) {
  res.send('Hello World');
});
*/