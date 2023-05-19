// création d'un tableau des pays (unique) contenu sur cette merveilleuse api météo

const pays = new Array();
var i = 0;
do {
  if (pays.length <= 0) {
    pays.push(datajson[i].country);
  } else if (!pays.includes(datajson[i].country)) {
    pays.push(datajson[i].country);
  }
  i++;
} while (datajson[i]);

// Pour tester ce code tout aussi merveilleux
//console.log(pays);

// création d'un tableau des villes (unique) contenu sur cette merveilleuse api météo

// const villes = new Array();
// var i = 0;
// do {
//   if (villes.length <= 0) {
//     villes.push(datajson[i].name.toLowerCase());
//   } else if (!villes.includes(datajson[i].name.toLowerCase())) {
//     villes.push(datajson[i].name.toLowerCase());
//   }
//   i++;
// } while (datajson[i]);

const villes = new Array(
  ...new Set(Object.entries(datajson).map((x) => x[1].name.toLowerCase()))
);
// for(let i=0; i< Object.entries(datajson).length-1; i++){
//   if (!villes.includes(datajson[i].name.toLowerCase())) {
//     villes.push(datajson[i].name.toLowerCase());
//   }
// };

// Pour tester ce code tout aussi merveilleux
// console.log(villes);

let requestURL = "https://www.prevision-meteo.ch/services/json/";

let inputUser = document.querySelector("input");
let btn = document.querySelector("button");
let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  metebas();
});

// btn.addEventListener("click", () => {
//  // metebas();
// });

function metebas() {
  let town = inputUser.value;
  if (villes.includes(town.toLowerCase())) {
    let goodURL = requestURL + town;
    // requestURL += town;
    // <=>
    // requestURL = requestURL + town;

    fetch(goodURL)
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        const { city_info, current_condition } = data;
        console.log(current_condition);
        // let cond;
        // if(current_condition.condition_key == "ensoleille"){
        //     cond = "<img src=\"./ressources/soleil.png\" alt=\"\" class=\"iconMeteo\">";
        //    // console.log(cond);
        // }
        // else if(current_condition.condition_key == "pluvieux"){
        //     cond = "<img src=\"./ressources/soleil.png\" alt=\"\" class=\"iconMeteo\">";
        // }else if(current_condition.condition_key == "orage"){
        //     cond = "<img src=\"./ressources/soleil.png\" alt=\"\" class=\"iconMeteo\">";
        // }
        // else if(current_condition.condition_key == "nuageux"){
        //     cond = "<img src=\"./ressources/soleil.png\" alt=\"\" class=\"iconMeteo\">";
        // }
        // else {
        //     cond = "<img src=\"./ressources/nuage.png\" alt=\"\" class=\"iconMeteo\">";
        // }
        document.getElementById(
          "afficheMeteo"
        ).innerHTML = `<h2>${city_info.name}</h2>
            <img src="${current_condition.icon_big}" width="200px;">
            <p>${current_condition.tmp}°c</p>`;
      });
    document.getElementById("afficheMeteo").style.display = "flex";
  } else {
    alert("Votre ville n'est pas dans notre base, retentez votre chance :)");
    inputUser.value = "";
  }
}
// ajouter temperatures des jours suivants !
