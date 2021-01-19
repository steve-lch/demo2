//StickUp Menu
let naviArea = document.querySelector('.navi-area');
let naTop = naviArea.offsetTop;
function navbarSticky(){
    if (window.pageYOffset > naTop) return naviArea.classList.add('sticky');
    else naviArea.classList.remove('sticky');
} 
window.onscroll = () => { navbarSticky() };

// DOM Action Return Default
window.addEventListener('click', () => {
    mobiMenu.isOpen = false;
    naviLI.forEach(item => item.classList.remove('active'));
})

//Mobile Navi Menu
let menuBtn = document.querySelector('.mobi-menu-btn');
let naviUL = document.querySelector('.navi-ul');
let naviLI = Array.from(document.querySelectorAll('.navi-li'));
let mobiMenu = {
    isOpen: false
}
menuBtn.addEventListener('click', e => {
    if (mobiMenu.isOpen) return mobiMenu.isOpen = false;
    else mobiMenu.isOpen = true;
    e.stopPropagation();
})
naviUL.addEventListener('click', e => {
    e.stopPropagation();
})
setObjValue(mobiMenu, "isOpen", deviceMenuCtrl);
function deviceMenuCtrl(){
    if (mobiMenu.isOpen) {
        menuBtn.classList.add('active');
        naviUL.classList.add('active');
        return;
    }
    else {
        menuBtn.classList.remove('active');
        naviUL.classList.remove('active');
    }
};
naviLI.forEach(item => { item.addEventListener('click', subMenuCtrl) });
function subMenuCtrl(){
    if (this.classList.contains('active')) return;
    else {
        naviLI.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
    }
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