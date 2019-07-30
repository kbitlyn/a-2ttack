// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
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

function getLocation() {
  var x = document.getElementById("demo");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var x = document.getElementById("demo");
  var lat = position.coords.latitude;
  var lon = position.coords.longitude;
  console.log("Latitude #{lat} Longitude #{lon}");
  findOffices(lat,lon);
}

function findOffices(latitude,longitude) {
  var path = "https://api.betterdoctor.com/2016-03-01/practices?name=mental%20health&sort=full-name-asc&skip=0&limit=4&user_key=ec9d4f25fb4c4d5b47225096d639bca0&user_location=#{latitude},#{longitude}&location=#{latitude},#{longitude},50"
  fetchJSON(path, function(data) {

    for (var i = 0; i < data.data.length; i++) {
      var columnDiv = document.createElement("div");
      columnDiv.className = "column";

      var cardDiv = document.createElement("div");
      cardDiv.className = "card";

      var nameOffice = document.createElement("h3");
      nameOffice.id = "nameOffice";
      nameOffice.innerHTML = data.data[i].name;
      cardDiv.appendChild(nameOffice);

      var addressOffice = document.createElement("p");
      addressOffice.id = "addressOffice";
      addressOffice.innerHTML = (data.data[i].visit_address.street + ", " + data.data[i].visit_address.city + " " + data.data[i].visit_address.zip);
      cardDiv.appendChild(addressOffice);

      var phoneNumber = document.createElement("p");
      phoneNumber.id = "phoneNumber";
      phoneNumber.innerHTML = data.data[i].phones[1].number;
      cardDiv.appendChild(phoneNumber);

      var doctorRec = document.createElement("p");
      doctorRec.id = "doctorRec";
      doctorRec.innerHTML = (data.data[i].doctors[0].profile.first_name + " " + data.data[i].doctors[0].profile.last_name + " " + data.data[i].doctors[0].specialties[0].actor);
      cardDiv.appendChild(doctorRec);

      columnDiv.appendChild(cardDiv);
      document.getElementById("doctorOffices").appendChild(columnDiv);
    }
  });
}

function initMap() {
  var map;

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 8
  });
}

function init() {

}

window.onload = init;
