// Functions as intended, but cannot be used with other plugins that have a window loading event

// Requires h1 element with an id of 'time' in HTML document

window.addEventListener('load', function start() {
    clock();
    const update = setInterval(clock, 1000);
});

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