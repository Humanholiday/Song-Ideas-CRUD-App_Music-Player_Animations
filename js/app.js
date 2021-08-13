var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');

var app = express();


// SET VIEW ENGINE TO EJS
app.set('view engine', 'ejs');

// DEFINE PORT, START LISTENING AND CONSOLE.LOG MESSAGE
app.listen(8080);
console.log('Server is now listening on port 8080');


// connect to in-project sqlite database
let db = new sqlite3.Database('../database/Employee_test.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the Song Ideas SQlite database.');
});

//middleware for parsing bodies from URL
app.use(bodyParser.urlencoded({extended: false}));

// set default view path
app.use(express.static(path.join(__dirname,'../')));


// **************** HOME PAGE CIRCLE SOUNDS PAGE RENDERING ****************

// USING EJS TO RENDER HOMEPAGE
app.get('/', function(req, res) {

  // GET ALL DATA FROM THE IDEAS TABLE AND RETURN AS A MODEL TO THE HOME PAGE

  const sql = "SELECT * FROM ideas ORDER BY rowid"

  // Some explanations on the line of code db.all (sql, [], (err, rows) => { ... }:
  //
  // The 1st parameter is the SQL query to execute
  // The 2nd parameter is an array with the variables necessary for the query.
  // Here, the value “[]” is used because the query does not need a variable.
  //   The 3rd parameter is a callback function called after the execution of the SQL query.
  // “(err, rows)” corresponds to the parameters passed to the callback function. “err” may contain an error object
  // and “rows” is an array containing the list of rows returned by the SELECT.

  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    // Response = render the home page and pass 2 variables - data as 'model' and an empty message string
    res.render('pages/index', { model: rows, message: ''});
  });

});


// USING EJS TO RENDER CIRCLE SOUNDS PAGE
// USE EXPRESS TO DEFINE A GET ROUTE FOR /CIRCLES
app.get('/circles', function(req, res) {
  res.render('pages/circles');
});

// USING EJS TO RENDER CIRCLE SOUNDS PAGE
// USE EXPRESS TO DEFINE A GET ROUTE FOR /CIRCLES
app.get('/readme', function(req, res) {
  res.render('pages/readme');
});



// **************** CRUD ACTIONS ****************


// INSERT A NEW SONG IDEA
// USE EXPRESS TO DEFINE A POST ROUTE FOR /ADD
app.post('/add', function (req, res)
{
 // RETURNS A SERIALISED COOKIE STRING
 db.serialize(() => {
   // RUNS A DATABASE QUERY - DEFINE QUERY AND INSERT REQUEST VARIABLES AS PREPARED STATEMENT
   db.run('INSERT INTO ideas(title,name,email,notes,url,genre_rock,genre_indie,genre_jazz,genre_other,song_key)' +
     'VALUES(?,?,?,?,?,?,?,?,?,?)',
     [req.body.title, req.body.name, req.body.email, req.body.notes, req.body.url, req.body.genre_rock,
       req.body.genre_indie, req.body.genre_jazz, req.body.genre_other, req.body.song_key],

     //  IF ERROR IS THROWN CONSOLE.LOG THE ERROR
     function (err) {
       if (err) {
         return console.log(err.message);
       }
       // IF NO ERROR THEN CONSOLE.LOG SUCCESS MESSAGE
       console.log("New idea has been added");

       // GET ALL DATA FROM THE IDEAS TABLE AND RETURN AS A MODEL WHEN RENDERING THE HOME PAGE
       const sql = "SELECT * FROM ideas ORDER BY rowid"

       db.all(sql, [], (err, rows) => {
         if (err) {
           return console.error(err.message);
         }

         // Response = render the home page and pass 2 variables - data as 'model' and an entry added message
         res.render('pages/index', { model: rows, message: req.body.title + ' entry added' });
       });
    });
  });
});


//UPDATE A SONG IDEA
// USE EXPRESS TO DEFINE A POST ROUTE FOR /UPDATE
app.post('/update', function (req, res) {
  // RETURNS A SERIALISED COOKIE STRING
  db.serialize(() => {
    // RUNS A DATABASE QUERY - DEFINE QUERY AND INSERT REQUEST VARIABLES AS PREPARED STATEMENT
    db.run('UPDATE ideas SET title = ?, name = ?, email = ?, notes = ?, url = ?, genre_rock = ? ,genre_indie = ?, ' +
      'genre_jazz = ?, genre_other = ?, song_key = ? WHERE id = ?'
     ,
      [req.body.title, req.body.name, req.body.email, req.body.notes, req.body.url, req.body.genre_rock,
        req.body.genre_indie, req.body.genre_jazz, req.body.genre_other, req.body.song_key, req.body.id],

      //  IF ERROR IS THROWN CONSOLE.LOG THE ERROR
    function (err) {
      if (err) {
        return console.log( err.message);
      }
      // IF NO ERROR THEN CONSOLE.LOG SUCCESS MESSAGE
    console.log("Entry updated successfully");


      // GET ALL DATA FROM THE IDEAS TABLE AND RETURN AS A MODEL TO THE HOME PAGE
      const sql = "SELECT * FROM ideas ORDER BY rowid"

      db.all(sql, [], (err, rows) => {
        if (err) {
          return console.error(err.message);
        }

        // Response = render the home page and pass 2 variables - data as 'model' and an entry updated message
        res.render('pages/index', { model: rows, message: req.body.title + ' entry updated'});
        // res.redirect(301, 'http://localhost:8080');
      });
    });
  });
});


//DELETE
// USE EXPRESS TO DEFINE A POST ROUTE FOR /DELETE
app.post('/delete', function (req, res) {
  // RETURNS A SERIALISED COOKIE STRING
   db.serialize(() => {
     // RUNS A DATABASE QUERY - DEFINE QUERY AND INSERT REQUEST VARIABLES AS PREPARED STATEMENT
     db.run('DELETE FROM ideas WHERE id = ?', req.body.id,

       //  IF ERROR IS THROWN CONSOLE.LOG THE ERROR
       function (err) {
       if (err) {
         res.send("Error encountered while deleting");
         return console.error(err.message);
       }
        // IF NO ERROR THEN CONSOLE.LOG SUCCESS MESSAGE
       console.log("Entry deleted");

       // GET ALL DATA FROM THE IDEAS TABLE AND RETURN AS A MODEL TO THE HOME PAGE
       const sql = "SELECT * FROM ideas ORDER BY rowid"

       db.all(sql, [], (err, rows) => {
         if (err) {
           return console.error(err.message);
         }
         // Response = render the home page and pass 2 variables - data as 'model' and an entry deleted message
         res.render('pages/index', { model: rows, message: 'entry deleted' });
       });
     });
   });
 });


// CLOSE DATABASE CONNECTION
 app.get('/close', function (req, res) {
   db.close((err) => {
     if (err) {
       res.send('There is some error in closing the database');
       return console.error(err.message);
     }
     console.log('Closing the database connection.');
     res.send('Database connection successfully closed');
   });
 });


// FUNCTION TO DISPLAY THE REQUESTED FORM  - NEW IDEA, EDIT, VIEW, DELETE
 function openForm(formType) {
   // Declare all variables
   var i, tabcontent, tablinks;

   // Get all elements with class="tabcontent", loop through and and hide them
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
     tabcontent[i].style.display = "none";
   }

   // Get all elements with class="tablinks", loop through and remove the class "active"
   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" active", "");
   }

   // Show the current tab, and add an "active" class to the button that opened the tab
   document.getElementById(formType).style.display = "block";
   evt.currentTarget.className += " active";
 }
