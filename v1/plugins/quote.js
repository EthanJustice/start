// Functions as intended, but cannot be used with other plugins that have a window loading event

// Requires blockquote element in HTML document

window.addEventListener('load', function createQuote() {
    let quoteChoices = ['Carpe Diem', 'Carpe Noctem']
    let num = Math.floor(Math.random() * 2);
    let quote = quoteChoices[num];
    document.getElementById('quote').innerHTML = quote;
});