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
    teamOneSection = document.querySelector('#team1')
    teamTwoSection = document.querySelector('#team-2')
    battleBox = document.querySelector('.battleBox')
    battlePokeOne = document.querySelector('#participants-1')
    battlePokeTwo = document.querySelector('#participants-2')
    pokemonOptions = document.querySelector(".pokemonOptions")
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
             //team 1 card
            const teamOneCard = document.createElement('div')
            teamOneCard.setAttribute("class", "card")
            teamOneCard.style= "width: 18rem;"

            const cardBody = document.createElement('div')

            //name
            const name1 = document.createElement('span')
            name1.innerHTML = e.name
            cardBody.append(name1)
        
            //img
            const image1 = document.createElement('img')
            image1.src = e.img
            cardBody.append(image1) 
            //ability
            const ability1 = document.createElement('p')
            ability1.innerHTML = e.abilities
            cardBody.append(ability1)
            //types
            let type1 = document.createElement('p')
                type1.innerHTML = "TYPES: " + e.types
                cardBody.append(type1)
            //height
            const height1 = document.createElement('p')
                height1.innerHTML = "HEIGHT: " + e.height
                cardBody.append(height1)
            //weight
            const weight1 = document.createElement('p')
                weight1.innerHTML = "WEIGHT: " + e.weight
                cardBody.append(weight1)
            //remove from team button
            const removeBtn = document.createElement('button')
                removeBtn.innerHTML = "Remove from Team"
                cardBody.append(removeBtn)
                removeBtn.addEventListener("click", function (event) {
                    event.preventDefault();
                    removeFromTeamOne(e.id)
                }, { once: true })
            
            //stats
            const teamOneStats = document.createElement('div')
            teamOneStats.setAttribute('class', "teamOneStats")

            for (const key of Object.keys(e.stats)) {
                
               teamOneStats.append(key.toUpperCase() + " : " + e.stats[key] + " ")
            }
            cardBody.append(teamOneStats)
            teamOneCard.append(cardBody)
            teamOneSection.append(teamOneCard)
    })
} 
//Add favorites button to this.
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
        for (const key of Object.keys(e.stats)) {
            // teamOneSection.append(key)
            console.log(key, "Keys test")
            teamTwoSection.append(key.toUpperCase() + " : " + e.stats[key] + " ")
        }
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
//Write remove from Team 2,

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

