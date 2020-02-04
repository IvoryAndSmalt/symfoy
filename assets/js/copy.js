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
let selectDomaines = document.querySelector("#domaine");
let selectDepartements = document.querySelector("#departement");
let selectMois = document.querySelector("#mois");
let markers = [];

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx AFFICHAGE CARTE XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

var map = L.map("map").setView([46, 2], 6);
// // création du calque images
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18
}).addTo(map);

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx FETCH XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

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
    // console.log (json[0].fields.departement);

    for (let i = 0; i < json.length; i++) {
      if (
        json[i].geometry != undefined &&
        json[i].fields.nom_de_la_manifestation != undefined &&
        json[i].fields.domaine != undefined &&
        json[i].fields.mois_habituel_de_debut != undefined
      ) {
        lat = json[i].geometry.coordinates[1];
        lon = json[i].geometry.coordinates[0];

        nom = json[i].fields.nom_de_la_manifestation;
        domaine = json[i].fields.domaine;
        mois = json[i].fields.mois_habituel_de_debut;
        function creerMarker (){
             newMarker = L.marker([lat, lon])
          .addTo(map)
          .bindPopup(
            "<strong>" + nom + "</strong>" + "<br/>" + domaine + "<br/>" + mois
          );
        markers.push(newMarker);
        }
        creerMarker();
     
      }
    }
    console.log(markers);

    function onlyUnique(value, index, self) {
      return self.indexOf(value) === index;
    }

    function recupererDomaines() {
      let domaines = [];
      for (var i = 0; i < json.length; i++) {
        domaines.push(json[i].fields.domaine);
      }
      let domainesDistincts = domaines.filter(onlyUnique);
      domainesDistincts.forEach(function(element, key) {
        selectDomaines[key + 1] = new Option(element, element, false, false);
      });
      selectDomaines[0] = new Option("Tous", "Tous", true, true);
    }
    recupererDomaines();

    function recupererDepartements() {
      let departements = [];
      for (var i = 0; i < json.length; i++) {
        departements.push(json[i].fields.departement);
      }
      let departementsDistincts = departements.filter(onlyUnique);
      departementsDistincts.sort();
      departementsDistincts.forEach(function(element, key) {
        selectDepartements[key + 1] = new Option(
          element,
          element,
          false,
          false
        );
      });
      selectDepartements[0] = new Option("Tous", "Tous", true, true);
    }
    recupererDepartements();

    function recupererMois() {
      let listeMois = [];
      for (var i = 0; i < json.length; i++) {
        listeMois.push(json[i].fields.mois_habituel_de_debut);
      }
      let moisDistincts = listeMois.filter(onlyUnique);
      moisDistincts.sort();
      moisDistincts.forEach(function(element, key) {
        selectMois[key + 1] = new Option(element, element, false, false);
      });
      selectMois[0] = new Option("Tous", "Tous", true, true);
    }
    recupererMois();
    const formulaire = document.querySelector("#formulaire");

    function cacherMarqueurs() {
      for (i = 0; i < markers.length; i++) map.removeLayer(markers[i]);
    }

    formulaire.addEventListener("submit", function(e) {
      e.preventDefault();
      cacherMarqueurs();
      for (let i = 0; i < json.length; i++) {
        if (
          json[i].geometry != undefined &&
          json[i].fields.nom_de_la_manifestation != undefined &&
          json[i].fields.domaine != undefined &&
          json[i].fields.mois_habituel_de_debut != undefined &&
          json[i].fields.commune_principale != undefined
        ) {
          lat = json[i].geometry.coordinates[1];
          lon = json[i].geometry.coordinates[0];
          departement = json[i].fields.departement;
          nom = json[i].fields.nom_de_la_manifestation;
          domaine = json[i].fields.domaine;
          commune = json[i].fields.commune_principale;
          mois = json[i].fields.mois_habituel_de_debut;
          if (
            domaine == selectDomaines.value &&
            mois == selectMois.value &&
            selectDepartements.value == "Tous"
          ) {
            newMarker = L.marker([lat, lon])
              .addTo(map)
              .bindPopup(
                "<strong>" +
                  nom +
                  "</strong>" +
                  "<br/>" +
                  domaine +
                  "<br/>" +
                  commune +
                  "<br/>" +
                  mois
              );
            markers.push(newMarker);
          } else if (
            departement == selectDepartements.value &&
            mois == selectMois.value &&
            selectDomaines.value == "Tous"
          ) {
            newMarker = L.marker([lat, lon])
              .addTo(map)
              .bindPopup(
                "<strong>" +
                  nom +
                  "</strong>" +
                  "<br/>" +
                  domaine +
                  "<br/>" +
                  commune +
                  "<br/>" +
                  mois
              );
            markers.push(newMarker);
          } else if (
            departement == selectDepartements.value &&
            domaine == selectDomaines.value &&
            selectMois.value == "Tous"
          ) {
            newMarker = L.marker([lat, lon])
              .addTo(map)
              .bindPopup(
                "<strong>" +
                  nom +
                  "</strong>" +
                  "<br/>" +
                  domaine +
                  "<br/>" +
                  commune +
                  "<br/>" +
                  mois
              );
            markers.push(newMarker);
          } else if (
            departement == selectDepartements.value &&
            domaine == selectDomaines.value &&
            mois == selectMois.value
          ) {
            newMarker = L.marker([lat, lon])
              .addTo(map)
              .bindPopup(
                "<strong>" +
                  nom +
                  "</strong>" +
                  "<br/>" +
                  domaine +
                  "<br/>" +
                  commune +
                  "<br/>" +
                  mois
              );
            markers.push(newMarker);
          } else if (
            departement == selectDepartements.value &&
            selectDomaines.value == "Tous" &&
            selectMois.value == "Tous"
          ) {
            newMarker = L.marker([lat, lon])
              .addTo(map)
              .bindPopup(
                "<strong>" +
                  nom +
                  "</strong>" +
                  "<br/>" +
                  domaine +
                  "<br/>" +
                  commune +
                  "<br/>" +
                  mois
              );
            markers.push(newMarker);
          } else if (
            'Tous' == selectDepartements.value &&
            selectDomaines.value == domaine &&
            selectMois.value == "Tous"
          ) {
            newMarker = L.marker([lat, lon])
              .addTo(map)
              .bindPopup(
                "<strong>" +
                  nom +
                  "</strong>" +
                  "<br/>" +
                  domaine +
                  "<br/>" +
                  commune +
                  "<br/>" +
                  mois
              );
            markers.push(newMarker);
          }else if (
            'Tous' == selectDepartements.value &&
            selectDomaines.value == "Tous" &&
            selectMois.value == mois
          ) {
            newMarker = L.marker([lat, lon])
              .addTo(map)
              .bindPopup(
                "<strong>" +
                  nom +
                  "</strong>" +
                  "<br/>" +
                  domaine +
                  "<br/>" +
                  commune +
                  "<br/>" +
                  mois
              );
            markers.push(newMarker);
          }else if (
            'Tous' == selectDepartements.value &&
            selectDomaines.value == "Tous" &&
            selectMois.value == "Tous"
          ) {
            newMarker = L.marker([lat, lon])
              .addTo(map)
              .bindPopup(
                "<strong>" +
                  nom +
                  "</strong>" +
                  "<br/>" +
                  domaine +
                  "<br/>" +
                  commune +
                  "<br/>" +
                  mois
              );
            markers.push(newMarker);
          }
        }
      }
      //  cacherMarqueurs();
    });
  });
// departement == selectDepartements.value  && domaine == selectDomaines.value && mois == selectMois.value) {

//                 newMarker = L.marker([lat, lon])
//                   .addTo(map)
//                   .bindPopup(
//                     "<strong>" +
//                       nom +
//                       "</strong>" +
//                       "<br/>" +
//                       domaine +
//                       "<br/>" +
//                       commune +
//                       "<br/>" +
//                       mois
//                   );
//                 markers.push(newMarker);
