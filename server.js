const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const uuidv1 = require('uuid/v1');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//MIDDLEWARE

/*  GET REQUEST */
app.get('/api/notes', (req, res) => {
  fs.readFile('db/db.json', 'utf8', function (err, contents) {
    var words = JSON.parse(contents);
    res.send(words);
  });
});


/*  POST REQUEST */
app.post('/api/notes', (req, res) => {
  fs.readFile('db/db.json', (err, data) => {
    // Check for error
    if (err) throw err;
    // Handle data gathering for json update
    let json = JSON.parse(data);
    let note = {
      title: req.body.title,
      text: req.body.text,
      id: uuidv1()
    }
    // Add data to existing json array
    json.push(note);

    // Write updated json to array 
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      // Check for error
      if (err) throw err;
      res.send('200');
    });
  });
});


/* DELETE REQUEST */
app.delete('/api/notes/:id', (req, res) => {

  fs.readFile('db/db.json', (err, data) => {
    // Check for error
    if (err) throw err;
    let deleteId = req.params.id;
    // Handle data gathering for json update
    let json = JSON.parse(data);
    json.forEach((item, i) => {
      if (item.id.includes(deleteId)) {
        json.splice(i, 1);
      }
    });

    // Write updated json to array 
    fs.writeFile('db/db.json', JSON.stringify(json, null, 2), (err) => {
      // Check for error
      if (err) throw err;
      res.send('200');
    });
  });

})


/*************    ROUTES    ************/
// Add two routes for the two pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});


// Set static folder to rtrieve css and js files
app.use(express.static(path.join(__dirname, 'public')));

//PORT
const PORT = 8000 || process.env.PORT;
app.listen(PORT);