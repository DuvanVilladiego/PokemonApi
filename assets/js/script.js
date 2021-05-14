//consumir API
let inicio = 0
const API = (offset) => {
  return `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
}

//consumir API
const getData = (api) => {
  document.getElementById("datosPj").innerHTML = "";
  return fetch(api)
    .then((response) => response.json()) 
    .then((json) => {
      dibujarData(json.results), paginacion();
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};

//consumir API por pokemon
const dibujarData = (data) => {
  data.forEach((pj) => {
    fetch(pj.url)
    .then((response) => response.json())
    .then((json) => {
      pokeinfo(json)
      })
    .catch((error) => {
    console.log("error: ", error);
    });
  });
};

//Dibujar cards
const pokeinfo = (pokemon) => {
  let html =  `
    <div class="col-md-4">
      <div class="card" style="width: 18rem;">
        <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="Imagen de un ${pokemon.name}">
        <div class="card-body">
          <h5 class="card-title">${pokemon.name}</h5>
        </div>
      </div>
    </div>
    `;
    document.getElementById("datosPj").innerHTML += html;
}

//Botones para paginacion
const paginacion = () => {
  let html = 
  `<li class="page-item ${inicio ? 0 : "disabled"}" >
    <a class="page-link" onclick=pageChange("-")>Prev</a>
  </li>
  <li class="page-item" >
    <a class="page-link" onclick=pageChange("+")>Next</a>
  </li>`;
  document.getElementById("paginacion").innerHTML = html;
};  

//Cambio de pagina
const pageChange = (type) => {
  if (type == "+") {
    inicio += 20
  } else {
    inicio -= 20
  }
  getData(API(inicio))
  console.log(inicio)

}

//ejecutar getdata
getData(API(inicio));
