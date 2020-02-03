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

var map = L.map("map").setView([46, 2], 6);
// // création du calque images
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
 
    maxZoom :18
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

      if (json[i].fields.domaine=="Musiques actuelles"){ 
        lat = json[i].fields.coordonnees_insee[0];
        lon = json[i].fields.coordonnees_insee[1];
        nom = json[i].fields.nom_de_la_manifestation;
        domaine = json[i].fields.domaine;
        mois = json[i].fields.mois_habituel_de_debut;
        console.log(lat,lon);   
        L.marker([lat, lon])
        .addTo(map)
         .bindPopup('<strong>'+nom+'</strong>' + '<br/>' + domaine  + '<br/>' + mois); 
         
        
    }
});

                // let select = document.getElementById ("list");
                // for(var i=0;i<json.length;i++){
                //         let newOption = new Option (json[i].fields.domaine);
                //         select.options.add (newOption);
                // }
                // console.log(json[i].id);
                // console.log(json[i].length);


  