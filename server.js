const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var sql = require("mssql");
const app = express();
app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 5000;
// config for your database
var config = {
    user: 'user1',
    password: 'user1',
    server: 'DESKTOP-BJD0ECI',
    database: 'ExpressJS',
    synchronize: true,
    trustServerCertificate: true,
};
app.listen(port, () => console.log(`Listening to port ${port}`));

app.get('/books', (req, res) => {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) {
            errorMsg = `Error connecting to database: ${err.message}`;
            console.log(errorMsg);
            res.status(500).send(errorMsg);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query('select * from books', function (err, recordset) {
            if (err) {
                errorMsg = `Error fetching books: ${err.message}`;
                console.log(errorMsg);
                res.status(500).send(errorMsg);
            } else {
                // send records as a response
                res.status(200).send(recordset.recordset);
            }
        });
    });
});

app.post('/books/create', (req, res) => {
    //template = { "id": 0, "title": "", "author": "", "year": 0, "category": 0 };
    console.log('Got body: ', req.body);
    var book = req.body;
    // connect to your database
    sql.connect(config, function (err) {
        if (err) {
            errorMsg = `Error connecting to database: ${err.message}`;
            console.log(errorMsg);
            res.status(500).send(errorMsg);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(`insert into books(title, author, year, category) values('${book.title}', '${book.author}', ${book.year}, ${book.category})`, function (err, recordset) {
            if (err) {
                errorMsg = `Error creating book: ${err.message}`;
                console.log(errorMsg);
                res.status(500).send(errorMsg);
            }
            res.status(200).send(recordset);
        });
    });
});

app.post('/books/update', (req, res) => {
    //template = { "id": 0, "title": "", "author": "", "year": 0, "category": 0 };
    console.log('Got body: ', req.body);
    var book = req.body;
    // connect to your database
    sql.connect(config, function (err) {
        if (err) {
            errorMsg = `Error connecting to database: ${err.message}`;
            console.log(errorMsg);
            res.status(500).send(errorMsg);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(`update books set title = '${book.title}', author = '${book.author}', year = ${book.year}, category = ${book.category} where id = ${book.id}`, function (err, recordset) {
            if (err) {
                errorMsg = `Error updating book: ${err.message}`;
                console.log(errorMsg);
                res.status(500).send(errorMsg);
            }
            res.status(200).send(recordset);
        });
    });
});

app.get('/books/details/:id', (req, res) => {
    // connect to your database
    sql.connect(config, function (err) {
        if (err) {
            errorMsg = `Error connecting to database: ${err.message}`;
            console.log(errorMsg);
            res.status(500).send(errorMsg);
        }
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        request.query(`select * from books where id = ${req.params.id}`, function (err, recordset) {
            if (err) {
                errorMsg = `Error fetching book details: ${err.message}`;
                console.log(errorMsg);
                res.status(500).send(errorMsg);
            }
            var book = recordset.recordset.length == 1 ? recordset.recordset[0] : null;
            if (book != null) {
                res.status(200).send(book);
            } else {
                res.status(500).send(`Book with id ${req.params.id} not found!`);
            }
        });
    });
});