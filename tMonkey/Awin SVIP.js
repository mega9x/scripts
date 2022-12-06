// ==UserScript==
// @name         Awin SVIP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Omega
// @match        https://ui.awin.com/awin/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=awin.com
// @grant        none
// ==/UserScript==

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

await (async function() {
    'use strict';
    while(true) {
        let viewDetailBtn = document.querySelector(".view-details");
        if(viewDetailBtn != null) {
            viewDetailBtn.querySelector("a").click();
            break;
        }
        await sleep(1000);
    }
    while(true) {
        let textArea = document.querySelector("#view-details-copy-code");
        if(textArea != null && textArea.value.length > 0) {
            localStorage.setItem("__campain_site_awin", textArea.value.replace(/\r?\n|\r/g, ""));
            break;
        }
        await sleep(1000);
    }
    // Your code here...
})();