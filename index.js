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
    // postbtn = document.querySelector('.add-team')
    //event listener to capture dataInput 
    searchForm.addEventListener('submit', function (e) {
        //prevent the normal submission of the form
        e.preventDefault();
        fetchPokemon(dataInput.value)
        //API call by name(input.value), if successful render a card to be appended to the DOM
        //if Unsuccessful Alert(That is not a valid pokemon name)   
    });
    //initial render, testing... it works
   
})
// fetchPokemon("charmander")

//button reveals for Teams
function revealTeam(){
    if (teamOneSection.hidden == true){
        teamOneSection.hidden = false
    }
    //fetch db
    fetch(`http://localhost:3000/pokemon`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { 
        renderTeamOnePokemon(data)
    })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:', error)
      });
}

function revealTeamTwo(){
    if (teamTwoSection.hidden == true){
       teamTwoSection.hidden = false
   }
    //fetch db
    fetch(`http://localhost:3001/pokemon/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { 
        renderTeamTwoPokemon(data)
    })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:', error)
      });

}

function renderTeamOnePokemon(data){
        data.map(e => {
            //name
            const name1 = document.createElement('span')
            name1.innerHTML = e.name
            teamOneSection.append(name1)
        
            //img
            const image1 = document.createElement('img')
            image1.src = e.img
            teamOneSection.append(image1) 
        
            console.log(e, "E")
        
            const ability1 = document.createElement('p')
            ability1.innerHTML = e.abilities
            teamOneSection.append(ability1)
            //types
            const types = e.types
            // types.map(e => { 
            //     let types = document.createElement('p')
            //     types.innerHTML = e.type.name
            //     teamOneSection.append(types)
            //     //populates teamMember object to be posted to the database.
            //     teamMember.types = types.innerHTML
            // })
            let type1 = document.createElement('p')
                type1.innerHTML = "TYPES: " + e.types
                teamOneSection.append(type1)
            //height
            const height1 = document.createElement('p')
                height1.innerHTML = "HEIGHT: " + e.height
                teamOneSection.append(height1)
            //weight
            const weight1 = document.createElement('p')
                weight1.innerHTML = "WEIGHT: " + e.weight
                teamOneSection.append(weight1)
        
            const newBtn = document.createElement('button')
                newBtn.innerHTML = "Remove from Team"
                console.log(e.id, "ID")
                // newBtn.addEventListener("click", removeFromTeamOne(e.name))
                teamOneSection.append(newBtn)
                newBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    removeFromTeamOne(e.id)
                }, { once: true })
            
            //stats   
            e.stats.map(stat => {
                    let stats = document.createElement('p')
                    stats.innerHTML = stat
                    teamOneSection.append(stats)
                    // console.log(stat.stats.name + " = " + stat.base_stat)
                    //populates teamMember object to be posted to the database.
                    // teamMember.stats.push(stat.name + " = " + stat.base_stat)          
            })
        
    })
} 

function renderTeamTwoPokemon(data){
    data.map(e => {
        //name
        const name2 = document.createElement('span')
        name2.innerHTML = e.name
        teamTwoSection.append(name2)
    
        //img
        const image2 = document.createElement('img')
        image2.src = e.img
        teamTwoSection.append(image2) 
    
        console.log(e, "E")
    
        const ability2 = document.createElement('p')
        ability2.innerHTML = e.abilities
        teamTwoSection.append(ability2)
        //types
        const types = e.types
        // types.map(e => { 
        //     let types = document.createElement('p')
        //     types.innerHTML = e.type.name
        //     teamTwoSection.append(types)
        //     //populates teamMember object to be posted to the database.
        //     teamMember.types = types.innerHTML
        // })
        let type2 = document.createElement('p')
            type2.innerHTML = "TYPES: " + e.types
            teamTwoSection.append(type2)
        //height
        const height2 = document.createElement('p')
            height2.innerHTML = "HEIGHT: " + e.height
            teamTwoSection.append(height2)
        //weight
        const weight2 = document.createElement('p')
            weight2.innerHTML = "WEIGHT: " + e.weight
            teamTwoSection.append(weight2)
    
        const newBtn2 = document.createElement('button')
            newBtn2.innerHTML = "Remove from Team"
            console.log(e.id, "ID")
            // newBtn2.addEventListener("click", removeFromTeamOne(e.name))
            teamTwoSection.append(newBtn2)
            newBtn2.addEventListener("click", function (event) {
                event.preventDefault();
                // removeFromTeamOne(e.id)
            }, { once: true })
        
        //stats   
        e.stats.map(stat => {
                let stats2 = document.createElement('p')
                stats2.innerHTML = stat
                teamTwoSection.append(stats2)
                // console.log(stat.stats.name + " = " + stat.base_stat)
                //populates teamMember object to be posted to the database.
                // teamMember.stats.push(stat.name + " = " + stat.base_stat)          
        })
    
})
}

//PUT Function
function removeFromTeamOne(pokemon){
     fetch(`http://localhost:3000/pokemon/${pokemon}`, {
        method: 'PUT',
        headers: {
             'Content-Type': 'application/json'
         }
     })
     .then(response => response.json())
     .then(res => console.log(res))

     .catch((err) => {
         console.log("Error:", err)
     })
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
 
//moves
   //Check the length, if length > 1 map over it and render type.name
