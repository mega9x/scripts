var __clickedDoms = [];

const xpathLoader = (xpath) => {
    var result = document.evaluate(xpath ,document);
    return result;
}

const domBtnClick = (xpath) => {
    let __doms = xpathLoader(xpath);
    for(let i = 0; i < __doms.snapshotLength; i++) {
        let clicked = __doms.snapshotItem(i);
        if(clicked) {
            __clickedDoms.push(clicked);
        }
    }
    console.log(__doms);
}