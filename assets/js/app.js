/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// any CSS you import will output into a single css file (app.css in this case)
// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';
let selectDomaines = document.querySelector("#domaine");
let selectDepartements = document.querySelector("#departement");
let selectMois = document.querySelector("#mois");
let markers = [];
const message = document.querySelector("#message");

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx AFFICHAGE CARTE XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

var map = L.map("map", {
  gestureHandling: true,
  maxZoom: 15,
  minZoom: 1
}).setView([46.7, 2], 6);
// // création du calque images
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {}).addTo(
  map
);

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
    function creerMarker() {
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
            lien
        );
      markers.push(newMarker);
    }
    // for (let i = 0; i < json.length; i++) {
    //   if (
    //     json[i].geometry != undefined &&
    //     json[i].fields.nom_de_la_manifestation != undefined &&
    //     json[i].fields.domaine != undefined &&
    //     json[i].fields.commune_principale != undefined &&
    //     json[i].fields.mois_habituel_de_debut != undefined
    //   ) {
    //     lat = json[i].geometry.coordinates[1];
    //     lon = json[i].geometry.coordinates[0];
    //     lien="<p>N'a pas de site</p>";
    //     if (json[i].fields.site_web !== undefined) {
    //       lien = "<br/><a target='_blank' href='"+ json[i].fields.site_web +"'>"+json[i].fields.site_web+"</a>"
    //     }
    //     nom = json[i].fields.nom_de_la_manifestation;
    //     domaine = json[i].fields.domaine;
    //     mois = json[i].fields.mois_habituel_de_debut;
    //    commune = json[i].fields.commune_principale;
    //     creerMarker();
    //   }
    // }

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
      selectDomaines[0] = new Option("Tous les domaines", "Tous", true, true);
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
      selectDepartements[0] = new Option(
        "Sur toute la france",
        "Tous",
        true,
        true
      );
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
      selectMois[0] = new Option("Toute l'année", "Tous", true, true);
    }
    recupererMois();
    const formulaire = document.querySelector("#formulaire");

    function cacherMarqueurs() {
      for (i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
      }
      markers = [];
    }

    formulaire.addEventListener("submit", function(e) {
      e.preventDefault();
      cacherMarqueurs();
      document.querySelector("#popup").classList.add("opaque");
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
          lien = "<p>Site non renseigné</p>";
          if (json[i].fields.site_web !== undefined) {
            lien =
              "<br/><a target='_blank' href='" +
              json[i].fields.site_web +
              "'>" +
              json[i].fields.site_web +
              "</a>";
          }

          if (
            domaine == selectDomaines.value &&
            mois == selectMois.value &&
            selectDepartements.value == "Tous"
          ) {
            creerMarker();
            map.flyTo([46.7, 2], 6);
          } else if (
            departement == selectDepartements.value &&
            mois == selectMois.value &&
            selectDomaines.value == "Tous"
          ) {
            creerMarker();
            map.flyTo([lat, lon], 8);
          } else if (
            departement == selectDepartements.value &&
            domaine == selectDomaines.value &&
            selectMois.value == "Tous"
          ) {
            creerMarker();
            map.flyTo([lat, lon], 8);
          } else if (
            departement == selectDepartements.value &&
            domaine == selectDomaines.value &&
            mois == selectMois.value
          ) {
            creerMarker();
            map.flyTo([lat, lon], 8);
          } else if (
            departement == selectDepartements.value &&
            selectDomaines.value == "Tous" &&
            selectMois.value == "Tous"
          ) {
            creerMarker();
            map.flyTo([lat, lon], 8);
          } else if (
            "Tous" == selectDepartements.value &&
            selectDomaines.value == domaine &&
            selectMois.value == "Tous"
          ) {
            creerMarker();
            map.flyTo([46.7, 2], 6);
          } else if (
            "Tous" == selectDepartements.value &&
            selectDomaines.value == "Tous" &&
            selectMois.value == mois
          ) {
            creerMarker();
            map.flyTo([46.7, 2], 6);
          } else if (
            "Tous" == selectDepartements.value &&
            selectDomaines.value == "Tous" &&
            selectMois.value == "Tous"
          ) {
            creerMarker();
            map.flyTo([46.7, 2], 6);
          }
          if (window.innerWidth < 600) {
            document.querySelector("#message").scrollIntoView({
              behavior: "smooth"
            });
          }
        }
      }
      if (markers.length == 0) {
        message.innerHTML = "Aucun résultat ne correspond à votre recherche !";
      } else if (markers.length == 1) {
        message.innerHTML =
          markers.length + " résultat correspond à votre recherche";
      } else if (markers.length > 1) {
        message.innerHTML =
          markers.length + " résultats correspondent à votre recherche";
      }
      //  TESTER ICI LA LONGUEUR DE MARKERS
      //  ICI ON PEUT DIRE A L'UTILISATEUR QU'IL N4Y A AUCUN RESULTAT
      console.log(markers.length);
    });
    document.querySelector("#loader").classList.add("cache");
  });

document.addEventListener("keydown", function(e) {
  if (e.keyCode === 17) {
    document.querySelector("#popup").classList.add("opaque");
  }
});

mybutton = document.querySelector("#fleche");
window.addEventListener("scroll", function() {
  if (document.documentElement.scrollTop > 300) {
    mybutton.style.bottom = "30px";
  } else {
    mybutton.style.bottom = "-120px";
  }
});

mybutton.addEventListener("click", function() {
  document.querySelector("#titre").scrollIntoView({
    behavior: "smooth"
  });
})