//moves (Array) map over and render first 4 moves

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
//  moves
function fourMoves(){
   for (i = 0; i < 4; i++){
    teamOneSection.append(data.moves[getRandomInt(100)].move.name + "  ")
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

//TeamMemer to be sent to the pokedb, global scope
let i = 0
let teamMember = {
"id": i++,
"name": "",
"abilities": "",
"types": " ",
"height": " ",
"weight": " ",
"img": " ",
"moves": [ ],
"stats": { },
"pokedb.jsonId": i++
}

/*POST data from user's form on submit to db.json */
function fetchPokemon(name){
    // Event.preventDefault()
    const lowerName = name.toLowerCase() //Takes user input, lowercases it. 
    return fetch(`https://pokeapi.co/api/v2/pokemon/${lowerName}`) //GET method with input
    .then(res => res.json())                //Convert to Json format
    .then(pokemon => {                      //Json formatted Data for our usage
       //name
       const name = document.createElement('span')
            name.innerHTML = pokemon.name
            pokemonOptions.append(name)
            teamMember.name = name.innerHTML
        //img
        const image = document.createElement('img')     //Creates img from call
            image.src = pokemon.sprites.front_default
            pokemonOptions.append(image)                //Renders created img to the DOM
            teamMember.img = image.src                  //populates teamMember object to be posted to the database.
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
           //This part needs to be re worked!!!!!
            const pokemonStats = pokemon.stats; //length = 6
            let TMstats = teamMember.stats //empty
            // if(TMstats.length > 0){
                // TMstats.length = 0
                pokemonStats.map(e => {
                        // TMstats.push( e.stat.name + " = " + e.base_stat)
                        //pushes to browser
                        pokemonOptions.append(e.stat.name + " = " + e.base_stat)
                        //func to push stat name and stat num 
                        var getProperty = function (propertyName, propertyValue) {
                            return TMstats[propertyName] = propertyValue;
                        };
                        
                        getProperty(e.stat.name, e.base_stat);
                        
                })
            // }
            console.log(TMstats, "TMstats")


        //moves
           //Check the length, if length > 1 map over it and render type.name
        //moves (Array) map over and render first 4 moves
        
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        //  moves
       function fourMoves(){
           for (i = 0; i < 4; i++){
            pokemonOptions.append(pokemon.moves[getRandomInt(pokemon.moves.length - 1)].move.name + "  ")
            //add conditional statement here if the teamMember.moves is populated then we clear it out then add 4 moves.
            //for new pokemon to not copy each pokemon's moves.

                if (teamMember.moves.length == 0){
                    teamMember.moves.push(pokemon.moves[getRandomInt(pokemon.moves.length - 1)].move.name)
                }
                if (teamMember.moves.length > 0){ 
                    teamMember.moves.splice(0,0);
                    teamMember.moves.push(pokemon.moves[getRandomInt(pokemon.moves.length - 1)].move.name)
                }
            }
       }
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
            const postbtnTeam1 = document.createElement('button')
            const postbtnTeam2 = document.createElement("button")
            postbtnTeam2.innerHTML = "Add to Team 2"
            postbtnTeam1.innerHTML = "Add to Team 1"
            //Fix this line
            postbtnTeam2.addEventListener('click', function (e){
                e.preventDefault();
                console.log("Event listener fired!", e)
                postPokemonDataTeam2(teamMember,e)
            })
            postbtnTeam1.addEventListener('click', function (e){
                e.preventDefault();
                console.log("Event listener fired!", e)
                postPokemonDataTeam1(teamMember,e)
            })
            pokemonOptions.append(postbtnTeam1)
            pokemonOptions.append(postbtnTeam2) 
       
    })
}
    
console.log(teamMember, "object")
function postPokemonDataTeam1(ent, event){
    event.preventDefault;
    console.log('POST DATA TM HERE',teamMember, event)
    fetch(`http://localhost:3000/pokedb.json/pokemon/pokemon`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ent)
    })
    .then(response => response.text())
    .then(data => { 
        console.log("Success:", data)
    })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:', error)
      });
  }

function postPokemonDataTeam2(ent, event){
        // event.preventDefault();
        console.log('POST DATA TM HERE',teamMember, event)
        fetch(`http://localhost:3001/pokemon/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ent)
        })
        .then(response => response.text())
        .then(data => { 
            console.log("Success:", data)
        })
        .catch((error) => {
            // console.error('Error:', error);
            console.log('Error:', error)
          });
}


//Battle Function
//Conditional Battle Button(Ready for Battle) that only renders when both TeamOne and 2 ections are not false
//API call for each DB
//Compare map each entry then compare the pokemon.stat[1] to see which one wins
function revealBattleBox(){

}
function pokemonBattle(){
    //GET API call for Team 1 
    //After Successful call render each pokemon's Name and Image to screen(Battle Box)

    //Get API call for Team 2
    //After Successful call render each pokemon's Name and Image to screen(Battle Box)

    //Battle Button maps over and adds each Pokemons on each Team's Attack stat together
    //pokemon.stats[] (Make this a #)


}

//Add to favorites function
//Have a Button/symbol that when click adds color to it and appends it to favorites Section!

// obj["key3"] = "value3";

// var getProperty = function (propertyName) {
//     return obj[propertyName];
// };

// getProperty("key1");
// getProperty("key2");
// getProperty("key3");