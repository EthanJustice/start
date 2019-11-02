const styleSheet = document.getElementById('stylesheet');
let searchBar = document.getElementById('search-bar');

window.addEventListener('load', function update() {
    updateTheme()

    searchBar.value = '';
    let time = new Date();
    if (time.getHours() >= 12 && time.getHours() <= 18) {
        searchBar.placeholder = 'Good Afternoon';
    } else if (time.getHours() < 12 && time.getHours() >= 0) {
        searchBar.placeholder = 'Good Morning';
    } else if (time.getHours() > 18 && time.getHours() <= 23) {
        searchBar.placeholder = 'Good Evening';
    }

    clock();
    const update = setInterval(clock, 1000);

    let quoteChoices = ['Carpe Diem', 'Carpe Noctem']
    let num = Math.floor(Math.random() * 2);
    let quote = quoteChoices[num];
    document.querySelector('blockquote').innerHTML = quote;
});

function updateTheme() {
    let date = new Date();
    let time = date.getHours();
    if (time >= 18 || time <= 8) {
        styleSheet.setAttribute('href', '../src/themes/dark.css');
    } else if (time > 8 || time < 18) {
        styleSheet.setAttribute('href', '../src/themes/light.css')
    }
}

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

function clock() {
    let time = new Date();
    let hours;
    let min;
    if (time.getMinutes() < 10) { min = `0${time.getMinutes().toString()}` }
    else { min = time.getMinutes() }
    if (time.getHours() < 10) { hours = `0${time.getHours().toString()}`}
    else { hours = time.getHours() }
    document.getElementById('time').innerHTML = `${hours}:${min}`
}