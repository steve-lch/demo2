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
    serchInputStatus.isOpen = false;
    deviceMenu.isOpen = false;
})

//Search Component
let searchBtn = document.querySelector('.search-btn');
let searchInput = document.querySelector('.search-input');
let logoImg = document.querySelector('.logo');
let serchInputStatus = {
    isOpen: false
}
searchBtn.addEventListener('click', e => {
    if (serchInputStatus.isOpen) return serchInputStatus.isOpen = false;
    else serchInputStatus.isOpen = true;
    e.stopPropagation();
})
searchInput.addEventListener('click', e => {
    e.stopPropagation();
})
setObjValue(serchInputStatus, "isOpen", searchInputCtrl);
function searchInputCtrl(){
    if (serchInputStatus.isOpen){
        searchBtn.classList.add('active');
        logoImg.style.display = 'none';
    } 
    else {
        searchBtn.classList.remove('active');
        logoImg.style.display = 'block';
    }
}

//Device Navi Menu Component
let menuBtn = document.querySelector('.menu-btn');
let naviUL = document.querySelector('.navi-ul');
let naviLI = Array.from(document.querySelectorAll('.navi-li'));
let deviceMenu = {
    isOpen: false
}
menuBtn.addEventListener('click', e => {
    if (deviceMenu.isOpen) return deviceMenu.isOpen = false;
    else deviceMenu.isOpen = true;
    e.stopPropagation();
})
naviUL.addEventListener('click', e => {
    e.stopPropagation();
})
setObjValue(deviceMenu, "isOpen", deviceMenuCtrl);
function deviceMenuCtrl(){
    if (deviceMenu.isOpen) return naviUL.classList.add('active');
    else naviUL.classList.remove('active');
};
naviLI.forEach(item => { item.addEventListener('click', subMenuCtrl) });
function subMenuCtrl(){
    if (this.classList.contains('active')) return;
    else {
        naviLI.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    }
}

//Slider Banner Component
let sliderItemArr = Array.from(document.querySelectorAll('.slider-item'));
let sliderItemWrapper = document.querySelector('.sld-item-wrapper');
let sliderPanelBtn = Array.from(document.querySelectorAll('.slider-panel-button'));
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
        if (sliderStatus.bannerIdx >= 2) return sliderStatus.bannerIdx = 0;
        else sliderStatus.bannerIdx++;
    }, 3000)
}
setAutoplay();

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