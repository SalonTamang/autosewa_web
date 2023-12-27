const express = require('express');
const mysql = require('mysql');
var morgan = require("morgan");
var path = require("path");
const faker = require("faker");

// Create a connection to the database
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'meroauto',
    port: 3306
});

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

// response with limited number of rider, Pagination
// search the driver in the particular station
app.get("/getDrivers", (req,res)=>{
  var sql;
  var limit = 15;
  var pageNumber = req.query.page || 1; //page send from the url eg. localhost:3000/getDrivers?station=buddasubba&pageNumber=1
  var offset = (pageNumber-1) * limit;
  var station = req.query.station || "all";
  station = station.toLowerCase();

  if(station == "all"){
    sql = `SELECT * FROM riders 
    LIMIT ${limit} OFFSET ${offset} `;
  }else{
    sql = "SELECT * FROM riders WHERE station = '" + station + "' "+
    ` LIMIT ${limit} OFFSET ${offset}`;
  }
  connection.query(sql, (err, result) =>{
      if(err){
          return res.status(500).send('{"message": false, "error": "' +
          JSON.stringify(err) + '"}');
      } else{
          res.send(result);
      }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get("/getAllDrivers", (req,res)=>{
  let sql = "SELECT * FROM riders";
  connection.query(sql, (err, result) =>{
      if(err){
          return res.status(500).send('{"message": false, "error": "' +
          JSON.stringify(err) + '"}');
      } else{
          res.send(result);
      }
  });
   
});


//register drivers based on their data
app.post("/registerRider", (req,res)=> {
  
  // let firstName = req.query.firstName;
  // let lastName = req.query.lastName;
  // let phoneNumber = req.query.phoneNumber;
  // let password = req.query.password;
  // let autoNumber = req.query.autoNumber;
  // let image = req.query.image;
  // let station = req.query.station;


  function getRandomStation() {
    const stations = ["padam pokhari", "chauda", "buddha chowk", "kamane", "karra"];
    const randomIndex = Math.floor(Math.random() * stations.length);
    return stations[randomIndex];
  }
  
  // Generate and insert 100 unique records
  for (let i = 0; i < 100; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phoneNumber = faker.phone.phoneNumber();
    const password = faker.internet.password();
    const autoNumber = faker.vehicle.vin();
    const image = faker.image.avatar();
    const station = getRandomStation();
  
    const sql = "INSERT INTO riders (firstName, lastName, phoneNumber, password, autoNumber, image, station) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [firstName, lastName, phoneNumber, password, autoNumber, image, station];
  
    connection.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
      } else {
        console.log('Data inserted successfully:', result);
      }
    });
  }

});


