/*
步骤:
    1. 进入 Share a Sale. 把过滤器弄好.
    2. 确保自己在第一页.
    3. 按 F12 打开开发人员工具, 选择"控制台" ("Console"), 把代码粘贴进去.
    4. 届时脚本启动. 挂机即可.

    注: 可以修改常数 wait(单位毫秒) 来修改等待的时间. 默认是 30000 (半分钟)

更新:
        半自动改全自动.
     作用于: https://account.shareasale.com/a-programs.cfm#searchType=basicKeyword&start=1&order=&resultFilter=&shipto=US&perlead=1&catalog=0
*/

const min = 15000;
const max = 60000;
const wait = 5000;
const checkboxQuery = "#readagreement";
const acceptBtnQuery = "#confirmbutton";
const joinProgramLink = '.joinProgramLink';
const closeQuery = "#gen7ClsAction";
const pageBodyQuery = '#pagingBody';
const emailAcceptCheckboxQuery = "#releaseEmailAgree";
const clickablePageHref = 'a';

const pageQueryed = document.querySelector(pageBodyQuery).querySelectorAll(clickablePageHref).entries();

const run = async () => {
    while(true) {
        let queryed = document.querySelectorAll(joinProgramLink);
        for(let q of queryed) {
            q.click();
            await sleep(wait);
            let emailAccept = document.querySelector(emailAcceptCheckboxQuery);
            if(emailAccept != null) {
                emailAccept.checked = true;
            }
            document.querySelector(checkboxQuery).checked = true;
            document.querySelector(acceptBtnQuery).click();
            await sleep(wait);
            document.querySelector(closeQuery).click();
            let waitTime = Math.round(Math.random() * min + max);
            await sleep(waitTime);
        }
        try {
            pageQueryed.next().value[1].click();
            await sleep(wait);
        } catch (e) {
            break;
        }
    }
}

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

await run();