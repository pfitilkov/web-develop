// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bing search bot
// @author       Pavel Fitilkov
// @match        https://www.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let searchButton = document.getElementsByName("search")[0];
let keywords = ["Купить авто", "Купить подержанные авто", "Мотоциклы на авто.ру"];
let keyword = keywords [getRandom(0, keywords.length)];

if (searchButton != undefined) {
document.getElementsByName("q")[0].value = keyword;
searchButton.click();
} else {

for (let i = 0; i < links.length; i++) {
if (links[i].href.indexOf("auto.ru") != -1) {
let link = links[i];
console.log("Нашёл строку " + link);
link.click();
break;
  }
}
}

function getRandom(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}
