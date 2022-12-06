/*
    本脚本适用于 https://adpump.com/ww-en/wmMyOffers
*/

const table = document.querySelector("tbody").querySelectorAll("tr");

const sleep = (delay) => {
    return new Promise(r => { setTimeout(r, delay); });
}

let names = "";
let uris = "";

const run = async () => {
    for(let tr of table){
        let tds = tr.querySelectorAll("td");
        if(tds.length < 4) {
            continue;
        }
        let name = tds[0].querySelector("a").innerText;
        names += name + "\n";
        tds[4].querySelector("button").click()
        while(true) {
            let loading = document.querySelector("#popup-wmLinks-loading");
            if(loading.getAttribute("style").includes("display: none;")) {
                let popup = document.querySelector("#popup-wmLinks-content");
                if(popup.querySelector("textarea") == null) continue;
                let link = popup.querySelector("textarea").value.split("\n");
                uris += link + "\n";
                break;
            }
            await sleep(1500);
        }
    }
}

await run();

names.replace("undefined", "");
uris.replace("undefined", "");
console.log(names);
console.log(uris);
