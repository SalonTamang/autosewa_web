const express = require('express');
const mysql = require('mysql');
var morgan = require("morgan");
var path = require("path");

// Create a connection to the database
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'your_username',
//     password: 'your_password',
//     database: 'your_database'
// });

// Connect to the database
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the database');
// });

// Create an Express application
const app = express();

// Define routes and middleware here
app.use(morgan("short"));
var staticPath = path.join(__dirname, "public");
app.use(express.static(staticPath));

//define homepage route
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Path: public/login.html
