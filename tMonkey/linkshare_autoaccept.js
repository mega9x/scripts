// ==UserScript==
// @name         LinkShare Autoaccept
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Omega
// @match        https://cli.linksynergy.com/cli/publisher/programs/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=undefined.
// @grant        none
// ==/UserScript==

// 这个脚本将自动同意点击 Accept 后弹出的窗口
(function() {
    'use strict';
    const container = document.querySelector("#programsApplyConfirmDiv");
    container.querySelector("input");
})();