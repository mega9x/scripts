/*
    此脚本为自动整理链接脚本. 不依赖前置.
    作用于: https://app.impact.com/secure/mediapartner/marketplace/new-campaign-marketplace-flow.ihtml?execution=e3s1#/joined
*/

const tableBodyQuery = ".table-body";
const tableRowQuery = ".table-row";
const tableCellQuery = ".table-cell";
const nameNum = 1;
const linkNum = 3;

const table = document.querySelector(tableBodyQuery).querySelectorAll(tableRowQuery);

const run = async () => {
    let names;
    let uris;
    for(let t of table) {
        let items = t.querySelectorAll(tableCellQuery);
        names = names + items[nameNum].querySelector("span").innerHTML + "\n";
        uris = uris + items[linkNum].querySelector("span").innerHTML + "\n";
    }
    names.replace("undefined", "");
    uris.replace("undefined", "");
    console.log(names);
    console.log(uris);
}

await run();