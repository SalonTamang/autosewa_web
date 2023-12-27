
//Set up page when window has loaded
window.onload = searchRiders();

let mainContainer = document.querySelector(".container");

function searchRiders(){
    // Get the select element
    var selectElement = document.querySelector('.search-select');

    // Get the value of the selected option
    var station = selectElement.value;

    let drivers = document.querySelector(".driverList");

    //clear the files
    drivers.innerHTML = "";
    let xml = new XMLHttpRequest();
    xml.onload = () =>{
        let response = JSON.parse(xml.responseText);
        // console.log(response);
        if("error" in response){
            mainContainer.innerHTML = response.error;
        } else {     
            //if we get result from database
            for (let index = 0; index < response.length; index++) {
                let driverID = response[index]['id'];
                let firstName = response[index]['firstName'];
                let lastName = response[index]['lastName'];
                let image = response[index]['image'];               

                drivers.innerHTML += "<div class='driver'><div class='driver-image'><img src='images/" + image + ".png' alt='dimg' /></div><div class='driver-info'><h3>" + firstName + " " + lastName + " </h3><p onclick='getDInfo(" + driverID + ")'>View info</p></div></div>";
            }
        }
    }
    var data = {};
    data.station = station;
    xml.open("GET", "/getDrivers");
    xml.setRequestHeader("Content-type", "application/json");
    xml.send(JSON.stringify(data));
}


