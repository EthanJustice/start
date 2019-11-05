# v1 (Simple)

## Usage

### Downloading

+ [Releases](https://github.com/EthanJustice/start/releases)
+ [GitHub](https://github.com/EthanJustice/start/)

Cloning: `git clone https://github.com/EthanJustice/start`

### Page Structure

Two main containers create the layout of startpage. The `list` class, which uses `flex` to structure its children, and the `section` class, which is comprised of links grouped together by a classification of the user's choice (e.g a social media section, or programming resources, etc).

```html
<div class="list">
    <div class="section">
        <h1>Section Title</h1>
        <a href="#">A Link</a>
    </div>
</div>
```

#### Navigational Links

```html
<nav>
    <a href="index.html">Home</a><a href="games.html">Games Links</a>
</nav>
```

#### Links

```html
<div class="section">
    <a href="#">Example.com</a>
</div>
```

#### Creating and Utilizing Multiple Startpages

1. Navigate to the "src," folder or equivalent.
2. Duplicate the "index.html," file or create another HTML file in the "src," folder.
3. Add any content you wish, and update the navigation bars of other pages in order to link towards this new page.

#### Creating a Navigation Bar

1. Navigate to the HTML file you want to edit within the "src," folder, and open it in a code editor of your choice.
2. Within the `<nav>` element, add any links you wish  using anchor (`<a>`) elements (see "Navigational Links," above for an example).  This area is best for links to other files within your startpage system, or to sites you use the most often.

#### Creating a Section and Adding Links

1. Navigate to the HTML file you want to edit within the "src," folder, and open it in a code editor of your choice.
2. Within the `list div`, create a `div` with a class of `section`.  Add any links you wish as anchor (`<a>`) tags.

### List of Plugins

+ [Automatic Theme Changer](https://github.com/EthanJustice/start/blob/master/plugins/autoTheme.js)
+ [Quotes](https://github.com/EthanJustice/start/blob/master/plugins/quote.js)
+ [Clock](https://github.com/EthanJustice/start/blob/master/plugins/clock.js)
+ [Search](https://github.com/EthanJustice/start/blob/master/plugins/search.js)
+ [All](https://github.com/EthanJustice/start/blob/master/plugins/all.js)

### Plugin Usage

Please note all plugins that require CSS have had rules applied to the core.css file to reduce requests.

#### The all.js Plugin

The all.js plugin contains every plugin combined together, so that multiple plugins which require the `window.onload` event can be used together.  To use the plugin, add `<script src="../plugins/all.js"></script>` or substitute the file path for the appropriate path.  Currently, plugins require adding a `<h1 id="time"></h1>` and a `<blockquote></blockquote>` element to your HTML file.

#### The autoTheme.js Plugin

The autoTheme.js plugin automatically changes your startpage's theme based on the current time.  Currently, the autoTheme.js file only needs a `<script src="../plugins/autoTheme.js">` (or equivalent file path) located in the HTML document, as well as a stylesheet which links to a document, with an id of `stylesheet`.  The time at which the theme changes can be modified in the autoTheme.js file, and the default theme can be specified within the HTML document.

```html
<link id="stylesheet" href="./themes/dark.css" rel="stylesheet" type="text/css" />
```

#### The clock.js Plugin

The clock.js plugin creates and updates a clock display.  The clock.js plugin requires a `<script>` tag with the appropriate source, as well as an element with the value of `<h1 id="time"></h1>`.

```html
<h1 id="time"></h1>
```

#### The quote.js Plugin

The quote.js plugin randomly displays a quote from an array onto your startpage.  The plugin requires a `<script>` tag with the appropriate source, as well as a `<blockquote></blockquote>` element with an `id` of `quote`.

```html
<blockquote id="quote"></blockquote>
```

#### The search.js Plugin

The search.js plugin creates a functional search bar (default search engine is [https://duckduckgo.com](https://duckduckgo.com/)).  The plugin requires an `<input>` tag with a `type` attribute of `text,` and an `id` attribute of `search-bar`, as well as the relevant `<script>` tag.

```html
<input type="text" id="search-bar" />
```
