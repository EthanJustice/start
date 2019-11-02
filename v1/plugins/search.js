// Functions as intended, but cannot be used with other plugins that have a window loading event

// Requires an input element with a type of 'text' in the HTML document

let searchBar = document.getElementById('search-bar');

window.addEventListener('load', function start() {
    searchBar.value = '';
    let time = new Date();
    if (time.getHours() >= 12 && time.getHours() <= 18) {
        searchBar.placeholder = 'Good Afternoon';
    } else if (time.getHours() < 12 && time.getHours() >= 0) {
        searchBar.placeholder = 'Good Morning';
    } else if (time.getHours() > 18 && time.getHours() <= 23) {
        searchBar.placeholder = 'Good Evening';
    }
});

searchBar.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) {
        search();
    } else { return }
});

function search() {
    let term = searchBar.value;
    term = term.replace(' ', '+');
    window.location.replace(`https://duckduckgo.com/?q=${term}`);
}