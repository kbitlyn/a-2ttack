// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction();};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

//When user loads page, disappear
function toggleInfo() {
  var showCredits = document.getElementById("creditsBody");
  if (showCredits.style.display === "block") {
    showCredits.style.display = "none";
  } else {
    //if body is hidden and about is clicked, show body
    showCredits.style.display = "block";
    // when about is clicked, scroll to view about body
    var showCreditsEverything = document.getElementById("creditsBody");
    showCreditsEverything.scrollIntoView();
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function fetchJSON(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange= function() {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            var data = JSON.parse(httpRequest.responseText);
            if (callback) callback(data);
        }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();

}

//get's the geolocation of user
function getLocation() {
  var x = document.getElementById("demo");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

//stores geolocation into variables and passes them as parameters for findOffices()
function showPosition(position) {
  var x = document.getElementById("demo");
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  findOffices(lat,lon);
}

//uses the betterdoctor api to find 4 doctor offices within a 50 mi radius of user
function findOffices(latitude,longitude) {
  var location = "&location=" + latitude.toString() + "," + longitude.toString() + ",50";
  var userLocation = "&user_location=" + latitude.toString() + "," + longitude.toString();
  var path = "https://api.betterdoctor.com/2016-03-01/practices?name=mental%20health&sort=full-name-asc&skip=0&limit=4&user_key=ec9d4f25fb4c4d5b47225096d639bca0" + location + userLocation;
  fetchJSON(path, function(data) {

    for (var i = 0; i < data.data.length; i++) {
      //creates div class column
      var columnDiv = document.createElement("div");
      columnDiv.className = "column";

      //creates div class card
      var cardDiv = document.createElement("div");
      cardDiv.className = "card";

      //creates and stores id/header for office name
      var nameOffice = document.createElement("h3");
      nameOffice.id = "nameOffice";
      nameOffice.innerHTML = data.data[i].name;
      cardDiv.appendChild(nameOffice);

      //creates and stores id/header for address, city, zip
      var addressOffice = document.createElement("p");
      addressOffice.id = "addressOffice";
      addressOffice.innerHTML = (data.data[i].visit_address.street + ", " + data.data[i].visit_address.city + " " + data.data[i].visit_address.zip);
      cardDiv.appendChild(addressOffice);

      //creates and stores id/header for office landline
      var phoneNumber = document.createElement("p");
      phoneNumber.id = "phoneNumber";
      phoneNumber.innerHTML = data.data[i].phones[1].number;
      cardDiv.appendChild(phoneNumber);

      //checks if there's more than one doctor in the office
      //creates and stores id/header for doctor's First Name, Last Name, and specialty
      if (data.data[i].total_doctors > 1) {
        for (var j = 0; j < data.data[i].total_doctors; j++) {
          console.log(data.data[i].doctors[j].profile);
          var doctorRec = document.createElement("p");
          doctorRec.className = "doctorRec";
          doctorRec.innerHTML = (data.data[i].doctors[j].profile.first_name + " " + data.data[i].doctors[j].profile.last_name + " " + data.data[i].doctors[j].specialties[0].actor);
          cardDiv.appendChild(doctorRec);
        }
      } else {
        //if only one doctor, then print first doctor of the doctor list
        var doctorRec = document.createElement("p");
        doctorRec.className = "doctorRec";
        doctorRec.innerHTML = (data.data[i].doctors[0].profile.first_name + " " + data.data[i].doctors[0].profile.last_name + " " + data.data[i].doctors[0].specialties[0].actor);
        cardDiv.appendChild(doctorRec);
      }

      //adds all of office names, address, phone number, and doctors into their own card
      columnDiv.appendChild(cardDiv);
      document.getElementById("doctorOffices").appendChild(columnDiv);

      //only allows the user to click the find nearby clinics once
      document.getElementById("findHelpButton").disabled = true;
      var showClinics = document.getElementById("map");
      showClinics.scrollIntoView();
    }
  });
}
