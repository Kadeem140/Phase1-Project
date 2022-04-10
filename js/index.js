//global constants
// const configAPI 
let dlContainer;
let ddContainer;
let dataInput;
let dataList;
let dropDown;






//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    fetchApi()
    fetchPokemon("squirtle") 
    //once the content loads i want the event listeners to add to their respective elements
    document.querySelector('#seePokemon')
        .addEventListener("click", console.log("Hooked up and ready to go G!"))
    ddContainer = document.querySelector("#dropdown-container")
    dlContainer = document.querySelector('#datalist-container')
    dataList = document.querySelector("#names")
    dataInput = document.querySelector("input.drop-down")
    dropDown = document.querySelector("#narrowedDD")
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

// invoked on DOM loaded, search by exercise name click & on dropdown selected
// build & unhide datalist, takes 2 args: exercises from API & key: Name, bp or target
//  set conditional so DL changes with click compares value of event (if click event) to key
//  iterates through API objects to show exercise names or narrowed list of exercise names*/
function buildPokemonDL(pokemon, key){
  let value;
  event ? value = event.target.value : null;
  dlContainer.innerHTML = ""
  dataList.innerHTML = ""
  dlContainer.className = "drop-down"
  dataInput.value = ""
  dataList.id="names"
  dlContainer.append(dataInput, dataList)
  addOption(dataList, 'Select', '')
  //if no key... key is name
  if(key === 'name'){
    dropDown.innerHTML = ""
    dropDown.className = "hide"
    exercises.forEach(exercise => {
      const {name} = exercise
      addOption(dataList, name, name)
    })
  }else{
    exercises.forEach(exercise => {
      const {name} = exercise
      if(exercise[key] === value){
        addOption(dataList, name, name)
      } 
    })
  } 
}


function addOption(dataList, innertext, value){
    let option = document.createElement("option")
    option.innerText = innertext
    option.value = value
    dataList.append(option)
}

addOption(dropDown, "fire", 'type')