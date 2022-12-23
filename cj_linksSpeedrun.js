/*
* 本脚本依赖与前置脚本 cj_deepLinks_auto_accept.js
* 应用于 CJ 广告商界面里的 Pending Application 类别
*/

const allRows = document.querySelectorAll('.adv-row-icon-anchor');

const min = 5000;
const max = 15000;

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const getRnd = () => {
    return Math.round(Math.random() * min + max);
}

const run = async () => {
    for(let row of allRows) {
        window.open(row.href);
        await sleep(getRnd());
    }
}