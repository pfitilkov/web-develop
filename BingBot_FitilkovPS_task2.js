// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bing search bot
// @author       Pavel Fitilkov
// @match        https://www.bing.com/*
// @match        https://auto.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let searchButton = document.getElementsByName("search")[0];
let keywords = ["Максискутер Sym Maxym TL500", "Yamaha T MAX 560", "Купить автомобиль Geely Monjaro", "Купить VolksWagen", "Купить BMW", "BYD", "Купить авто", "Купить подержанные авто", "Мотоциклы на авто.ру"];
let keyword = keywords [getRandom(0, keywords.length)];
let bingInput = document.getElementsByName("q")[0];

if (searchButton != undefined) {
let i = 0;
let timerId = setInterval(function() {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
        clearInterval(timerId);
        searchButton.click(); //Кликаем и идём в выдачу
    }
}, 500)


//Работаем на целевом сайте
} else if (location.hostname == "auto.ru") {
console.log("Мы на целевом сайте!");

//Работаем на страницах поисковой выдачи

setInterval(() => {
let index = getRandom(0, links.length);

if (getRandom(0, 101) >= 70) {
   location.href = "https://www.bing.com/";
}
if (links.length == 0) {
location.href = "https://auto.ru/";
}
else if (links[index].href.indexOf("auto.ru") != -1) {
links[index].click()
}
}, getRandom(3500, 5500));

} else {
let nextBingPage = true;
for (let i = 0; i < links.length; i++) {
if (links[i].href.includes("auto.ru")) {
let link = links[i];
nextBingPage = false;
console.log("Нашёл строку" + link);
setTimeout(() => {
link.click();
}, getRandom(3500, 5500));

break;
  }
}
let elementExist = setInterval(() => {
let element = document.querySelector(".sb_bp");
if (element != null) {
if (document.querySelector(".sb_bp").innerText == "5") {
  nextBingPage = false;
  location.href = "https://www.bing.com/";
} 

clearInterval(elementExist);
}

}, 150)

if (document.querySelector(".sb_bp").innerText == "5") {
  nextBingPage = false;
  location.href = "https://www.bing.com/";
}
if (nextBingPage) {
setTimeout (() => {
document.querySelector(".sw_next").click();
}, getRandom (5000, 7000))
}

}


function getRandom(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}
