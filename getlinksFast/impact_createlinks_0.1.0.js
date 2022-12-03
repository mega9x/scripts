// 此脚本为自动创建链接脚本. 不依赖前置.

const advTableQuery = ".rowActionsRow";
const leftContainerQuery = ".leftSlideContent";
const exitContainerQuery = ".leftSlideHide";

const advTable = document.querySelectorAll(advTableQuery);

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const run = async () => {
    for(let a of advTable) {
        a.querySelectorAll("a")[1].click();
        while(true) {
            let createBtn = document.querySelector(leftContainerQuery).querySelector("button");
            if(createBtn != null) {
                createBtn.click();
                let closeBtn = document.querySelector(exitContainerQuery);
                if(closeBtn != null) {
                    closeBtn.click();
                }
                break;
            }
            await sleep(1500);
        }
    }
}

await run();