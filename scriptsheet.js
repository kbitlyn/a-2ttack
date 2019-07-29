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
  fetchJSON('doctors.json', function(data) {
    console.log(data.data[0].name)
    // console.log(data.data[0].lat)
    // console.log(data.data[0].lon)
    console.log(data.data[0].visit_address.lat)
    console.log(data.data[0].visit_address.lon)
    console.log(data.data[0].visit_address.street)
    console.log(data.data[0].visit_address.zip)
    console.log(data.data[0].phones[1].number)
    console.log(data.data[0].total_doctors)
    console.log(data.data[0].doctors[0].profile.first_name)
    console.log(data.data[0].doctors[0].profile.last_name)
    console.log(data.data[0].doctors[0].profile.bio)

    // for (var i = 0; i < data.data.length; i++) {
    //   // var stressAlways =
    // }
    // document.getElementById('').innerHTML=""
  });
}

window.onload = init;
