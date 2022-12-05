/*
步骤：
    0. 准备好写好的申请文本.
    1. 打开 impact.com 并且选择好过滤器然后一直往下滚动, 直到所有任务商均已显示.
    2. 按 F12 打开开发人员工具, 并切换该工具的到"控制台" ("Console") 页面.
    3. 把早就写好的申请文本放到常数 textContext 内.
    4. 全选本文件内容复制并粘贴到控制台内.
    5. 把浏览器挂着, 去干别的事.

    注: 可以通过调整常数 max 和 min 来调整每次 apply 的间隔时间. 单位是毫秒.

更新:
    现在可以全自动申请了
*/

const actionContainerQuery = ".actionContainer";
const actionBtnQuery = ".actionButton";
const popupContainer = ".x-window-default-closable";
const iframeQuery = "iframe";
const inputQuery = "#marketplaceComment";
const popupApplyBtnQuery = "#button-f-el2";
const actions = document.querySelectorAll(".actionContainer");
const closeBtnQuery = ".x-tool-close";

// 以下是可自定义的常量
const max = 40000;
const min = 10000;
const textContext = "I bought a site. This site can promoting PPC as well as running a CPC campaign on google ads and using highly popular forums and purchase website ads for promotion. Also I will using YouTube, Twitter, Facebook and other channels to promote. I believe that through my efforts, I can make progress together with the affiliate.";

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const run = async () => {
    let timeout = 0;
    let container;
    for(let d of actions) {
        timeout = 0;
        let waitTime = Math.round(Math.random() * min + max);
        d.querySelector(actionBtnQuery).click();
        while(timeout <= 5) {
            await sleep(5000);
            container = document.querySelector(popupContainer);
            if(container != null) {
                try {
                    let dymDom = container.querySelector(iframeQuery).contentWindow.document;
                    dymDom.querySelector(inputQuery).value = textContext;
                    dymDom.querySelector(popupApplyBtnQuery).click();
                    break;
                } catch(e) {
                    console.log(e);
                }
            }
            timeout++;
        }
        await sleep("1000");
        try {
            if(container != null) {
                container.querySelector(closeBtnQuery).click();
            }
        } catch(e) {
            console.log(e);
        }
        await sleep(waitTime);
    }
}

await run();