function hideBattleBox(){
    if (battleBox.hidden == false){
        battleBox.hidden = true
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
    .then(res => res.json())                
    .then(pokemon => {  

        const card = document.createElement('div')
        card.setAttribute("class", "card")
        card.style= "width: 18rem;"
        
        const cardBody = document.createElement('div')
        card.append(cardBody)
        const cardName = document.createElement('h5')
        //name
        cardName.innerHTML = pokemon.name
        cardBody.append(cardName)
        pokemonOptions.append(card)
        //img
        const image = document.createElement('img')     //Creates img from call
            image.src = pokemon.sprites.front_default
            cardBody.append(image)                //Renders created img to the DOM
            teamMember.img = image.src                  //populates teamMember object to be posted to the database.
        //abilities
        if (name){
            pokemon.abilities.map(e => {
                if(!e.is_hidden){
                    const ability1 = document.createElement('p')
                    ability1.innerHTML = "Ability: " + e.ability.name
                    cardBody.append(ability1)
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
                types.innerHTML = "TYPES: "+ e.type.name
                cardBody.append(types)
                //populates teamMember object to be posted to the database.
                teamMember.types = types.innerHTML
            })
        }   
        else { 
            let type = document.createElement('p')
                type.innerHTML = "TYPE: "+ pokemon.types[0].type.name
                cardBody.append(type)
                //populates teamMember object to be posted to the database.
                teamMember.types = type.innerHTML
            }
        //height
        const height = document.createElement('p')
              height.innerHTML = "HEIGHT: " + pokemon.height
              cardBody.append(height)
              //populates teamMember object to be posted to the database.
              teamMember.height = height.innerHTML
            //weight
        const weight = document.createElement('p')
              weight.innerHTML = "WEIGHT: " + pokemon.weight
              cardBody.append(weight)
              //populates teamMember object to be posted to the database.
              teamMember.weight = weight.innerHTML
           //stats
        const cardStats = document.createElement("div")
        cardStats.setAttribute("class", "cardStats")
            const pokemonStats = pokemon.stats; //length = 6
            let TMstats = teamMember.stats //empty
                pokemonStats.map(e => {
                        let stat = document.createElement('p')
                        stat.innerHTML = e.stat.name + " : " + e.base_stat + " "
                        cardStats.append(stat)
                        //func to push stat name and stat num 
                        var getProperty = function (propertyName, propertyValue) {
                            return TMstats[propertyName] = propertyValue;
                        };
                        getProperty(e.stat.name, e.base_stat);
                })
            card.append(cardStats)
            }
        
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
          }
        //  moves
        const cardMoves = document.createElement("div")
        const moveTitle = document.createElement("p")
        moveTitle.innerHTML = "MOVES:"
        cardMoves.setAttribute('class', "cardMoves")
        cardMoves.append(moveTitle)

       function fourMoves(){
           for (i = 0; i < 4; i++){
            cardMoves.append(pokemon.moves[getRandomInt(pokemon.moves.length - 1)].move.name + "  ")
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
       card.append(cardMoves)
            fourMoves() 
            //Add functionality to this button being created for each pokemon  
            const cardButtons = document.createElement('div')
            cardButtons.setAttribute("class", "cardButtons")

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
            cardButtons.append(postbtnTeam1)
            cardButtons.append(postbtnTeam2) 
            card.append(cardButtons)
       
    })
}
    

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
    //turn hidden from true to flase and vice versa
    if (battleBox.hidden == true){
        battleBox.hidden = false
    }
    //Call Battle Participants
     //GET API call for Team 1 
    //After Successful call render each pokemon's Name and Image to screen(Battle Box)
    fetch(`http://localhost:3000/pokemon`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { 
        //set up function for populating Battle Box db object I need to create
        renderTeamOneParticipants(data)
    })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:', error)
      });

    //Get API call for Team 2
    //After Successful call render each pokemon's Name and Image to screen(Battle Box)
    fetch(`http://localhost:3001/pokemon/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { 
         //set up function for populating Battle Box db object I need to create
        renderTeamTwoParticipants(data)
    })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:', error)
      });
    //Battle Button maps over and adds each Pokemons on each Team's Attack stat together
    //pokemon.stats[] (Make this a #)
}
// function callBattleParticipants(){
//     //GET API call for Team 1 
//     //After Successful call render each pokemon's Name and Image to screen(Battle Box)
//     fetch(`http://localhost:3000/pokemon`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => response.json())
//     .then(data => { 
//         //set up function for populating Battle Box db object I need to create
//         renderTeamOneParticipants(data)
//     })
//     .catch((error) => {
//         // console.error('Error:', error);
//         console.log('Error:', error)
//       });

//     //Get API call for Team 2
//     //After Successful call render each pokemon's Name and Image to screen(Battle Box)
//     fetch(`http://localhost:3001/pokemon/`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => response.json())
//     .then(data => { 
//          //set up function for populating Battle Box db object I need to create
//         renderTeamTwoParticipants(data)
//     })
//     .catch((error) => {
//         // console.error('Error:', error);
//         console.log('Error:', error)
//       });
//     //Battle Button maps over and adds each Pokemons on each Team's Attack stat together
//     //pokemon.stats[] (Make this a #)
// }

//Add to favorites function
//Have a Button/symbol that when click adds color to it and appends it to favorites Section!

function renderTeamOneParticipants(data){
    console.log("Clicked Team Participants!!")
    // Why is this not working??
    data.map(e => {
        //team 1 card
        const teamOneCard = document.createElement('div')
        teamOneCard.setAttribute("class", "card")
        teamOneCard.style= "width: 18rem;"
        
        const cardBody = document.createElement('div')
        teamOneCard.append(cardBody)
        //name
        const cardName = document.createElement('h5')
        cardName.innerHTML = e.name
        cardBody.append(cardName)
        battlePokeOne.append(teamOneCard)
        
        //img
        const image = document.createElement('img')     //Creates img from call
            image.src = e.img
            cardBody.append(image)                //Renders created img to the DOM
                                 //populates teamMember object to be posted to the database.
        //abilities
        pokemon.abilities.map(e => {
            if(!e.is_hidden){
                const ability1 = document.createElement('p')
                ability1.innerHTML = "Ability: " + e.ability.name
                cardBody.append(ability1)
            }
        })
        //types
        if(pokemon.types.length > 1){
            const types = pokemon.types
            types.map(e => { 
                let types1 = document.createElement('p')
                types1.innerHTML = "TYPES: "+ e.type.name
                cardBody.append(types1)
            })
        }   
        else { 
            let type = document.createElement('p')
                type.innerHTML = "TYPE: "+ pokemon.types[0].type.name
                cardBody.append(type)
            }
        //height
        const height = document.createElement('p')
              height.innerHTML = "HEIGHT: " + pokemon.height
              cardBody.append(height)

        //weight
        const weight = document.createElement('p')
              weight.innerHTML = "WEIGHT: " + pokemon.weight
              cardBody.append(weight)
           //stats
        const cardStats = document.createElement("div")
        cardStats.setAttribute("class", "cardStats")
            const pokemonStats = pokemon.stats; //length = 6
            let TMstats = teamMember.stats //empty
                pokemonStats.map(e => {
                        let stat = document.createElement('p')
                        stat.innerHTML = e.stat.name + " : " + e.base_stat + " "
                        cardStats.append(stat)
                        //func to push stat name and stat num 
                        var getProperty = function (propertyName, propertyValue) {
                            return TMstats[propertyName] = propertyValue;
                        };
                        getProperty(e.stat.name, e.base_stat);
                })
            teamOneCard.append(cardStats)
            })
        
        // function getRandomInt(max) {
        //     return Math.floor(Math.random() * max);
        //   }
        // //  moves
        // const cardMoves = document.createElement("div")
        // const moveTitle = document.createElement("p")
        // moveTitle.innerHTML = "MOVES:"
        // cardMoves.setAttribute('class', "cardMoves")
        // cardMoves.append(moveTitle)

        console.log(e, "data map")
        //name
        const name3 = document.createElement('span')
        name3.innerHTML = e.name
        battlePokeOne.append(name3)

        //img
        const image1 = document.createElement('img')
        image1.src = e.img
        battlePokeOne.append(image1)       
    }








function renderTeamTwoParticipants(data){
    console.log("Clicked Team Participants!!")
   data.map(e => {
        console.log(e, "data map")
        //name
        const name2 = document.createElement('span')
        name2.innerHTML = e.name
        battlePokeTwo.append(name2)

        //img
        const image2 = document.createElement('img')
        image2.src = e.img
        battlePokeTwo.append(image2) 
})
} 

function battle(){
    let teamOneSum = 0
    let teamTwoSum = 0
    //API Call for team 1
    //Successful call adds pokemon.stats.attack together
    fetch(`http://localhost:3000/pokemon`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { 
       teamOneSum += sumOfStats(data)
       console.log(teamOneSum, "Team one Sum")  
      })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:', error)
      });

    //API Call for team 2
    fetch(`http://localhost:3001/pokemon`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => { 
       teamTwoSum += sumOfStats(data)
       console.log(teamTwoSum, "Team Two Sum")  
      })
    .catch((error) => {
        // console.error('Error:', error);
        console.log('Error:', error)
      });

    //If Team 1 bigger than team 2 they win and vice versa

    if(teamOneSum > teamTwoSum){
        const winner = document.createElement('h1')
        winner.innerHTML = " TEAM ONE WINS!"
        battleBox.append(winner)
    }
    else{
        const winner = document.createElement('h1')
        winner.innerHTML = " TEAM TWO WINS!"
        battleBox.prepend(winner)
    }

}

//Add to favorites Button!!/ function
function sumOfStats(data){
    let statSum = 0;
    data.map(e => {
        statSum += e.stats.hp
        statSum += e.stats.attack
        statSum += e.stats.defense
        statSum += e.stats.speed
    })
    return statSum
}

