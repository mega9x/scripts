/*
步骤:
    -1. 去 awin.com 随便找个任务点加入, 找到 promotion 那一栏里你申请时想要选择的那一个. 然后把它的序号记下来
        例如:
            - Display
            - https......
        那么 https 那个选项就是第二个, 序号就是2.
    0. 准备好已写好的申请文本并把它放在常量 textContext 里面.
    1. 进入 awin.com. 把过滤器弄好.
    2. 按 F12 打开开发人员工具, 选择"控制台" ("Console"), 把这个文本全部粘贴进去.
    3. 确定一切没问题后, 按回车执行这段代码.
    4. 本脚本没有实现自动翻页, 所以请翻页后手动执行该脚本.

    注: 可以修改常数 min 和 max (单位都是毫秒) 来修改等待的时间. 默认是 15000(15秒) 到 40000 (40秒)
*/

const tableQuery = ".merchantDirectory";
const plusBtnQuery = ".fa-plus";
const popupContainerQuery = "#membershipModal";
const optionQuery = "option";
const promotionSelectorQuery = "#promotion";
const textareaQuery = "textarea";
const acceptQuery = "#accepted";
const acceptBtn = ".modal_save";
const table = document.querySelector(tableQuery).querySelector("tbody").querySelectorAll("tr");

// 以下是可自定义的常量
const max = 40000;
const min = 10000;
const optionNum = 2;
const textContext = "I bought a site. This site can promoting PPC as well as running a CPC campaign on google ads and using highly popular forums and purchase website ads for promotion. Also I will using YouTube, Twitter, Facebook and other channels to promote. I believe that through my efforts, I can make progress together with the affiliate.";

function sleep(delay) {
    return new Promise(r => setTimeout(r, delay));
}

const getRnd = () => {
    return Math.round(Math.random() * min + max);
}

const run = async () => {
    for(let i of table) {
        let btn = i.querySelector(plusBtnQuery);
        if(btn != null) {
            btn.click();
        }
        await sleep(5000);
        let popupContainer = document.querySelector(popupContainerQuery);
        let promotions = popupContainer.querySelectorAll(optionQuery);
        let selectedValue = promotions[optionNum - 1].getAttribute("value");
        popupContainer.querySelector(promotionSelectorQuery).value = selectedValue;
        popupContainer.querySelector(textareaQuery).value = textContext;
        popupContainer.querySelector(acceptQuery).checked = true;
        popupContainer.querySelector(acceptBtn).click();
        await sleep(getRnd());
    }
}

await run();