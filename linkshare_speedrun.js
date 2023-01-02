/*
    本脚本适用于 https://cli.linksynergy.com/cli/publisher/programs/advertisers.php
    请在第一页使用该脚本. 注意要将过滤国家改为美国, 并且将一页显示数目改为 100.
    翻页速度取决于网络速度. 如果出了错, 那是网络问题.

    另外: Js 字符串 + 数字 不报错, 甚至字符串可以被当成数字处理, 所以 "1" + 100 = 1100
        我他妈谢谢你 Js
*/

// 请自行修改这个值来改变请求间隔
const min = 1000;
const max = 20000;

// 修改最小金额
const minMoney = 0.95;
// 修改最大金额
cosnt maxMoney = 30;


const pageCount = parseInt(document.querySelector("#ViewPerPageArea").querySelectorAll("a")[4].innerText);
const pageUri = "https://cli.linksynergy.com/cli/publisher/programs/advertisers.php";
const applyPostUri = "https://cli.linksynergy.com/cli/publisher/programs/apply_confirmation.php";

const token = csrfMagicToken;
const defaultX = 61;
const defaultY = 9;
const priceRegex = /(USD|EUR|€|\$|£)\s?(\d{1,}(?:[.,]*\d{3})*(?:[.,]*\d*))|(\d{1,3}(?:[.,]*\d*)*(?:[.,]*\d*)?)\s?(USD|EUR)/g;
const dollarSignRegex = /\$|EUR|USD|€|£/;

const getRnd = () => {
    return Math.round(Math.random() * min + max);
}

let pagePostBody = {
    __csrf_magic: token,
    analyticchannel: "",
    analyticpage: "",
    singleApply: "",
    update: "",
    remove_mid: "",
    remove_oid: "",
    remove_nid: "",
    filter_open: 1,
    cat: "",
    advertiserSearchBox: "",
    category: -1,
    filter_status: "all",
    filter_type: "all",
    filter_banner_size: -1,
    filter_networks: "all",
    "shippingcountries[]": "US",
    orderby: "",
    direction: "",
    currec: 0,
    pagesize: 100,
}

let cpPostBody = {
    __csrf_magic: token,
    singleApply: "",
    "oid[]": "",
    accept: "accept",
    x: 61,
    y: 9,
}

// This function try to send an ajax GET request and return response html. so 不要动这个函数！
const fetchGetHtml = async (uri, headers) => {
    let response;
    if(headers != null) {
        response = await fetch(uri, {
            method: 'GET',
            headers: headers,
            mode: "no-cors"
        });
    }
    response = await fetch(uri, {
        method: 'GET',
        mode: "no-cors"
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
            mode: "no-cors",
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

const sendPostRequest = async (data) => {
    let body = objToUrlEncoded(data);
    let response = await fetchPost(applyPostUri, body);
    console.log(response);
}

const getPage = async (pageCurrent) => {
    pagePostBody.currec = pageCurrent;
    let body = objToUrlEncoded(pagePostBody);
    let response = await fetchPost(pageUri, body);
    console.log(response);
    let htmlStr = await response.text();
    let dom = new DOMParser().parseFromString(htmlStr, "text/html");
    return dom;
}

const getApplyPage = async (singleApply) => {
    let postBody = pagePostBody;
    postBody.singleApply = singleApply;
    let body = objToUrlEncoded(postBody);
    let response = await fetchPost(applyPostUri, body);
    console.log(response);
    let htmlStr = await response.text();
    let dom = new DOMParser().parseFromString(htmlStr, "text/html");
    return dom;
}

const run = async () => {
    let pageCurrent = 1;
    for(let i = 1; i <= pageCount; i++) {
        await sleep("50");
        let page = await getPage(pageCurrent);
        if(i != 1){
             console.log(pageCurrent);
             pageCurrent = parseInt(page.querySelector("input[name=currec]").value) + 100;
        }
        const trs = page.querySelector(".programTable > tbody").querySelectorAll("tr");
        for(let t of trs) {
            let ifCon = false;
            let tds = t.querySelectorAll("td");
            let offset =  Math.round(Math.random() * -10 + 10);
            if(tds.length <= 1) {
                console.log("这是分隔符");
                continue;
            }
            let stupidCommission = tds[5].innerText;
            if(stupidCommission.toLowerCase().includes("% of sale")) {
                console.log("这是 cps");
                continue;
            }
            let prices = stupidCommission.matchAll(priceRegex);
            for(let p of prices) {
                try {
                    if(p[2].replace(dollarSignRegex, "") > maxMoney || p[2].replace(dollarSignRegex, "") < minMoney) {
                        ifCon = true;
                        console.log(p[2]);
                        console.log("金额不匹配");
                    }
                } catch(e) {
                    ifCon = true;
                    console.log(p[2]);
                    console.log("金额过大");
                }
            }
            if(ifCon) {
                continue;
            }
            let inputOnclick = tds[7].querySelector("input");
            if(inputOnclick === null) {
                console.log("这个被操作过");
                console.log(t);
                continue;
            }
            let inputOnclickStr = inputOnclick.getAttribute("onclick");
            let singleApplyMatched = inputOnclickStr.match(/[0-9]+~[0-9]+~[0-9]/);
            if(singleApplyMatched === null) {
                continue;
            }
            let singleApply = singleApplyMatched[0];
            let applyDoc = await getApplyPage(singleApply);
            let oid = applyDoc.querySelectorAll("input")[2].getAttribute("value");
            cpPostBody.singleApply = singleApply;
            cpPostBody["oid[]"] = oid;
            cpPostBody.x = defaultX + offset;
            cpPostBody.y = defaultY + offset;
            await sendPostRequest(cpPostBody);
            console.log("处理中");
            await sleep(getRnd());
        }
        console.log("第" + i + "页");
    }
}

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

await run();