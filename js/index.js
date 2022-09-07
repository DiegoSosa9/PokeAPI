const jsonData = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';
//Obtener JSON de la API
async function getJSONData(array){
    try {
        let respuesta = await fetch(array);
        if (respuesta.ok){
            let data = await respuesta.json();
            // console.log(data);
            return data;
        }
    } catch (error) {
        console.log(error);
    }
    
    
}
//Funcion de mostrar los elementos del array
function showList(array, criterio){
    const arreglo = array;
    console.log(arreglo);
    let listado = "";
    if (criterio == '1'){
        for (let i = 0; i < arreglo.length; i++) {
            let nombreMayu = array[i].name
            listado += `
            <div class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-2">
                    <img src="${array[i].sprites.front_default}" alt="https://dummyimage.com/300x204/" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${nombreMayu.toUpperCase()}</h4>
                        <small class="text-muted">Base experience: ${array[i].base_experience}</small>
                    </div>
                    <p class="mb-1">
                        Height: ${array[i].height}
                    </p>
                    <p class="mb-1">
                    Weight: ${array[i].weight}
                    </p>
                </div>
            </div>
        </div>
            `;
        }
    }
    if (criterio == '2'){
        listado = `<div class="row row-cols-1 row-cols-md-4 g-4">`
        for (let i = 0; i < arreglo.length; i++) {
            let nombreMayu = array[i].name
            listado += `
                <div class="col">
                    <div class="card h-100">
                    <img src="${array[i].sprites.front_default}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${nombreMayu.toUpperCase()}</h5>
                        <p class="card-text">Height: ${array[i].height}</p>
                        <p class="card-text">Weight: ${array[i].weight}</p>
                        <p class="card-text">Base experience: ${array[i].base_experience}</p>
                    </div>
                    </div>
                </div>
            `;
        }
        listado += `</div>`
    }
    const listPoke = document.querySelector("#list-pokemones");
    listPoke.innerHTML = '';
    listPoke.innerHTML += listado;
}
//Funcion para ordenar los elementos del array
function sortArray(array, criterio){
    let result = [];
    const arrayList = array;
    if(criterio == '1'){
        result = arrayList.sort(function (a,b){
            if (a.name > b.name) {return 1}
            if (a.name < b.name) {return -1}
            return 0;
        })
    }
    if(criterio == '2'){
        result = arrayList.sort(function (a,b){
            if (a.name > b.name) {return -1}
            if (a.name < b.name) {return 1}
            return 0;
        })
    }
    return result;
}
//Cuando cargue el DOM
document.addEventListener('DOMContentLoaded', async () => {
    const arrayOriginal = await getJSONData(jsonData);
    const arraySecundario = arrayOriginal.results;
    console.log(arraySecundario);
    let macacos = [];
    for (let i = 0; i < arraySecundario.length; i++) {
        macacos.push(await getJSONData(arraySecundario[i].url))
    }
    showList(macacos, '1');

    document.getElementById('sortAsc').addEventListener('click', function(){
        let arrayOrdenado = sortArray(macacos, '1');
        showList(arrayOrdenado, '1');
    })
    document.getElementById('sortDesc').addEventListener('click', function(){
        let arrayOrdenado = sortArray(macacos, '2');
        showList(arrayOrdenado, '1');
    })

    document.getElementById('lista').addEventListener('click', function(){
        showList(macacos, '1');
    })
    document.getElementById('cuadricula').addEventListener('click', function(){
        showList(macacos, '2');
    })
    document.getElementById('searchPoke').addEventListener('keyup', function(){
        const valor = document.getElementById('searchPoke').value;
        const busqueda = macacos.filter (element => {
            return element.name.toLowerCase().indexOf(valor.toLowerCase()) > -1;
        })
        showList(busqueda,'1');
    })
    document.getElementById('limpiar').addEventListener('click',function(){
        document.getElementById('searchPoke').value = '';
        showList(macacos,'1');
    })
})