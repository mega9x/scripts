/*
    此脚本不依赖前置.
    作用于: https://platform.sovrn.com/commerce/create-links
*/

const table = document.querySelector("tbody").querySelectorAll("tr");

let names = "";
let links = "";

for(let t of table) {
    names = names + t.querySelector("a > div").innerText + "\n";
    links = links + t.querySelector("a").href + "\n";
    names.replace("undefined", "");
    uris.replace("undefined", "");
}

console.log(names);
console.log(links);