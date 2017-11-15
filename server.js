const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const multiparty = require('multiparty');
const formidable = require('formidable');
const fs = require("fs");
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(cors());

//mysql

const connection = mysql.createConnection({
    host: 'sql11.freemysqlhosting.net',
    user: 'sql11205327',
    password: 'MlUZnqcKdi',
    database: 'sql11205327'
});

let initDb = function() {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS flowers (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'img varchar(50),' +
        'name varchar(50),' +
        'descr varchar(255),' +
        'price int(11),' +
        'PRIMARY KEY(id))',
        function(err) {
            if (err) {
                console.log('Failed to create table flowers');
                throw err;
            }
        }
    );
};

initDb();

app.get('/flowers', function(req, res) {
    connection.query('SELECT * FROM flowers', function(err, rows) {
        if (err) throw err;
        console.log('get all flowers, length:' + rows.length);
        res.status(200).send(rows);
    });
});

app.get('/delflower/:id', function(req, res) {
    let id = req.params.id;
    console.log('id = ' + JSON.stringify(id));
    if (id == undefined) {
        id = req.query.id;
    }
    let queryStr = 'DELETE FROM flowers WHERE id = "' + id + '"';
    connection.query(queryStr, function(err, rows) {
        if (err) throw err;
        console.log('req.params = ' + JSON.stringify(req.params));
        console.log('queryStr = ' + queryStr);
        console.log('Number of flowers deleted: ' + rows["affectedRows"]);
        res.status(200).send(rows);
    });
});

app.get('/toeditflower/:id', function(req, res) {
    let id = req.params.id;

    console.log('id = ' + JSON.stringify(id));
    if (id == undefined) {
        id = req.query.id;
        name = req.query.name;
        descr = req.query.descr;
        price = req.query.price;

    }
    let queryStr = 'SELECT * FROM flowers WHERE id = "' + id + '"';
    connection.query(queryStr, function(err, rows) {
        if (err) throw err;
        console.log('req.params = ' + JSON.stringify(req.params));
        console.log('queryStr = ' + queryStr);
        console.log('Number of flowers edited: ' + rows["affectedRows"]);
        res.status(200).send(rows);
    });
});

app.get('/editflower', function(req, res) {
    let id = req.query.id;
    let name = req.query.name;
    let descr = req.query.descr;
    let price = req.query.price;

    console.log('id = ' + JSON.stringify(id));

    let queryStr = 'UPDATE flowers SET name= "' + name + '", descr ="' + descr +
        '", price = "' + price + '" WHERE id = "' + id + '"';
    console.log(queryStr);
    connection.query(queryStr, function(err, rows) {
        if (err) throw err;
        console.log('req.params = ' + JSON.stringify(req.params));
        console.log('queryStr = ' + queryStr);
        console.log('Number of flowers edited: ' + rows["affectedRows"]);
        res.status(200).send(rows);
    });
});

app.get('/addflower', function(req, res) {
    let id = req.query.id;
    let name = req.query.name;
    let descr = req.query.descr;
    let price = req.query.price;

    let queryStr = 'INSERT INTO flowers ( name, descr, price) VALUES ("' + name + '", "' + descr + '", "' + price + '")';
    console.log(queryStr);
    connection.query(queryStr, function(err, rows) {
        if (err) throw err;
        console.log('req.params = ' + JSON.stringify(req.params));
        console.log('queryStr = ' + queryStr);
        console.log('Number of flowers edited: ' + rows["affectedRows"]);
        res.status(200).send(rows);
    });
});

function addImgPath(id, path) {
    // TODO: update your database and put link to img
    let imgSrc = path.replace("public","")
    let queryStr = 'UPDATE flowers SET img= "' + imgSrc + '" WHERE id = "' + id + '"';
    console.log(queryStr);
    connection.query(queryStr, function(err, rows) {
        if (err) throw err;
//        console.log('req.params = ' + JSON.stringify(req.params));
        console.log('queryStr = ' + queryStr);
        console.log('Number of flowers edited: ' + rows["affectedRows"]);
//        res.status(200).send(rows);
    });
}

app.post('/fileupload', function(req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        console.log(JSON.stringify(fields));
        console.log(JSON.stringify(files));
        var oldpath = files.filetoupload.path;
        var newpath = 'public/photo/' + files.filetoupload.name;
        fs.rename(oldpath, newpath, function(err) {
            if (err) throw err;
            res.write(newpath);
            addImgPath(fields.id, newpath);
            res.end();
        });
    });
});

//запускаємо сервер
app.listen(port, function(err) {
    if (err) throw err;
    console.log('server start on port '+port+'!');
});