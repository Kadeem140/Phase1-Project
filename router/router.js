const route = (event) => { //function to handle link default behavior
//handles location changes
    event = event || window.event; //if no event is given, default event is window.event
    event.preventDefault(); //prevents default behovior ie. refreshing pages
    window.history.pushState( {}, "", event.target.href); //uses History API by calling pushState & pushing the anchor's href value.
    //updates browser URL
    handleLocation(); // routes within our app.
}


const routes = {
    404: "/pages/404.html",
    "/": "index.html",
    "/about": "frontend/frontend/pages/about.html",
    "/pokemon": "frontend/frontend/pages/pokemon.html"
};

const handleLocation = async () => {
    const path = window.location.pathname; 
    const route = routes[path] || routes[404]; // find our desired route or default to 404 error
    const html = await fetch(route).then((data) => data.text()); //Load in Html from our route, turn data to text.
    document.getElementById("main-page").innerHTML = html;
}


window.onpopstate = handleLocation; //handles cases where users click forward and back bottom
window.route = route; //Global access to route function

handleLocation(); // handles location on page load to handle correct pg user lands on.

