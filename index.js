
function search () {
    const value = document.getElementById('search').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        document.getElementById('image').src = data.sprites.front_default
        document.getElementById('name').innerHTML = data.name
        document.getElementById('types').innerHTML = data.types.map(type => type.type.name).join(', ')
        document.getElementById('abilities').innerHTML = data.abilities.map(ability => ability.ability.name).join(', ')
        document.getElementById('hp').innerHTML = data.stats[0].base_stat
        document.getElementById('attack').innerHTML = data.stats[1].base_stat
        document.getElementById('defense').innerHTML = data.stats[2].base_stat
        document.getElementById('special-attack').innerHTML = data.stats[3].base_stat
        document.getElementById('special-defense').innerHTML = data.stats[4].base_stat
        document.getElementById('speed').innerHTML = data.stats[5].base_stat
      })
  }