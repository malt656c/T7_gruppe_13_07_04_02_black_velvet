/* hente data og difinér*/
const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get("id");
console.log("start", id);
const apiUrl = `https://t7gruppe13-9c52.restdb.io/rest/steder/${id}`;
console.log(apiUrl);
const urlOptions = {
  headers: {
    "x-apikey": "63eb46a2478852088da6821b",
  },
};

const mapsUrl = "https://www.google.dk/maps/place/";

async function getData() {
  const respons = await fetch(apiUrl, urlOptions);
  const json = await respons.json();
  console.log("data Hentet");
  vis(json);
}

/* klone html-skabelon og putte den hentede data i */
function vis(json) {
  /* laver url addresse til google maps */
  let arr = json.adresse.split(" ");
  let urladr = arr.join("+");
  document.querySelector(".maps").href = mapsUrl + urladr;
  document.querySelector(".adresse").textContent = json.adresse;
  /* "poster" informationen til dokumentet */
  document.querySelector("title").textContent = json.navn;
  document.querySelector(".navn").textContent = json.navn;
  if(json.beskrivelse == ""){
console.log("beskrivelse tom")
  }else{
      document.querySelector(".description").textContent = json.beskrivelse;
  }
  console.log(json.beskrivelse)
document.querySelector(".website").href = json.link;

  console.log(json.navn + " loaded");

  let billedNavn = json.navn.split(" ");
  let billedNavnDisplay = billedNavn.join("_");
  document.querySelector("section img").src = `billeder/${json.category}/${billedNavnDisplay}_1.webp`;
  /* rating system */
/*   document.querySelector(".rating").innerHTML = "<span>" + "★".repeat(json.rating) + "</span>" + "<span>" + "★".repeat(5 - json.rating) + "</span>" + ` ${json.rating}/5`;
  document.querySelector(".rating").textContent = json.rating + "/5";
  console.log("done"); */
}

/* starter med at hente data */
getData();
