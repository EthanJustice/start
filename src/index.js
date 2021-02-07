const time = document.getElementById("time");
const date = document.getElementById("date");
const news = document.getElementById("news");

function b(type, text, attributes) {
    let element = document.createElement(type.toString());
    element.innerText = text || "";
    if (attributes) {
        Object.keys(attributes).forEach(item => {
            if (element.hasAttribute(item)) {
                if (item.includes("data_")) {
                    element.setAttribute(
                        item.replace(new RegExp("_", "g"), "-"),
                        attributes[item]
                    );
                } else {
                    element.setAttribute(item, attributes[item]);
                }
            }
        });
    }
    return element;
}

const launcher = {
    items: [
        {
            displayText: "",
            destination: "",
            color: "",
            shortcut: "",
        },
    ],
};

const links = {
    items: [
        {
            displayText: "",
            destination: "",
            color: "",
            shortcut: "",
        },
    ],
};

window.addEventListener("load", () => {
    createLinks();
    updateDateAndTime();
    const update = setInterval(updateDateAndTime, 1000);

    getHN();
});

function createLinks() {
    let items = launcher.items;

    for (let i = 0; items.length > i; i++) {
        let newLink = b("a", items[i].displayText, {
            href: items[i].destination,
            borderTop: `3px solid ${items[i].color}`,
        });
        document.getElementById("quick-launcher").appendChild(newLink);
    }

    let linksItems = links.items;
    for (let i = 0; linksItems.length > i; i++) {
        let newLink = b("a", linksItems[i].displayText, {
            href: linksItems[i].destination,
            borderTop: `2px solid ${linksItems[i].color}`,
        });
        document.getElementById("links-lists").appendChild(newLink);
    }
}

function updateDateAndTime() {
    let d = new Date();
    if (d.getMinutes() < 10) {
        min = `0${d.getMinutes().toString()}`;
    } else {
        min = d.getMinutes();
    }
    if (d.getHours() < 10) {
        hours = `0${d.getHours().toString()}`;
    } else {
        hours = d.getHours();
    }
    document.getElementById("time").innerText = `${hours}:${min}`;

    let day = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];

    date.innerText = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()} ${
        day[d.getDay()]
    }`;
}

async function getHN() {
    const get = url => {
        return fetch(url).then(resp => resp.json());
    };
    try {
        const resp = await get(
            "https://hacker-news.firebaseio.com/v0/topstories.json"
        );
        const items = () =>
            Promise.all(
                Array.from(resp)
                    .slice(0, 5)
                    .map(i =>
                        get(
                            `https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`
                        )
                    )
            );
        (await items()).forEach(i => {
            let newStoryContainer = b("h4");
            let newStory = b("a", i.title, {
                href: i.url || `https://news.ycombinator.com/item?id=${i.id}`,
            });

            newStoryContainer.appendChild(newStory);
            news.appendChild(newStoryContainer);
        });
    } catch (err) {
        news.style.display = "none";
        buildError("Failed to load data from HackerNews.", err);
    }
    return;
}

function bindShortcuts(key) {
    let quickLaunchItems = launcher.items;
    for (let i = 0; quickLaunchItems.length > i; i++) {
        if (
            key.keyCode == quickLaunchItems[i].shortcut &&
            document.activeElement == document.body
        ) {
            window.open(quickLaunchItems[i].destination);
        }
    }

    let linksItems = links.items;
    for (let i = 0; linksItems.length > i; i++) {
        if (
            key.keyCode == linksItems[i].shortcut &&
            document.activeElement == document.body
        ) {
            window.open(linksItems[i].destination);
        }
    }
}

window.addEventListener("keypress", bindShortcuts, false);

function buildError(msg, err) {
    console.error(err);
    document.querySelector(".error > h3").innerText = msg;
    document.querySelector(".error").classList.remove("hidden");
}
