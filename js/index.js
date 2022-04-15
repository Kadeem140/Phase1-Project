//global constants
// const configAPI 
let dlContainer;
let ddContainer;
let dataInput;
let dataList;
let dropDown;






//Event Listeners
document.addEventListener("DOMContentLoaded", () => {

    //once the content loads i want the event listeners to add to their respective elements
    // document.querySelector('#seePokemon')
        // .addEventListener("click", console.log("Hooked up and ready to go G!"))
    ddContainer = document.querySelector("#dropdown-container")
    dlContainer = document.querySelector('#datalist-container')
    dataList = document.querySelector("#names")
    dataInput = document.querySelector("input.names")
    dropDown = document.querySelector("#narrowedDD")
    searchForm = document.querySelector('form.pure-form')
    //event listener to capture dataInput 
    searchForm.addEventListener('submit', function (e) {
        //prevent the normal submission of the form
        e.preventDefault();
        console.log(dataInput.value);  
        fetchPokemon(dataInput.value)
        //API call by name(input.value), if successful render a card to be appended to the DOM
        //if Unsuccessful Alert(That is not a valid pokemon name)   
    });
    fetchApi()
    fetchPokemon("charmander", "fetch Pokemon") 
})

//fetch functions
function fetchApi(){
    return fetch(' https://pokeapi.co/api/v2/pokemon/?limit=151')
    .then(res => res.json())
    .then(pokemon => {
        const pokeArray = pokemon.results
        pokeArray.map(e => {
            console.log(e.name, 'Map Array')
            // maps e.name to be options to append into (dropDown)
        })
    })
}
function fetchPokemon(name){
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then(res => res.json())
    .then(pokemon => {
        
        console.log(pokemon, 'Pokemon here')
        //abilities
        pokemon.abilities.map(e => {
            if(!e.is_hidden){
                console.log(e.ability.name, "Non-hidden")
            }
        })
        //height
         console.log(pokemon.height, "height")
        //weight
        console.log(pokemon.weight, "weight")
        //img
        //sprites.front_default = URL (MAKE IMG element)

        //type
        if(pokemon.types.length > 1){
            const types = pokemon.types
            types.map(e => {
                console.log(e.type.name, "abilities")
            })
        }
        else { console.log(pokemon.types[0].type.name)}
        //Check the length, if length > 1 map over it and render type.name
        //moves (Array) map over and render first 4 moves
        
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }

       function fourMoves(){
           for (i = 0; i < 4; i++){
            console.log(pokemon.moves[getRandomInt(100)].move.name, "moves")
        }
        
    }
    const newBtn = document.createElement('button') 
    newBtn.innerHTML = "New Moves"
    searchForm.append(newBtn)
    



        //stats
        const pokemonStats = pokemon.stats;
        pokemonStats.map(e => {
            //Make card elements here
            console.log(e.stat.name + " = " + e.base_stat)
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


// function addOption(dataList, innertext, value){
//     let option = document.createElement("option")
//         console.log(option, "Logged!")
//     option.innerText = innertext
//     option.value = value
//     dataList.append(option)
// }
// addOption(ddContainer, "fire", 'type')


function toggleBtnSearch(){
    // console.log(event.target.value, "event object")

    if(event.target.value === "type"){
        ddContainer.hidden = false
    }
    else if (event.target.value === "close"){
        ddContainer.hidden = true
    }

    
    if(event.target.value === "name"){
        dlContainer.hidden = false
    }
    else if (event.target.value === "close2"){
        dlContainer.hidden = true
    }
}

function btnSubmit(){
    console.log(event, 'event object')
    event.preventDefault();
}