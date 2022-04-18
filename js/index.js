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
        if (name){
            pokemon.abilities.map(e => {
                if(!e.is_hidden){
                    console.log(e.ability.name, "Non-hidden")
                }
            })
            //types
            if(pokemon.types.length > 1){
                const types = pokemon.types
                types.map(e => { console.log(e.type.name, "abilities") })
            }
            else { console.log(pokemon.types[0].type.name)}
        }
        else { alert("Please Enter a Pokemon name to get New Moves!")}
        //height
         console.log(pokemon.height, "height")
        //weight
        console.log(pokemon.weight, "weight")
        //img
        //sprites.front_default = URL (MAKE IMG element)
        
        //Check the length, if length > 1 map over it and render type.name
        //moves (Array) map over and render first 4 moves
        
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        //   moves
       function fourMoves(){
           for (i = 0; i < 4; i++){
            console.log(pokemon.moves[getRandomInt(100)].move.name, "moves")
        }
    }
        //stats
        if(name){    
            const pokemonStats = pokemon.stats;
            pokemonStats.map(e => {
                //Make card elements here
                console.log(e.stat.name + " = " + e.base_stat)
            })
        }
        if(name){
            fourMoves()
        }        
            const newBtn = document.createElement('button') 
            newBtn.innerHTML = "New Moves"
            searchForm.append(newBtn)
        
    })
    
}



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
const data = { 
    "abilities": " K",
    "types": " A",
    "height": " D",
    "weight": " E",
    "img": "E " ,
    "moves":" M",
    "stats": " Y"
}
/*POST data from user's form on submit to db.json */
function postPokemonData(data){
    return fetch(`http://localhost:5500/pokedb.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(data)
    })
    .then(response => response.json)
    .then(data => {
        console.log("Success:", data)
    })
    .catch((error) => {
        console.error('Error:', error);
      });
  }

  postPokemonData(data)

  function handleForm(e){ // Change for Pokemon

    // e.preventDefault()
    const exerciseObj = {
      exercise: document.querySelector('#nameInput').innerText,
      bodyPart: document.querySelector('#bpInput').innerText, 
      target: document.querySelector('#targetInput').innerText, 
      equipment: document.querySelector('#equipInput').innerText,
      goals:{
        dis: document.querySelector('#goal-dis').value,
        dur: document.querySelector('#goal-dur').value, 
        reps: document.querySelector('#goal-reps').value,
        weight: document.querySelector('#goal-weight').value, 
        other: document.querySelector('#goal-oth').value, 
        },
    }
}