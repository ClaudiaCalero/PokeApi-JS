const pokemonCard = document.querySelector('[data-pokemon-card]');
const pokemonName = document.querySelector('[data-pokemon-name]');
const pokemonImg = document.querySelector('[data-pokemon-img]');
const pokemonImgContainer = document.querySelector('[data-pokemon-img-container]');
const pokemonId = document.querySelector('[data-pokemon-id]');
const pokemonTypes = document.querySelector('[data-pokemon-types]');
const pokemonStats = document.querySelector('[data-pokemon-stats]');

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    .then(data => data.json())
    .then(response => renderPokemonData(response))
    .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    
    pokemonName.textContent = data.name;
    pokemonImg.setAttribute('src', sprite);
    pokemonId.textContent = `Nº ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);

   }



const renderPokemonTypes = types => {
    pokemonTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = type.type.name;
        pokemonTypes.appendChild(typeTextElement);

    });
}

const renderPokemonStats = stats => {
    pokemonStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokemonStats.appendChild(statElement);
    });
}