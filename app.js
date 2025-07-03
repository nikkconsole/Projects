const express = require("express");
const path = require('path');
const mysql = require("mysql");

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project-node'

});

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

// // parse URL (as sent by html )
app.use(express.urlencoded({extended: false}));

// // parse JSON bodies (as sent by API)
app.use(express.json())

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("database connected...")
    }
    
})

//define Routes 

app.use('/', require('./Routes/pages'));

app.use('/auth', require('./Routes/auth'));

app.listen(5001, () =>{
    console.log("server started on port 5001")
})