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

funtion init() {
  fetchJSON('data.json', function(data)) {
    document.getElementById('').innerHTML=""
  );
}

window.onload = init;
