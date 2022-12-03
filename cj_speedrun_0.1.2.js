/*
步骤:
    0. 准备好连点器.
    1. 进入 CJ.com. 把过滤器弄好.
    2. 一直往下滑, 直到全部任务都显示完.
    3. 按 F12 打开开发人员工具, 选择"控制台" ("Console"), 把代码粘贴进去.
    4. 届时脚本启动. 如果有连点器, 把鼠标放到"同意条款"的按钮上, 挂机即可.
    4.5. 如果没有连点器, 则需要手动点击同意条款.

    注: 可以修改常数 min 和 max (单位都是毫秒) 来修改等待的时间. 默认是 15000(15秒) 到 60000 (一分钟)
*/

const min = 15000;
const max = 60000;
const cssQuery = '.main-row-wrapper';
const buttonsQuery = '.buttons';
const btnQuery = 'button';
const leadQuery = '.lead-terms';
const verticalSep = '.adv-row-vertical-sep';
const queryed = document.querySelectorAll(cssQuery);

const run = async () => {
    for(let d of queryed) {
        if(d.querySelector(leadQuery) != null && d.querySelector(leadQuery).innerHTML.length > 0) {
            if (d.querySelector(btnQuery) != null) {
                d.querySelector(btnQuery).click();
                let waitTime = Math.round(Math.random() * min + max);
                await sleep(waitTime);
                console.log(d);
            }
        }
    }
}

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

await run();