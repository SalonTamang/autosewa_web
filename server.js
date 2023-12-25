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

const dummyData = [
    {
      "id": 1,
      "name": "John Doe",
      "age": 28,
      "phoneNumber": "1234567890"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "age": 32,
      "phoneNumber": "9876543210"
    },
    {
      "id": 3,
      "name": "Michael Johnson",
      "age": 45,
      "phoneNumber": "5555555555"
    },
    // Add more objects here with different values
    {
      "id": 4,
      "name": "Emily Davis",
      "age": 22,
      "phoneNumber": "4444444444"
    },
    {
      "id": 5,
      "name": "Robert Wilson",
      "age": 37,
      "phoneNumber": "7777777777"
    },
    {
      "id": 6,
      "name": "Sophia Brown",
      "age": 19,
      "phoneNumber": "6666666666"
    },
    {
      "id": 7,
      "name": "William Taylor",
      "age": 50,
      "phoneNumber": "2222222222"
    },
    {
      "id": 8,
      "name": "Olivia Anderson",
      "age": 27,
      "phoneNumber": "8888888888"
    },
    {
      "id": 9,
      "name": "James Martinez",
      "age": 33,
      "phoneNumber": "9999999999"
    },
    {
      "id": 10,
      "name": "Ava Clark",
      "age": 41,
      "phoneNumber": "3333333333"
    }
]
// Path: public/login.html
app.get("/getData", (req,res)=>{
    res.json(dummyData)
})
