// ==UserScript==
// @name         BingBot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bing search bot
// @author       Pavel Fitilkov
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let sites = {
"napli.ru": ["DevTools для разработчика",
"Установка и настройка Git, Node JS",
"Отключение редакций",
"Вывод произвольных типов записей wp",
"Плагины VS Сode",
],
"kiteuniverse.ru": ["Kite Universe Россия",
"«Красота. Грация. Интеллект»",
"Наши воздушные змеи",
],
"motoreforma.com": ["прошивки для CAN-AM",
"тюнинг для квадроциклов BRP",
"вариатор CV-Tech купить",
]
}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)]; //получили случайный сайт из объекта

let links = document.links;
let searchButton = document.getElementsByName("search")[0];
let keywords = sites[site]; //получили набор ключевых фраз для конкретного сайта
let keyword = keywords [getRandom(0, keywords.length)];
let bingInput = document.getElementsByName("q")[0];

//Работаем с cookie
if (searchButton != undefined) {
document.cookie = "site=" + site;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site");
} else {
  site = location.hostname; 

} 

//Рабоатем на главной странице поисковика
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
} else if (location.hostname == site) {
console.log("Мы на целевом сайте!");

//Работаем на страницах поисковой выдачи

setInterval(() => {
let index = getRandom(0, links.length);

if (getRandom(0, 101) >= 70) {
   location.href = "https://www.bing.com/";
}
if (links.length == 0) {
location.href = site;
}
else if (links[index].href.indexOf(site) != -1) {
links[index].click()
}
}, getRandom(3500, 5500));

} else {
let nextBingPage = true;
for (let i = 0; i < links.length; i++) {
if (links[i].href.includes(site)) {
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
let element = document.querySelector(".sb_pagS");
if (element != null) {
if (element.innerText == "5") {
  nextBingPage = false;
  location.href = "https://www.bing.com/";
} 

clearInterval(elementExist);
}

}, 100)

 if (nextBingPage) {
    setTimeout(() => {
      document.querySelector(".sw_next").click();
    }, getRandom(5000, 7000));
  }
}




function getRandom(min, max) {
return Math.floor(Math.random() * (max - min) + min);
}

function getCookie(name) {
let matches = document.cookie.match(new RegExp(
"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
));
return matches ? decodeURIComponent(matches[1]) : undefined;
}
