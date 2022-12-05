/*
    用法和前几个脚本大致相同.
    目标网站：https://adpump.com/ww-en/wmOffers/page:1?available=1&notFavourite=1&geo%5B0%5D=US&currency=2&sort=1
*/
let pages = 1;
let maxPages = document.querySelector(".smartPaginator").querySelector(".last").innerText;

// 在此处填入流量源描述
// 注意: 这个网站的描述只能容纳 199 个字符
const describe = "I bought a site. This site can promoting PPC as well as running a CPC campaign on google ads and using highly popular forums and purchase website ads for promotion. Also I will using YouTube, Twitter, Facebook and other channels to promote."
// 在此处填入最大间隔和最小间隔
const min = 10000;
const max = 40000;

const getUri = () => { return "https://adpump.com/ww-en/wmOffers/page:" + pages + "?available=1&notFavourite=1&geo%5B0%5D=US&currency=2&sort=1";};

const sleep = (delay) => {
    return new Promise(r => setTimeout(r, delay));
}

const getRnd = () => {
    return Math.round(Math.random() * min + max);
}

// This function try to send a ajax GET request and return response html. so 不要动这个函数！
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

const objToUrlEncoded = (obj) => {
    let body = [];
    for(let prop in obj) {
        let encodedKey = encodeURIComponent(prop);
        let encodedVal = encodeURIComponent(obj[prop]);
        body.push(encodedKey + "=" + encodedVal);
    }
    body = body.join("&");
    return body;
}

const requestAccess = async (uri) => {
    let ct = uri.split("__ct:")[1].replace("?", "");
    let data = {
        __ct: ct,
        offerAgreement: "on",
        comment: describe
    };
    let body = objToUrlEncoded(data);
    let response = await fetchPost(uri, body);
    console.log(response);
}

const connect = async (uri) => {
    let ct = uri.split("__ct:")[1].replace("?", "");
    let data = {
        __ct: ct,
        offerAgreement: "on",
    };
    let body = objToUrlEncoded(data);
    let response = await fetchPost(uri, body);
    console.log(response);
}

// this func is the main func
const run = async () => {
    for(;pages <= maxPages; pages++) {
        let actionLink = "";
        let doc = await fetchGetHtml(getUri(), null);
        let trs = doc.querySelector(".dataTable").querySelector("tbody").querySelectorAll("tr");
        for(let t of trs) {
            let tds = t.querySelectorAll("td");
            for(let td of tds) {
                let dataColumn = td.getAttribute("data-column");
                if(dataColumn != null && dataColumn.includes("maxPrice")) {
                    let ifBreak = false;
                    if(td.innerText.includes("%")) {
                        break;
                    }
                    let price = td.innerText.replace("$", "").split("-")
                    for(let p of price) {
                        if(p > 10) {
                            ifBreak = true;
                            break;
                        }
                    }
                    if(ifBreak) {
                        break;
                    }
                }
                if (dataColumn != null && dataColumn.includes("actions")) {
                    console.log(td);
                    let form = td.querySelector("form");
                    if(form == null) continue;
                    actionLink = td.querySelector("form").getAttribute("action");
                    let btn = td.querySelector("button");
                    if (btn != null && btn.innerText.includes("Request")) {
                        await requestAccess(actionLink);
                    } else if (td.querySelector("button").innerText.includes("Connect")) {
                        await connect(actionLink);
                    }
                    break;
                }
            }
            await sleep(getRnd());
        }
    }
}

await run();