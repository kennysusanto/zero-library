const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var sql = require("mssql");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 5000;
// config for your database
var config = {
  user: "user1",
  password: "user1",
  // server: 'DESKTOP-BJD0ECI',
  // database: 'ExpressJS',
  server: "ASUS_ZENBOOK",
  database: "Kenny",
  synchronize: true,
  trustServerCertificate: true,
};
app.listen(port, () => console.log(`Listening to port ${port}`));

// get list of books
app.get("/books", (req, res) => {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) {
      errorMsg = `Error connecting to database: ${err.message}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    } else {
      // create Request object
      var request = new sql.Request();
      // query to the database and get the records
      request.query("select * from books", function (err, recordset) {
        if (err) {
          errorMsg = `Error fetching books: ${err.message}`;
          console.log(errorMsg);
          res.status(500).send(errorMsg);
        } else {
          // send records as a response
          res.status(200).send(recordset.recordset);
        }
      });
    }
  });
});

// create a book object
app.post("/books", (req, res) => {
  //template = { "id": 0, "title": "", "author": "", "year": 0, "category": 0 };
  console.log("Got body: ", req.body);
  var book = req.body;
  // connect to your database
  sql.connect(config, function (err) {
    if (err) {
      errorMsg = `Error connecting to database: ${err.message}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    } else {
      // create Request object
      var request = new sql.Request();
      // query to the database and insert the records
      request.query(
        `insert into books(title, author, year, category) values('${book.title}', '${book.author}', ${book.year}, ${book.category})`,
        function (err, recordset) {
          if (err) {
            errorMsg = `Error creating book: ${err.message}`;
            console.log(errorMsg);
            res.status(500).send(errorMsg);
          } else {
            res.status(200).send(recordset);
          }
        }
      );
    }
  });
});

// update a book object
app.put("/books/:id", (req, res) => {
  //template = { "id": 0, "title": "", "author": "", "year": 0, "category": 0 };
  console.log("Got body: ", req.body);
  var book = req.body;
  var id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
    if (err) {
      errorMsg = `Error connecting to database: ${err.message}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    } else {
      // check book exist
      var request = new sql.Request();
      request.query(
        `select * from books where id = ${id}`,
        function (err, recordset) {
          if (err) {
            errorMsg = `Error fetching book details: ${err.message}`;
            console.log(errorMsg);
            res.status(500).send(errorMsg);
          } else {
            var bookFound =
              recordset.recordset.length == 1 ? recordset.recordset[0] : null;
            if (bookFound == null) {
              res.status(500).send(`Book with id ${req.params.id} not found!`);
            } else {
              // create Request object
              var request = new sql.Request();
              // query to the database and update book
              request.query(
                `update books set title = '${book.title}', author = '${book.author}', year = ${book.year}, category = ${book.category} where id = ${book.id}`,
                function (err, recordset) {
                  if (err) {
                    errorMsg = `Error updating book: ${err.message}`;
                    console.log(errorMsg);
                    res.status(500).send(errorMsg);
                  } else {
                    res.status(200).send(recordset);
                  }
                }
              );
            }
          }
        }
      );
    }
  });
});

// delete a book object
app.delete("/books/:id", (req, res) => {
  //template = { "id": 0, "title": "", "author": "", "year": 0, "category": 0 };
  var id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
    if (err) {
      errorMsg = `Error connecting to database: ${err.message}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    } else {
      // check book exist
      var request = new sql.Request();
      request.query(
        `select * from books where id = ${id}`,
        function (err, recordset) {
          if (err) {
            errorMsg = `Error fetching book details: ${err.message}`;
            console.log(errorMsg);
            res.status(500).send(errorMsg);
          } else {
            var book =
              recordset.recordset.length == 1 ? recordset.recordset[0] : null;
            if (book == null) {
              res.status(500).send(`Book with id ${req.params.id} not found!`);
            } else {
              // create Request object
              var request = new sql.Request();
              // query to the database and delete the book
              request.query(
                `delete books where id = ${id}`,
                function (err, recordset) {
                  if (err) {
                    errorMsg = `Error deleting book: ${err.message}`;
                    console.log(errorMsg);
                    res.status(500).send(errorMsg);
                  } else {
                    res.status(200).send(recordset);
                  }
                }
              );
            }
          }
        }
      );
    }
  });
});

// get a book's details
app.get("/books/:id", (req, res) => {
  // connect to your database
  sql.connect(config, function (err) {
    if (err) {
      errorMsg = `Error connecting to database: ${err.message}`;
      console.log(errorMsg);
      res.status(500).send(errorMsg);
    } else {
      // create Request object
      var request = new sql.Request();
      // query to the database and get the details
      request.query(
        `select * from books where id = ${req.params.id}`,
        function (err, recordset) {
          if (err) {
            errorMsg = `Error fetching book details: ${err.message}`;
            console.log(errorMsg);
            res.status(500).send(errorMsg);
          } else {
            var book =
              recordset.recordset.length == 1 ? recordset.recordset[0] : null;
            if (book != null) {
              res.status(200).send(book);
            } else {
              res.status(500).send(`Book with id ${req.params.id} not found!`);
            }
          }
        }
      );
    }
  });
});
