const route = (event) => { //function to handle link default behavior
//handles location changes
    event = event || window.event; //if no event is given, default event is window.event
    event.preventDefault(); //prevents default behovior ie. refreshing pages
    window.history.pushState( {}, "", event.target.href); //uses History API by calling pushState & pushing the anchor's href value.
    //updates browser URL
}

window.route = route; //Global access to route function

const routes = {
    404: ''
}