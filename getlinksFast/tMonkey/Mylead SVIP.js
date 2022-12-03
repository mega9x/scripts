// ==UserScript==
// @name         Mylead SVIP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       MegaTechart
// @match        https://mylead.global/panel/programs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mylead.global
// @grant        none
// ==/UserScript==

(function() {
   'use strict';
    let site = document.querySelector("tbody").querySelector("a").getAttribute("href");
    if(site != null) {
        localStorage.setItem("__campain_site_mylead", site);
    }
    // Your code here...
})();