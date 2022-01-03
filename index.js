//Con document.querySelector selecciono cada uno de las "data" nombrados en el HTML
// De esta manera selecciono todo y cada uno de los elementos que utilizaré en el "file" de JS
const pokemonCard = document.querySelector('[data-pokemon-card]');
const pokemonName = document.querySelector('[data-pokemon-name]');
const pokemonImg = document.querySelector('[data-pokemon-img]');
const pokemonImgContainer = document.querySelector('[data-pokemon-img-container]');
const pokemonId = document.querySelector('[data-pokemon-id]');
const pokemonTypes = document.querySelector('[data-pokemon-types]');
const pokemonStats = document.querySelector('[data-pokemon-stats]');
const pokemonAbilities = document.querySelector('[data-pokemon-abilities]');

//Primero llamo la funcion "searchPokemon" que es la que se va a llamar en el "onsubmit" del "form" en el momento que se ingrese algo en el "input"
const searchPokemon = event => {
    //Hago esto porque cuando haga un "submit" se envia al form y se hace un nuevo "load" de la página y con "preventDefault" lo evito, se cancela este "submit de form"
    event.preventDefault();
    //event.target.pokemon porque dentro del event tengo un "input" con un "name" al que he llamado "pokemon", que es el valor del input y con eso tendré el "value" de éste
    const { value } = event.target.pokemon;
    //Hago "fetch" de este valor
    // Fetch + el nombre de la Api utilizada + el nombre del Pokemon + "toLowerCase" para así cuando el user ingresa el nombre con mayus se omita y así tener la request
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        //obtengo la respuesta y creo una nueva función a la que llamaré enviandole la response
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    //Obtengo de la data los "sprites", la imagen del pokemon dada por la API
    const sprite = data.sprites.front_default;
    //Utilizaré los "stats" y "types" dados directamente por la "data"
    //Todos los atributos que están en "stats" se guardan en la variable "stats" y todos los que esten en "types" se guardaran en "types"
    const { stats, types, abilities } = data;

    //Con "data.name" se pondrá el "name" que nos venga en la data
    pokemonName.textContent = data.name;
    //Seteo el atributo "src" y utilizaré este "sprite" que es la "URL" que obtuve arriba
    pokemonImg.setAttribute('src', sprite);
    //"textContent" del "nº" y de data cogeremos el "id" del Pokemon
    pokemonId.textContent = `Nº ${data.id}`;
    //Todos estos elementos son los que están arriba con const
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonAbilities(abilities);
    //El proposito de estas dos variables es mostrar el código HTML especificado dentro del elemento HTML especificado. 
    //En el método render (), podemos leer accesorios, declarar y devolver nuestro código JSX a los campos r, casillas de verificación, botones de envío, etc.
}


//Esta función recibe como parametro "types"
const renderPokemonTypes = types => {
    //A los pokemon "types" se le saca el contenido que tengan, así cuando se haga una nueva búsqueda se borrarán los tipos y se actualizarán con los nuevos de esa búsqueda 
    pokemonTypes.innerHTML = '';
    //Por cada uno de los tipos que recibe, puede ser uno o dos, se intengran con los "types.forEach" seleccionando nuestro "type"
    types.forEach(type => {
        //Se crea un elemento al cual le pondremos un "typeTextElement" para crear un div
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        //appendChild insertar un elemento HTML creado con JS, es decir, se inserta el ese "div"
        //si el pokeon tiene un "type" se imprimirá uno y de igual manera si tien dos, se imprimirán dos
        pokemonTypes.appendChild(typeTextElement);

    });
}

//A esta función se le pasan los "stats" como parámetro de la data que se obtiene de la API de pokemon
const renderPokemonStats = stats => {

    pokemonStats.innerHTML = '';
    //Se borra la información de la anterior búsqueda y se iterará en cada "stats" mostrando sólo la nueva información acorde a la nueava búsqueda
    stats.forEach(stat => {
        //statElement para guardar dos elementos dentro
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        //Amount cantidad de la "stat"
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonStats.appendChild(statElement);
    });
}



const renderPokemonAbilities = abilities => {
    pokemonAbilities.innerHTML = '';
    //Por cada uno de los tipos que recibe, puede ser uno o dos, se intengran con los "types.forEach" seleccionando nuestro "type"
    abilities.forEach(ability => {
        //Se crea un elemento al cual le pondremos un "typeTextElement" para crear un div
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = ability.ability.name;
        //appendChild insertar un elemento HTML creado con JS, es decir, se inserta el ese "div"
        //si el pokeon tiene un "type" se imprimirá uno y de igual manera si tien dos, se imprimirán dos
        pokemonAbilities.appendChild(typeTextElement);

    });
}


