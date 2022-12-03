const localStorgeTmpKey = "__campain_site_shareasale";
const tableQuery = ".fullResult";
const nameQuery = ".org > a";
const actionBtnQuery = ".actionBtn > a"

const table = document.querySelectorAll(tableQuery);

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const run = async () => {
    let requestTime = 0;
    let names;
    let uris;
    for(let action of table) {
        requestTime = 0;
        let uriBefore = localStorage.getItem(localStorgeTmpKey);
        let name = action.querySelector(nameQuery).innerHTML;
        let link = action.querySelector(actionBtnQuery).getAttribute("href");
        let win = window.open(link, "_blank", "height=100; weight=100;");
        while(requestTime < 30) {
            let uri = localStorage.getItem(localStorgeTmpKey);
            if(uri != null && uri != uriBefore) {
                names = names + name + "\n";
                uris = uris + uri + "\n";
                break;
            }
            await sleep(1000)
            requestTime++;
        }
        win.close();
        await sleep(1000)
    }
    console.log(names);
    console.log(uris);
}

await run();