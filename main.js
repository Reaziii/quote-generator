var category = 'education';
const api_key = "VxpUtMrdtKMnU25LDo7OgQ==wVnsouvRmSTMD1gp"
const categories = [
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "best",
    "birthday",
    "business",
    "car",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "home",
    "hope",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "knowledge",
    "leadership",
    "learning",
    "legal",
    "life",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "success"
]
const selectOptionButton = document.getElementById("select-option");
const optionsDiv = document.getElementById("options-div");
const optionsListDiv = document.getElementById("option-list");
const selectedCategoryButton = document.getElementById("selected-category");
const generateButton = document.getElementById("generate-button");
const quoteTexTbox = document.getElementById("quote-text");
const quoteAuthorBor = document.getElementById("quote-author");
const getRandomQuote = async () => {
    quoteTexTbox.style.display = "none";
    quoteAuthorBor.style.display = "none"
    try {
        let res = await fetch('https://api.api-ninjas.com/v1/quotes?category=' + category, {
            method: "GET",
            headers: {
                'X-Api-Key': api_key
            }
        });
        res = await res.json();
        res = res[0]

        let quote = res.quote;
        let author = res.author;
        quoteTexTbox.style.display = "unset";
        quoteAuthorBor.style.display = "unset"
        quoteTexTbox.innerText = quote;
        quoteAuthorBor.innerText = author;
        return { status: true, ...res };
    } catch (err) {
        return { status: false, message: "Something went wrong" }
    }

}
const itemOnSelect = (name) => {
    category = name;
    selectedCategoryButton.innerText = name;
    optionsDiv.style.display = "none";

}

const addCategoriesItems = () => {
    // load categories
    categories.forEach((item, key) => {
        const div = document.createElement('div');
        div.innerText = item;
        div.setAttribute("class", "items")
        div.onclick = () => {
            itemOnSelect(item);
        }
        optionsListDiv.append(div);
    })
}

window.onload = async () => {
    //open options
    selectOptionButton.onclick = () => {
        optionsDiv.style.display = "flex";
    }
    optionsDiv.onclick = (e) => {
        if (!optionsListDiv.contains(e.target)) {
            optionsDiv.style.display = "none";
        }
    }
    addCategoriesItems();
    getRandomQuote();
    generateButton.onclick = () => {
        getRandomQuote();
    }
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 32 || event.key === " ") {
        event.preventDefault();
        getRandomQuote();
    }
});