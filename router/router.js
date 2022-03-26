const route = (event) => { //function to handle link default behavior
//handles location changes
    event = event || window.event; //if no event is given, default event is window.event
    event.preventDefault(); //prevents default behovior ie. refreshing pages
    window.history.pushState( {}, "", event.target.href); //uses History API by calling pushState & pushing the anchor's href value.
    //updates browser URL
    handleLocation(); // routes within our app.
}

window.route = route; //Global access to route function

const routes = {
    404: "/pages/404.html",
    "/": "/frontend/frontend/",
    "/about": "/pages/about.html",
    "/pokemon": "/pages/pokemon.html"
};

const handleLocation = async () => {
    const path = window.location.pathname; 
    const route = routes[path] || routes[404]; // find our desired route or default to 404 error
    const html = await fetch(route).then((data) => data.text()); //Load in Html from our route, turn data to text.
}

window.onpopstate = handleLocation; //handles cases where users click forward and back bottom
window.route = route;

handleLocation(); // handles location on page load to handle correct pg user lands on.

