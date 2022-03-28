document.addEventListener("DOMContentLoaded", () => {
    fetchApi()
    fetchPokemon()
    //once the content loads i want the event listeners to add to their respective elements
    document.querySelector('#seePokemon')
        .addEventListener("click", console.log("Hooked up and ready to go G!"))
})


//fetch functions
function fetchApi(){
    return fetch(' https://pokeapi.co/api/v2/pokemon/?limit=151')
    .then(res => res.json())
    .then(pokemon => console.log(pokemon.results))
}

function fetchPokemon(){
    return fetch(' https://pokeapi.co/api/v2/pokemon/charmander')
    .then(res => res.json())
    .then(pokemon => console.log(pokemon.results))
}

