// ==UserScript==
// @name         Adsterra Auto Accept
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Omega
// @match        https://beta.affiliates.adsterra.com/offer/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=adsterra.com
// @grant        none
// ==/UserScript==

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

await (async function() {
    localStorage.setItem("__adsterra_requesting_1", "true");
    'use strict';
    while(true) {
        let btn = document.querySelector(".MuiPaper-root").querySelectorAll("button")[1];
        if(btn != null) {
            btn.click();
            break;
        }
        await sleep(1000);
    }
    localStorage.setItem("__adsterra_requesting_1", "false");
    // Your code here...
})();