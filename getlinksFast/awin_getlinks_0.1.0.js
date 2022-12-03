
const tableBodyQuery = "tbody";

const table = document.querySelector(tableBodyQuery).querySelectorAll("tr");

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const run = async () => {
    let names;
    let uris;
    let requestTime = 0;
    for(let t of table) {
        let uriBefore = localStorage.getItem("__campain_site_awin");
        requestTime = 0;
        const tableCells = t.querySelectorAll("td");
        let name = tableCells[0].innerText;
        let link = tableCells[8].querySelectorAll("a")[2].href;
        let win = window.open(link, "_blank", "height=100; weight=100");
        while(requestTime < 30) {
            requestTime++;
            let uri = localStorage.getItem("__campain_site_awin");
            if(uri != null && uri != uriBefore) {
                uris = uris + uri + "\n";
                names = names + name + "\n";
                break;
            }
            await sleep(1000);
        }
        if(requestTime >= 30) {
            console.log("Error: " + name);
        }
        win.close();
    }
    console.log(names);
    console.log(uris);
}

await run();