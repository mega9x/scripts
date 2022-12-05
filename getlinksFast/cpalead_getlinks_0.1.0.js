const sleep = (delay) => {
    return new Promise(r => setTimeout(r, delay))
}

let names = "";
let uris = "";

const run = async () => {
    let nextBtn = document.querySelector(".dataTables_paginate").querySelector(".next");
    while(!nextBtn.className.includes("disabled")) {
        nextBtn = document.querySelector(".dataTables_paginate").querySelector(".next");
        let table = document.querySelector(".table-responsive").querySelector("tbody").querySelectorAll("tr");
        for(let t of table) {
            let popupContainer = document.querySelector("#survey_details");
            let popupBefore = "";
            if(popupContainer != null) {
                popupBefore = popupContainer.querySelector("textarea").value;
            }
            let timeout = 0;
            let tds = t.querySelectorAll("td");
            let price = tds[6].innerText;
            if(price.replace("$", "") > 10) {
                continue;
            }
            let name = tds[1].querySelector("a").innerText;
            tds[1].querySelector("div > a").click();
            while(timeout < 30) {
                popupContainer = document.querySelector("#survey_details")
                if(popupContainer != null && popupContainer.querySelector("textarea").value != popupBefore) {
                    names = names + name + "\n";
                    uris = uris + popupContainer.querySelector("textarea").value + "\n";
                    break;
                }
                await sleep(1500);
            }
        }
        nextBtn.querySelector("a").click();
    }
}

await run();

console.log(names);
console.log(uris);