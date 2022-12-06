/*
    此脚本依赖前置脚本 Mylead SVIP.js
    作用于: https://mylead.global/panel/programs?status=0
*/

const localStorgeTmpKey = "__campain_site_mylead";
const tableQuery = "#table-responsive";
const trQuery = "tr";
const nameQuery = ".a-programs-hover";
const promoteBtnQuery = ".programListGoBtnPromote";
const shitQuery = ".extendedContent";
var nameItemPair = [];

const run = async () => {
    let shit = document.querySelectorAll(shitQuery);
    for(let littleShit of shit) {
        littleShit.remove();
    }
    let allItems = document.querySelector(tableQuery).querySelectorAll(trQuery);
    for(let item of allItems) {
        try {
            let name = item.querySelector(nameQuery).innerHTML;
            let uri = item.querySelector(promoteBtnQuery).getAttribute("href");
            let win = window.open(uri, "_blank", "height=100;weight=100;");
            await sleep(5000);
            win.close();
            let uriGetted = localStorage.getItem(localStorgeTmpKey);
            nameItemPair.push({n: name, u: uriGetted});
        } catch(e) {
            console.error(e);
        }
    }
    let names = nameItemPair.map(x => x.n);
    let uris = nameItemPair.map(x => x.u);
    let name = "";
    let uri = "";
    for(let n of names) {
        name = name + n + "\n";
    }
    for(let u of uris) {
        uri = uri + u + "\n";
    }
    names.replace("undefined", "");
    uris.replace("undefined", "");
    console.log(name);
    console.log(uri);
}

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

await run();