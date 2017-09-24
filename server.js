const express = require('express');
const bodyParser =require('body-parser');
const app =express();
const cors =require('cors');
const mysql=require('mysql');
const port =8000;

app.use(express.static(__dirname +'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended':'true'
}));
app.use(cors());

//mysql

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'flowershop'
});

let initDb=function(){    
	connection.query(''+
        'CREATE TABLE IF NOT EXISTS flowers ('+
        'id int(11) NOT NULL AUTO_INCREMENT,'+
        'img varchar(50),' +
        'name varchar(50),'+
        'descr varchar(255),'+
        'price int(11),'+
        'PRIMARY KEY(id))',
        function(err){
        	if (err) {
        		console.log('Failed to create table flowers');
				throw err;
			}
    	}
	);
};

initDb();

app.get('/flowers', function(req, res){
    connection.query('SELECT * FROM flowers', function(err,rows){
        if(err) throw err;
        console.log('get all flowers, length:'+rows.length);
        res.status(200).send(rows);
    }
                    );
});
//відповіді статусів сервера100,200,300,400,500
//гттп запити 8 get post put  

//запускаємо сервер
app.listen(port, function(err){
    if(err) throw err;
    console.log('server start on port 8000!');
});
