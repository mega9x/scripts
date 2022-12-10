/*
    作用于: http://fuzeclick.offerslook.com/index.php?r=offer%2Findex&CampaignSearch%5Bkeyword%5D=&CampaignSearch%5Boffer_category%5D=&CampaignSearch%5Bgeo%5D=225&CampaignSearch%5Bpricing_type%5D=2&CampaignSearch%5Blink_approval%5D=&page=1
    请在第一页使用该脚本
    过滤器要调成 United State, CPA
    只匹配以下价格
        下限: 0.5 美元
        上限: 20 美元
*/

// 请在此处修改间隔
const min = 10000;
const max = 60000;

const priceRegex = /(USD|EUR|€|\$|£)\s?(\d{1,}(?:[.,]*\d{3})*(?:[.,]*\d*))|(\d{1,3}(?:[.,]*\d*)*(?:[.,]*\d*)?)\s?(USD|EUR)/g;
const dollarSignRegex = /\$|EUR|USD|€|£/;

const sleep = (delay) => {
    return new Promise(r => setTimeout(r, delay));
}

const getRnd = () => {
    return Math.round(Math.random() * min + max);
}
const getRndByInput = (min, max) => {
    return Math.round(Math.random() * min + max);
}

const fetchGetHtml = async (uri, headers) => {
    let response;
    if(headers != null) {
        response = await fetch(uri, {
            method: 'GET',
            headers: headers
        });
    }
    response = await fetch(uri, {
        method: 'GET',
    });
    let text = await response.text();
    let parser = new DOMParser();
    return parser.parseFromString(text, "text/html");
}

const fetchPost = async (uri, datas) => {
    let response = await fetch(
        uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: datas,
        }
    )
    return response;
}

const handler = async (doc) => {
     let loading = doc.querySelector("#loading");
     while(loading === null && !loading.getAttribute("style").includes("display: none;")) {
         loading = doc.querySelector("#loading");
         await sleep(1500);
     }
     let queryed = doc.querySelector(".table-responsive").querySelector("tbody").querySelectorAll("tr");
     console.log(queryed)
     for(let d of queryed) {
         let tds = d.querySelectorAll("td");
         let price = parseFloat(tds[9].innerText.match(priceRegex)[0].replace(dollarSignRegex, ""));
         console.log(price + "元");
         if(price > 20 || price < 0.5) {
             console.log("金额不满足");
             continue;
         }
         console.log(d);
         console.log("处理中");
         let link = tds[2].querySelector("a").href;
         let domText = await fetch(link);
         let dom = new DOMParser().parseFromString(await domText.text(), "text/html");

         let applyModal = dom.querySelector("#apply-modal");
         let apply = dom.querySelector(".box-comments").querySelectorAll(".text-center")[1].querySelectorAll("a")[1];
         console.log(apply);
        /* while(true) {
             let style = applyModal.getAttribute("style");
             if(style === null) {
                 console.log(style);
                 await sleep(1500);
                 continue;
             }
             if(applyModal.getAttribute("style").includes("display: block;")) {
                 break;
             }
             console.log(style);
             await sleep(1500);
         }*/
         let applyLink = apply.href;
         if(!applyLink.includes("javascript:void(0)")) {
             await fetch(apply.href);
             await sleep(getRnd());
         } else {
             console.log("这个处理过");
             await sleep(getRndByInput(1000, 15000));
         }

     }
}

const run = async () => {
    let page = document;
    await handler(page);
    while(true) {
        let next = page.querySelector(".pagination-sm").querySelector(".next");
        let a = next.querySelector("a");
        if(a === null) {
            break;
        }
        let pageText = await fetch(a.href);
        page = new DOMParser().parseFromString(await pageText.text(), "text/html");
        await handler(page);
    }
}

await run();