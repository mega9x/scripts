// ==UserScript==
// @name         Cj SVIP
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Omega
// @match        https://members.cj.com/member/5849095/publisher/links/search/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cj.com
// @grant        none
// ==/UserScript==

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

await (async function() {
    'use strict';
    while(true) {
      let btn = document.querySelector(".switch-get-code");
      if(btn != null) {
        btn.click();
        break;
      }
       await sleep(1000);
    }
    while(true) {
       let link = document.querySelector("#htmlTab > textarea");
       if(link != null && link.value.length > 0) {
         localStorage.setItem("__campain_site_cj", link.value.replace(/\r?\n|\r/g, ""));
         break;
       }
       await sleep(1000);
    }
})();