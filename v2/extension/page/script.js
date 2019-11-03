const timeElem = document.getElementById('time');
const dateElem = document.getElementById('date')
const searchBar = document.getElementById('search-bar');
const quoteElem = document.getElementById('quote-text');
const newsElem = document.getElementById('news');

window.addEventListener('load', function run() {
    updateDateAndTime();
    const update = setInterval(updateDateAndTime, 1000);
    quote();
    news();
    searchBar.value = '';
});

function updateDateAndTime() {
    let d = new Date();
    if (d.getMinutes() < 10) { min = `0${d.getMinutes().toString()}` }
    else { min = d.getMinutes() }
    if (d.getHours() < 10) { hours = `0${d.getHours().toString()}`}
    else { hours = d.getHours() }
    document.getElementById('time').innerHTML = `${hours}:${min}`
    dateElem.innerHTML = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()}`

    if (d.getHours() >= 12 && d.getHours() < 18) {
        searchBar.placeholder = 'Good Afternoon';
    } else if (d.getHours() < 12 && d.getHours() >= 0) {
        searchBar.placeholder = 'Good Morning';
    } else if (d.getHours() >= 18 && d.getHours() <= 23) {
        searchBar.placeholder = 'Good Evening';
    }
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

browser.topSites.get()
  .then((sites) => {

    if (sites.length <= 0) {
        document.getElementById('links-lists').innerHTML = `Failed!`
        return;
    }

    for (let i = 0; sites.length > i; i++) {
      let newElem = document.createElement('a');
      newElem.href = sites[i].url;
      newElem.innerText = sites[i].title || sites[i].url;
      document.getElementById('links-lists').appendChild(newElem);
    }
});