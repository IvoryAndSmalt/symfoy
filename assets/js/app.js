/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)


// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

console.log('Salut');

var map = L.map('map').setView([46, 2], 7);
// // création du calque images
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
// // ajout d'un markeur
L.marker([46, 2]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.');
    // .openPopup();
    
    fetch('map.php', {
        method: 'GET', // or 'PUT'
        cors: 'no-cors',
        headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
        }
        })
        .then((responseFesti) => {
        return responseFesti.json();
        })
        .then((myJsonFesti) => {
        let myNewJsonFesti = JSON.parse(myJsonFesti);
        
        });


    // fetch('/home', {
    //     method: 'GET', // or 'PUT'
    //     headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //     }
    //     })
    //     .then((responseFesti) => {
    //     return responseFesti.json();
    //     })
    //     .then((myJsonFesti) => {
    //     let myNewJsonFesti = JSON.parse(myJsonFesti);
    //         console.log(myNewJsonFesti);
            
    //     // let baseFesti = myNewJsonFesti['records'];
            
    //     //     for (let index = 0; index < baseFesti.length; index++) {
    //     //     const element = baseFesti[index]['fields'];
            
    //     //     let position = element["geo_point"]
    //     //}
    //     });

