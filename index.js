//global constants
// const configAPI 
let dlContainer;
let ddContainer;
let dataInput;
let dataList;
let dropDown;


//Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    //once the content loads i want the event listeners to add to their respective element.
    ddContainer = document.querySelector("#dropdown-container")
    dlContainer = document.querySelector('#datalist-container')
    dataList = document.querySelector("#names")
    dataInput = document.querySelector("input.names")
    dropDown = document.querySelector("#narrowedDD")
    searchForm = document.querySelector('form.pure-form')
    teamOneButton = document.querySelector('#team-1-btn')
    teamTwoButton = document.querySelector('#team-2-btn')
    teamOneSection = document.querySelector('#team-1')
    teamTwoSection = document.querySelector('#team-2')
    pokemonOptions = document.querySelector(".pokemon-options")
    //event listener to capture dataInput 
    searchForm.addEventListener('submit', function (e) {
        //prevent the normal submission of the form
        e.preventDefault();
        console.log(dataInput.value, "dataInput Value");  
        fetchPokemon(dataInput.value)
        //API call by name(input.value), if successful render a card to be appended to the DOM
        //if Unsuccessful Alert(That is not a valid pokemon name)   
    });
    fetchApi()
    //initial render, testing... it works
    fetchPokemon("charmander") 
})
//button reveals for Teams
function revealTeam(){
    if (teamOneSection.hidden == true){
        teamOneSection.hidden = false
    }
}
function revealTeamTwo(){
     if (teamTwoSection.hidden == true){
        teamTwoSection.hidden = false
    }
}
function hideTeam(){
    if (teamOneSection.hidden == false){
        teamOneSection.hidden = true
    }
}
function hideTeamTwo(){
    if (teamTwoSection.hidden == false){
        teamTwoSection.hidden = true
    }
}
//fetch functions
function fetchApi(){
    return fetch(' https://pokeapi.co/api/v2/pokemon/?limit=151')
    .then(res => res.json())
    .then(pokemon => {
        const pokeArray = pokemon.results
        pokeArray.map(e => {
            // console.log(e.name, 'Map Array')
            // maps e.name to be options to append into (dropDown)
        })
    })
}

//TeamMemer to be sent to the pokedb, global scope
let i = 0
let teamMember = {
"id": i++,
"abilities": "",
"types": " ",
"height": " ",
"weight": " ",
"img": " ",
"moves": " ",
"stats": " ",
"pokedb.jsonId": i++
}

/*POST data from user's form on submit to db.json */



function fetchPokemon(name){
    const lowerName = name.toLowerCase()
    return fetch(`https://pokeapi.co/api/v2/pokemon/${lowerName}`)
    .then(res => res.json())
    .then(pokemon => {
         //img
        const image = document.createElement('img')
            image.src = pokemon.sprites.front_default
            pokemonOptions.append(image) 
            //populates teamMember object to be posted to the database.
            teamMember.img = image.src       
        //abilities
        if (name){
            pokemon.abilities.map(e => {
                if(!e.is_hidden){
                    const ability1 = document.createElement('p')
                    ability1.innerHTML = e.ability.name
                    pokemonOptions.append(ability1)
                    teamMember.abilities.value = ability1 
                    //populates teamMember object to be posted to the database.
                    teamMember.abilities = ability1.innerHTML  
                }
            })
        //types
        if(pokemon.types.length > 1){
            const types = pokemon.types
            types.map(e => { 
                let types = document.createElement('p')
                types.innerHTML = e.type.name
                pokemonOptions.append(types)
                //populates teamMember object to be posted to the database.
                teamMember.types = types.innerHTML
            })
        }   
        else { 
            let type = document.createElement('p')
                type.innerHTML = pokemon.types[0].type.name
                pokemonOptions.append(type)
                //populates teamMember object to be posted to the database.
                teamMember.types = type.innerHTML
            }
        }
        else { alert("Please Enter a Pokemon name to get New Moves!")}
        //height
        const height = document.createElement('p')
              height.innerHTML = pokemon.height
              pokemonOptions.append(height)
              //populates teamMember object to be posted to the database.
              teamMember.height = height.innerHTML
        //weight
        const weight = document.createElement('p')
              weight.innerHTML = pokemon.weight
              pokemonOptions.append(weight)
              //populates teamMember object to be posted to the database.
              teamMember.weight = weight.innerHTML
        //stats
        if(name){    
            const pokemonStats = pokemon.stats;
            pokemonStats.map(e => {
                console.log(e.stat.name + " = " + e.base_stat)
                //populates teamMember object to be posted to the database.
                teamMember.stats = e.stat.name + " = " + e.base_stat
            })
        }
        //moves
           //Check the length, if length > 1 map over it and render type.name
        //moves (Array) map over and render first 4 moves
        
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        //  moves
       function fourMoves(){
           for (i = 0; i < 4; i++){
            pokemonOptions.append(pokemon.moves[getRandomInt(100)].move.name + "  ")
           }
        }
        if(name){
            fourMoves()
            const newBtn = document.createElement('button') 
            newBtn.innerHTML = "New Moves"
            newBtn.addEventListener("click", function(){
                // pokemonOptions.append(pokemon.moves[getRandomInt(100)].move.name + "  ")
                teamMember.moves = pokemon.moves[getRandomInt(100)].move.name + "  "
                console.log("On Click is hooked up now.", teamMember)
            })
            pokemonOptions.append(newBtn)     
            //Add functionality to this button being created for each pokemon  
        }      
        
        const postbtn = document.createElement('button')
        postbtn.innerHTML = "Add to your team"
        //Fix this line
        postbtn.addEventListener('click', postPokemonData(teamMember))
        pokemonOptions.append(postbtn)
    })
}
function postPokemonData(teamMember){
    event.preventDefault()
    console.log('POST DATA TM HERE',teamMember)
    return fetch(`http://localhost:3000/pokedb.json/pokemon/pokemon`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(teamMember)
    })
    .then(response => response.text())
    .then(data => {
        //successfully posts data, need to figure out to stop infinite loop.
        console.log("Success:", data)
    })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:', error)
      });

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
// const data = { 
//     "id": 2,
//     "abilities":  "K",
//     "types": "A",
//     "height":  "D",
//     "weight":  "E",
//     "img": "E",
//     "moves": "M",
//     "stats": " Y"
// }

//   postPokemonData(e.target.value)

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