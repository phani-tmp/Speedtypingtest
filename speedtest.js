let quoteDisplay = document.getElementById("quoteDisplay");
let timer = document.getElementById("timer");
let result = document.getElementById("result");
let quoteInput = document.getElementById("quoteInput");
let submitBtn = document.getElementById("submitBtn");
let resetBtn = document.getElementById("resetBtn");
let spinner = document.getElementById("spinner");
let f = 0;

let url = "https://apis.ccbp.in/random-quote";
let options = {
    method: "GET"
};
fetch(url, options)
    .then(function(response) {
        spinner.classList.remove("d-none")
        return response.json();
    })
    .then(function(jsonData) {
        spinner.classList.add("d-none")
        quoteDisplay.textContent = jsonData.content;
        f = parseInt(f) + jsonData.content.length;
    });
let counter = 0;

let id = setInterval(function() {
    console.log(counter)
    timer.textContent = counter + "seconds";
    counter = parseInt(counter) + 1;
}, 1000);
submitBtn.onclick = function() {
    if (quoteInput.value === quoteDisplay.textContent) {
        result.textContent = "Your typing speed is " + parseInt(parseFloat(f / counter)) * 60 + " word per minute(wpm)";
        clearInterval(id);
    } else {
        result.textContent = "your answer is incorrect";
        clearInterval(id)
    }
};
resetBtn.onclick = function() {
    let url = "https://apis.ccbp.in/random-quote";
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            spinner.classList.remove("d-none")
            return response.json();
        })
        .then(function(jsonData) {
            spinner.classList.add("d-none")
            quoteDisplay.textContent = jsonData.content;
        });
    let counter = 0;
    clearInterval(id);
    quoteInput.value = "";
    result.textContent = "";

    id = setInterval(function() {
        console.log(counter)
        timer.textContent = counter + "seconds";
        counter = parseInt(counter) + 1;
    }, 1000);
};