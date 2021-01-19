//Loading Effect
let loadingEff = document.querySelector('.loading-effect');
function cancelLoading(){
    loadingEff.classList.remove('active');
}
window.onload = () => { cancelLoading() };

//StickUp Menu
let naviWrapper = document.querySelector('.navi-wrapper');
let nwTop = naviWrapper.offsetTop;
function navbarSticky(){
    if (window.pageYOffset >= nwTop) return naviWrapper.classList.add('sticky');
    else naviWrapper.classList.remove('sticky');
} 
window.onscroll = () => { navbarSticky() };

// DOM Action Return Default
window.addEventListener('click', () => {
    deviceMenu.isOpen = false;
})

//Device Navi Menu Component
let menuBtn = document.querySelector('.menu-btn');
let naviLI = Array.from(document.querySelectorAll('.navi-li'));
let deviceMenu = {
    isOpen: false
}
menuBtn.addEventListener('click', e => {
    if (deviceMenu.isOpen) return deviceMenu.isOpen = false;
    else deviceMenu.isOpen = true;
    e.stopPropagation();
})
naviWrapper.addEventListener('click', e => {
    e.stopPropagation();
})
setObjValue(deviceMenu, "isOpen", deviceMenuCtrl);
function deviceMenuCtrl(){
    if (deviceMenu.isOpen) {
        menuBtn.classList.add('active')
        naviWrapper.classList.add('active');
    }
    else {
        menuBtn.classList.remove('active')
        naviWrapper.classList.remove('active');
    }
};
naviLI.forEach(item => { item.addEventListener('click', subMenuCtrl) });
function subMenuCtrl(){
    if (this.classList.contains('current')) return;
    else {
        naviLI.forEach(item => item.classList.remove('current'));
        this.classList.add('current');
    }
}

//Slider Banner Component
let sliderItemArr = Array.from(document.querySelectorAll('.slider-item'));
let sliderItemWrapper = document.querySelector('.slider-wrapper');
let sliderPanelBtn = Array.from(document.querySelectorAll('.slider-panel-li'));
let sliderStatus = {
    bannerIdx: 0
}
sliderPanelBtn.forEach( item => {
    item.addEventListener('click', sliderBtnEvent)
})
setObjValue(sliderStatus, "bannerIdx", sliderShowCtrl);
function sliderBtnEvent(){
    sliderStatus.bannerIdx = sliderPanelBtn.indexOf(this);
    clearInterval(autoplayTimer);
    setAutoplay();
}
function sliderShowCtrl(){
    let bIdx = sliderStatus.bannerIdx;
    sliderItemWrapper.style.left = -100 * bIdx + '%';
    sliderPanelBtn.forEach( item => {item.classList.remove('active')});
    sliderPanelBtn[bIdx].classList.add('active');
}
function setAutoplay(){
    autoplayTimer = setInterval(() => {
        if (sliderStatus.bannerIdx >= sliderItemArr.length - 1) return sliderStatus.bannerIdx = 0;
        else sliderStatus.bannerIdx++;
    }, 3000)
}
setAutoplay();

//FAQ Component
let questionBtn = Array.from(document.querySelectorAll('.question'));
let answerBlock = Array.from(document.querySelectorAll('.ans-blk'));
let openedQuestion = {
    questionIdx: 0
}
setObjValue(openedQuestion, 'questionIdx', questionShowCtrl);
questionBtn.forEach( item => { item.addEventListener('click', questionBtnEvent)});
function questionBtnEvent(){
    openedQuestion.questionIdx = questionBtn.indexOf(this);
}
function questionShowCtrl(){
    let qsIndex = openedQuestion.questionIdx;
    questionBtn.forEach( item => { item.classList.remove('active')});
    answerBlock.forEach( item => { item.classList.remove('open')});
    questionBtn[qsIndex].classList.add('active');
    answerBlock[qsIndex].classList.add('open');
}

//Tour Component
let tourNaviLI = Array.from(document.querySelectorAll('.tour-navi-li'));
let tourWrapper = document.querySelector('.tour-series-wrapper');
let tourSeries = Array.from(document.querySelectorAll('.tour-series'));
let tourShow = {
    tourSeriesIdx: 0
}
setObjValue(tourShow, 'tourSeriesIdx', tourShowCtrl);
tourNaviLI.forEach( item => { item.addEventListener('click', tourNaviLIEvent)});
function tourNaviLIEvent(){
    tourShow.tourSeriesIdx = tourNaviLI.indexOf(this);
}
function tourShowCtrl(){
    tourNaviLI.forEach( item => { item.classList.remove('active')});
    tourNaviLI[tourShow.tourSeriesIdx].classList.add('active');
    tourWrapper.style.left = -100 * tourShow.tourSeriesIdx + '%';
}

//Comment Component
let cmtNaviLI = Array.from(document.querySelectorAll('.cmt-navi-li'));
let cmtBlock = Array.from(document.querySelectorAll('.comment-block'));
let cmtShow = {
    cmtShowIdx: 0
}
setObjValue(cmtShow, 'cmtShowIdx', cmtShowCtrl);
cmtNaviLI.forEach( item => { item.addEventListener('click', cmtNaviEvent)});
function cmtNaviEvent(){
    cmtShow.cmtShowIdx = cmtNaviLI.indexOf(this);
}
function cmtShowCtrl(){
    cmtNaviLI.forEach( item => {item.classList.remove('active')});
    cmtBlock.forEach( item => {item.classList.remove('show')});
    cmtNaviLI[cmtShow.cmtShowIdx].classList.add('active');
    cmtBlock[cmtShow.cmtShowIdx].classList.add('show');
}

//DOM Status Function
function setObjValue(obj, key, fn){
    let defaultVal = obj[key];
    Object.defineProperty(obj, key, {
        get: () => defaultVal,
        set: value => {
            defaultVal = value;
            fn();
        }
    })
};