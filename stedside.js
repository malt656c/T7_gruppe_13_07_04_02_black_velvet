/* difinerer hvor dataen skal hentes fra,*/
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

/* google maps link, klar til at indsætte adresse */
const mapsUrl = "https://www.google.dk/maps/place/";
/* henter dataen fra det specificerede link */
async function getData() {
  let respons;
  try{
  respons = await fetch(apiUrl, urlOptions);
  const json = await respons.json();
  console.log("data Hentet");
  vis(json);
  }catch (error){
    console.log(error)
  }
  if(respons?.ok){
    console.log("respons virker")
  }else{
    const backupUrl = "steder.json";
    respons = await fetch(backupUrl);
    const json = await respons.json();
backupId = json.filter(sted => sted._id == id)[0];
console.log(backupId)
vis(backupId)
}
}
/* kloner html-skabelon og putter den hentede data i */
function vis(json) {
  /* laver url addresse til google maps */
  let arr = json.adresse.split(" ");
  let urladr = arr.join("+");
  document.querySelector(".maps").href = mapsUrl + urladr;
  document.querySelector(".adresse").textContent = json.adresse;
  /* "poster" informationen til dokumentet */
  document.querySelector("title").textContent = json.navn;
  document.querySelector(".navn").textContent = json.navn;
  /* indsætter beskrivelse fra databasen, hvis der ikke er beskrivelse, indsætter den lorem ipsum tekst */
  if(json.beskrivelse == ""){
console.log("beskrivelse tom")
  }else{
      document.querySelector(".description").textContent = json.beskrivelse;
  }
  console.log(json.beskrivelse)
document.querySelector(".website").href = json.link;

  console.log(json.navn + " loaded");
    /* omdanner navnet på stedet til navnet på billederne, og indsætter billederne hvor de skal være */
  let billedNavn = json.navn.split(" ");
  let billedNavnDisplay = billedNavn.join("_");
  document.querySelector("section img").src = `billeder/${json.category}/${billedNavnDisplay}_1.webp`;
}
/* starter med at hente data */
getData();
