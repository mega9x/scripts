function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const run = async () => {
    let table = document.querySelector("tbody").querySelectorAll("tr");
    let timeout = 0;
    for(let t of table) {
        timeout = 0;
        localStorage.setItem("__adsterra_requesting_1", "true");
        let link = t.querySelectorAll("td")[2].querySelector("a").getAttribute("href");
        let win = window.open(link, "_blank", "height=100;weight=100");
        while(!localStorage.getItem("__adsterra_requesting_1").includes("false") && timeout < 30) {
            timeout++;
            await sleep(1500);
        }
        win.close();
    }
    localStorage.removeItem("__adsterra_requesting_1");
}

await run();