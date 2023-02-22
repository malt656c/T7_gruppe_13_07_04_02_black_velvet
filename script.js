/* difinerer hvor dataen skal hentes fra,*/

console.log("start");
const apiUrl = "https://t7gruppe13-9c52.restdb.io/rest/steder";
const urlOptions = {
  headers: {
    "x-apikey": "63eb46a2478852088da6821b",
  },
};
const backupUrl = "steder.json"
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
    respons = await fetch(backupUrl);
    const json = await respons.json();
    console.log("data Hentet");
    vis(json);
  }

}

/* kloner html-skabelon og putter den hentede data i de specificerede elementer */
function vis(json) {
  let template = document.getElementById("place_template").content;
  json.forEach((sted) => {
    /* kloner template */
    const template_clone = template.cloneNode(true);

    /* linker til næste side, med database objektet id for enden af linket*/
    template_clone.querySelector(".se_mere").href = `stedside.html?id=${sted._id}`;
    template_clone.querySelector(".billede_link").href = `stedside.html?id=${sted._id}`;
    template_clone.querySelector("h3 a").href = `stedside.html?id=${sted._id}`;
    /* omdanner navnet på stedet til navnet på billederne, og indsætter billederne hvor de skal være */
    let billedNavn = sted.navn.split(" ");
    let billedNavnDisplay = billedNavn.join("_");
    template_clone.querySelector(".billede_link img").src = `billeder/${sted.category}/${billedNavnDisplay}_1.webp`;
    /* fylder text ud i "ui cards" */
    template_clone.querySelector("h3 a").textContent = sted.navn;
    template_clone.querySelector("address").textContent = sted.adresse;
    /* "poster" informationen til dokumentet */
    document.getElementById(`${sted.category}`).appendChild(template_clone);
    console.log(sted.navn + " appended");
  });
  console.log("done");
}

/* starter data hentningen*/
getData();
