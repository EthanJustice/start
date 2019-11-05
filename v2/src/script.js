const timeElem = document.getElementById('time');
const dateElem = document.getElementById('date')
const weatherElem = document.getElementById('current-weather');
const searchBar = document.getElementById('search-bar');
const quoteElem = document.getElementById('quote-text');
const newsElem = document.getElementById('news');

const quickLauncherList = {
    "items": [
        {
            "displayText": "",
            "destination": "",
            "color": ""
        }
    ]
}

const linksList = {
    "items": [
        {
            "displayText": "",
            "destination": "",
            "color": ""
        }
    ]
}

window.addEventListener('load', function run() {
    createLinks();
    updateDateAndTime();
    const update = setInterval(updateDateAndTime, 1000);
    weather();
    quote();
    news();
    searchBar.value = '';
});

function createLinks() {
    let quickLaunchItems = quickLauncherList.items;
    for (let i = 0; quickLaunchItems.length > i; i++) {
        let newLink = document.createElement('a');
        newLink.innerHTML = quickLaunchItems[i].displayText;
        newLink.href = quickLaunchItems[i].destination;
        newLink.style.borderTop = `3px solid ${quickLaunchItems[i].color}`;
        document.getElementById('quick-launcher').appendChild(newLink);
    }
    
    let linksItems = linksList.items;
    for (let i = 0; linksItems.length > i; i++) {
        let newLink = document.createElement('a');
        newLink.innerHTML = linksItems[i].displayText;
        newLink.href = linksItems[i].destination;
        newLink.style.borderTop = `2px solid ${linksItems[i].color}`;
        document.getElementById('links-lists').appendChild(newLink)
    }
}

function updateDateAndTime() {
    let d = new Date();
    if (d.getMinutes() < 10) { min = `0${d.getMinutes().toString()}` }
    else { min = d.getMinutes() }
    if (d.getHours() < 10) { hours = `0${d.getHours().toString()}`}
    else { hours = d.getHours() }
    document.getElementById('time').innerHTML = `${hours}:${min}`

    let day = new Array(7);
    day[0] = "SUN";
    day[1] = "MON";
    day[2] = "TUES";
    day[3] = "WED";
    day[4] = "THU";
    day[5] = "FRI";
    day[6] = "SAT";
    
    dateElem.innerHTML = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()} ${day[d.getDay()]}`

    if (d.getHours() >= 12 && d.getHours() < 18) {
        searchBar.placeholder = 'Good Afternoon';
    } else if (d.getHours() < 12 && d.getHours() >= 0) {
        searchBar.placeholder = 'Good Morning';
    } else if (d.getHours() >= 18 && d.getHours() <= 23) {
        searchBar.placeholder = 'Good Evening';
    }
}

function weather() {
    fetch('https://www.metaweather.com/api/location/LOCATIONCODE').then(resp => resp.json()).then(function(data) {
        let weather = data.consolidated_weather;
        return weather.map(function(weather) {
            let temp = Math.round(weather.the_temp * (9 / 5) + 32);
            weatherElem.innerHTML =  `${temp}° ${weather.weather_state_name}`;
        });
    }).catch(function(err) {
        console.log(`Failed: ${err}`)
    })
}

function quote() {
    fetch('https://quote-garden.herokuapp.com/quotes/random').then(resp => resp.json()).then(function(data) {
        quoteElem.innerHTML = `"${data.quoteText}"`;
        if (data.quoteAuthor == '') { return }
        else { document.getElementById('quote-author').innerHTML = `-${data.quoteAuthor}`; }
    }).catch(function(err) {
        console.log(`Failed: ${err}`)
    });
}

function news() {
    for (let i = 0; 5 > i; i++) {
    fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(resp => resp.json()).then(function(data) {
        return fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json?print=pretty`).then(function(res) { return res.json() });
    }).then(function(data) {
        let newStoryContainer = document.createElement('h4');
        let newStory = document.createElement('a');
        newStory.href = data.url;
        newStory.innerHTML = data.title;
        newStoryContainer.appendChild(newStory);
        newsElem.appendChild(newStoryContainer)
    }).catch(function(err) {
        console.log(`Failed: ${err}`)
    });
    }
}

searchBar.addEventListener('keypress', function search(key) {
    if (key.keyCode == 13 && searchBar.value != '') {
        let query = searchBar.value.replace(' ', '+')
        window.open(`https://duckduckgo.com/?q=${query}`)
    } else { return }
});