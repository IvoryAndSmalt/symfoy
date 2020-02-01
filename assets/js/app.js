/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log("Salut");

var map = L.map("map").setView([46, 2], 7);
// // création du calque images
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// // ajout d'un markeur
L.marker([46, 2])
  .addTo(map)
  .bindPopup("A pretty CSS3 popup.<br> Easily customizable.");
// .openPopup();



fetch("/curl", {
  method: "GET", // or 'PUT'
  // cors: 'no-cors',
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
})
  .then(responseFesti => {
    return responseFesti.json();
  })
  .then(function(json) {
    console.log (json[0].fields.departement);
    

    for (let i = 0; i < json.length; i++) {
        lat = json[i].fields.coordonnees_insee[0];
        lon = json[i].fields.coordonnees_insee[1];
        nom = json[i].fields.nom_de_la_manifestation;
        console.log(lat,lon);   
        L.marker([lat, lon])
        .addTo(map)
         .bindPopup(nom); 
        
    }
});



  