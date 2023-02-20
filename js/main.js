const pokemonContainer = document.querySelector('.pokemon-container');
const spinner = document.querySelector('#spinner');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

let offset = 1;
let limit = 8;

previous.addEventListener('click', ()=>{
   if(offset != 1){
    offset -= 9;
    removeChildNodes(pokemonContainer);
    serchPokemons(offset, limit);
   }
})

next.addEventListener('click',()=>{
    offset += 9;
    removeChildNodes(pokemonContainer);
    serchPokemons(offset, limit);
})


const fetchPokemon = (id) =>{
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(resp => resp.json())
    .then(data => {
        createPokemon(data);
        spinner.style.display ='none';
    });
}

const serchPokemons = (offset, limit) =>{
    spinner.style.display ='block';
    for(let i = offset; i<= offset + limit; i++){
        fetchPokemon(i);
    }
}

const createPokemon = (pokemon) =>{
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    pokemonContainer.appendChild(card);
}

const removeChildNodes = (parent)=>{
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }

}

serchPokemons(offset, limit);

