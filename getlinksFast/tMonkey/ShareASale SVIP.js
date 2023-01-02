// ==UserScript==
// @name         ShareASale SVIP
// @namespace    org.hq
// @version      0.1
// @description  try to take over the world!
// @author       Omega
// @match        https://account.shareasale.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=shareasale.com
// @grant        none
// ==/UserScript==

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

(async function() {
    'use strict';
    while(true) {
        let textarea = document.querySelector(".urlOnlyCont > textarea");
        if(textarea != null) {
            localStorage.setItem("__campain_site_shareasale", textarea.value);
        }
        await sleep(1000);
    }
})();