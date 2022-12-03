const table = document.querySelector("tbody").querySelectorAll("tr");

let names = "";
let links = "";

for(let t of table) {
    names = names + t.querySelector("a > div").innerText + "\n";
    links = links + t.querySelector("a").href + "\n";
}

console.log(names);
console.log(links);