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

function initMap() {
  var options = {
    zoom: 8,
    center:{lat:42.3601, lng:-71.0589}
  }

  var map = new
  google.maps.Map(document.getElementById('map'), options);



}

function init() {
  initMap();
  fetchJSON('doctors.json', function(data) {

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

      console.log(document.getElementById("doctorOffices"));
    }





  });
}

window.onload = init;
