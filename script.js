/* hente data og difinér*/

console.log("start");
const apiUrl = "https://t7gruppe13-9c52.restdb.io/rest/steder";
const urlOptions = {
  headers: {
    "x-apikey": "63eb46a2478852088da6821b",
  },
};

const backupData = "steder.json";

const mapsUrl = "https://www.google.dk/maps/place/";

async function getData() {
/*   const respons = await fetch(apiUrl, urlOptions); */
const respons = await fetch(backupData);
  const json = await respons.json();
  console.log("data Hentet");
  vis(json);
}

/* klone html-skabelon og putte den hentede data i */
function vis(json) {
  let template = document.getElementById("place_template").content;
  json.forEach((sted) => {
    /* klone template */
    const template_clone = template.cloneNode(true);

    /* linker til stedside */
    template_clone.querySelector(".se_mere").href = `stedside.html?id=${sted._id}`;
        template_clone.querySelector(".billede_link").href = `stedside.html?id=${sted._id}`;

    template_clone.querySelector("h3 a").href = `stedside.html?id=${sted._id}`;
/* billeder */
let billedNavn = sted.navn.split(" ");
let billedNavnDisplay = billedNavn.join("_");
template_clone.querySelector(".billede_link img").src = `billeder/${sted.category}/${billedNavnDisplay}_1.webp`;
    /* fylder text ud */
    template_clone.querySelector("h3 a").textContent = sted.navn;
    template_clone.querySelector("address").textContent = sted.adresse;

    /* laver rating om til stjerner */

    /* "poster" informationen til dokumentet */
    document.getElementById(`${sted.category}`).appendChild(template_clone);
    console.log(sted.navn + " appended");
  });
  console.log("done");
}

/* starter med at hente data */
getData();
