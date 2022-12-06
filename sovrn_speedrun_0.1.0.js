/*
    此脚本与众不同, 需要使用者提供流量源的 siteId 和 siteApiKey.
    获取方法: 
        siteApiKey:
            1. 点按 sovrn 网站左侧栏的 Site configuration.
            2. 找到你喜欢的流量源站点, 按这个站点所在之处右侧的钥匙图标.
            3. 届时, 窗口右边会弹出个 API Keys 窗口, 上面的 API Key 就是我们需要的. 
            4. 把 API Key 复制，替换掉本脚本里的 siteApiKey (注意要加双引号)
        siteId:
            1. 点按 sovrn 网站左侧栏的 Approved merchants.
            2. 按 F12 打开开发者工具, 且在工具顶端栏找到 Network (网络) 一项, 并点按这一项, 打开网络监测工具.
            3. 保持这个工具打开, 去找一个你喜欢的 (符合要求的) 广告商并如往常一样创建链接.
            4. 此时网络工具上面标有时间轴的地方就会出现一些新的请求. 这些请求在最右侧. 届时需要你用鼠标在该区域拖拽出一个区域包裹住这个最新的请求. 这个请求的样子就是一条长方形.
            5. 圈住它后, 这个时间轴窗口下面有一个"名称" ("Name") 小窗口. 在名称里找到 Anywhere 并点击.
            6. 点击后, 找到这个窗口右侧的窗口顶部栏上的"标头" (Header). 下面的网址应该会显示成这样.
                https://platform.sovrn.com/api/commerce/platform/campaigns/ {一些数字} /anywhere
                这里的 {一些数字} 就是我们需要的 siteId. 把这玩意放到本脚本里的 siteId 里. (注意加双引号)

     作用于: https://platform.sovrn.com/commerce/approved-merchants
*/

// 请把 siteId 和 siteApiKey 改成自己的
const siteId = "6017179";
const siteApiKey = "87e3338261fe9545087ef55cb7adef69";
const min = 10000;
const max = 40000;
const nameReg = /\\|\/|\?|\？|\*|\&|\"|\“|\”|\'|\‘|\’|\<|\>|\{|\}|\[|\]|\【|\】|\：|\:|\、|\^|\$|\!|\~|\`|\|/g;

const postUri = "https://platform.sovrn.com/api/commerce/platform/campaigns/" + siteId + "/anywhere";


var request = {
    linkName: "",
    url: "",
    shortUrl: "",
    type: "L",
    cuid: "",
    apiKey: "",
}

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const getRnd = () => {
    return Math.round(Math.random() * min + max);
}

const run = async () => {
    let loopTimeout = 0;
    while(loopTimeout < 30) {
        loopTimeout++;
        var table = document.querySelector(".MuiTableContainer-root").querySelector(".MuiTableBody-root ").querySelectorAll("tr");
        if(table == null) {
            await sleep(1500);
            continue;
        }
        for(let t of table) {
            let timeout = 0;
            let tds = t.querySelectorAll("td");
            let value = tds[2].innerHTML.replace("$", "");
            if(value > 0.01 && value <= 0.50) {
                let name = tds[0].querySelector("a").innerText.replace(nameReg, "");
                tds[0].querySelector("a").click();
                let domain = "";
                while(timeout < 30) {
                    let domainsContainer = document.querySelector("#merchant-flyout-content-panel-domains-content");
                    if(domainsContainer != null) {
                        domain = domainsContainer.querySelector("p").innerText;
                        await sleep(500);
                        document.querySelector("#merchant-flyout-header").querySelector("button").click();
                        break;
                    }
                    await sleep(2000);
                    timeout++;
                }
                timeout = 0;
                request.linkName = name;
                request.url = domain;
                request.apiKey = siteApiKey;
                let httpRequest = new XMLHttpRequest();
                httpRequest.open('POST', postUri);
                httpRequest.setRequestHeader("Content-type", "application/json");
                httpRequest.send(JSON.stringify(request));
                await sleep(getRnd());
            }
        }
        let nextPage = document.querySelectorAll(".MuiIconButton-sizeLarge")[3];
        if(nextPage.className.includes("Mui-disabled")) {
            break;
        }
        nextPage.click();
        loopTimeout = 0;
    }
}

await run();