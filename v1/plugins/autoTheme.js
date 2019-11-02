// Functions as intended, but cannot be used with other plugins that have a window loading event

const styleSheet = document.getElementById('stylesheet');

window.addEventListener('load', function update() { updateTheme() });

function updateTheme() {
    let date = new Date();
    let time = date.getHours();
    if (time >= 18 || time <= 8) {
        styleSheet.setAttribute('href', '../src/themes/dark.css');
    } else if (time > 8 || time < 18) {
        styleSheet.setAttribute('href', '../src/themes/light.css')
    }
}