document.addEventListener("DOMContentLoaded", () => {
    fetchApi()
    fetchPokemon("squirtle") 
    //once the content loads i want the event listeners to add to their respective elements
    document.querySelector('#seePokemon')
        .addEventListener("click", console.log("Hooked up and ready to go G!"))
})


//fetch functions
function fetchApi(){
    return fetch(' https://pokeapi.co/api/v2/pokemon/?limit=151')
    .then(res => res.json())
    .then(pokemon => {
        console.log(pokemon.results)
        const pokeArray = pokemon.results
        pokeArray.map(e => {
            console.log(e.name, 'Map Array')
        })
        console.log(pokeArray, "Ok")
    })
  
}

function fetchPokemon(name){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => res.json())
    .then(pokemon => {
        
        console.log(pokemon, 'Pokemon here')
        //abilities
        //height
        //weight
        //sprites.front_default = URL (MAKE IMG element)
        //types (Array) map over and render type.name
        //moves (Array) map over and render first 4 moves
        

        const pokemonStats = pokemon.stats;
        pokemonStats.map(e => {
            //Make card elements here
            console.log(e.stat.name + " " + e.base_stat, 'stat')
        })
    })
}

