//render DOM package function
function setObjVal(obj, key, fn){
    let defaultValue = obj[key];
    Object.defineProperty(obj, key, {
        get: function (){return defaultValue},
        set: function (val){
            defaultValue = val;
            fn(val);
        }
    })
}

//DOM return default
window.addEventListener('click', function (){
    searchInput.classList.remove('active');
    menuBtn[1].classList.remove('active');
    megaMenuDiv.classList.remove('active');
})

//Search
let toSearchBtn = document.querySelector('.to-search');
let searchInput = document.querySelector('.search-input');
toSearchBtn.addEventListener('click', function (e){
    searchInput.classList.add('active');
    e.stopPropagation();
});
searchInput.addEventListener('click', function (e){
    e.stopPropagation();
})

//Cart content
let cartCntStatus = {
    isOpen: false
}
let cartCntBtn = document.querySelector('.cart-btn');
let cartCnt = document.querySelector('.cart-content');
cartCntBtn.addEventListener('click', function (){
    if (cartCntStatus.isOpen) return cartCntStatus.isOpen = false; 
    else { cartCntStatus.isOpen = true };
});
setObjVal(cartCntStatus, 'isOpen', cartCntToggle);
function cartCntToggle(){
    if (!cartCntStatus.isOpen) {
        cartCntBtn.classList.remove('active');
        cartCnt.classList.remove('active');
    }
    else {
        cartCntBtn.classList.add('active');
        cartCnt.classList.add('active');
    }
}

//Mobile navigation
let mobiNav = {
    isOpen: false
}
let mobiMenuBtn = document.querySelector('.mobi-menu-btn');
let mobiMenu = document.querySelector('.menu');
mobiMenuBtn.addEventListener('click', function (){
    if (mobiNav.isOpen) return mobiNav.isOpen = false; 
    else { mobiNav.isOpen = true };
});
setObjVal(mobiNav, 'isOpen', mobiMenuToggle);
function mobiMenuToggle(){
    if (!mobiNav.isOpen) {
        mobiMenuBtn.classList.remove('active');
        mobiMenu.classList.remove('active');
    }
    else {
        mobiMenuBtn.classList.add('active');
        mobiMenu.classList.add('active');
    }
}

let megaMenu = {
    isOpen: false
}
let menuBtn = Array.from(document.querySelectorAll('.menuBtn'));
let megaMenuDiv = document.querySelector('.product-mega-menu');
menuBtn[1].addEventListener('click', function (){
    if (megaMenu.isOpen) return megaMenu.isOpen = false; 
    else { megaMenu.isOpen = true };
})
setObjVal(megaMenu, 'isOpen', megaMenuToggle);
function megaMenuToggle(){
    if (!megaMenu.isOpen) {
        menuBtn[1].classList.remove('active');
        megaMenuDiv.classList.remove('active');
    }
    else {
        menuBtn[1].classList.add('active');
        megaMenuDiv.classList.add('active');
    }
}
megaMenuDiv.addEventListener('click', function (e){
    e.stopPropagation();
})
menuBtn[1].addEventListener('click', function (e){
    e.stopPropagation();
})

//Banner slider
let bannerIdx = {
    bIndex: 0
}
let tpBtn = Array.from(document.querySelectorAll('.tp-btn'));
let mbBlock = Array.from(document.querySelectorAll('.mb-block'));
let mbBar = Array.from(document.querySelectorAll('.item-bar'));
tpBtn.forEach(function (item){
    item.addEventListener('click', setBannerIdx)
});
function setBannerIdx(){
    clearInterval(timer);
    autoplayTimer();
    bannerIdx.bIndex = tpBtn.indexOf(this);
}
setObjVal(bannerIdx, 'bIndex', sliderSwitch);
function sliderSwitch(){
    let preloadIdx = 1;
    if (bannerIdx.bIndex >= 4) { preloadIdx = 0; }
    else { preloadIdx = bannerIdx.bIndex + 1; }
    mbBlock.forEach(function (item){
        item.classList.remove('current');
    });
    mbBar.forEach(function (item){
        item.classList.remove('current');
        item.classList.remove('loading');
    });
    tpBtn.forEach(function (item){
        item.classList.remove('active');
    });
    mbBlock[bannerIdx.bIndex].classList.add('current');
    mbBar[bannerIdx.bIndex].classList.add('current');
    mbBar[preloadIdx].classList.add('loading');
    mbBar[bannerIdx.bIndex].classList.add('current');
};
function autoplayTimer(){
    timer = setInterval(function (){
        if (bannerIdx.bIndex >= 4) return bannerIdx.bIndex = 0;
        else bannerIdx.bIndex++;
    }, 5000)
};
autoplayTimer();

//Best Seller event
let bsItemViewBtn = Array.from(document.querySelectorAll('.view-btn'));
let bsItemFavBtn = Array.from(document.querySelectorAll('.fav-btn'));
let bsItemShareBtn = Array.from(document.querySelectorAll('.share-btn'));
let bsItemAddCartBtn = Array.from(document.querySelectorAll('.addcart-btn'));
bsItemFavBtn.forEach(function (item){
    item.addEventListener('click', function (){
        alert('Product is added to favorite list!!');
    });
});
bsItemAddCartBtn.forEach(function (item){
    item.addEventListener('click', function (){
        alert('Product is added to cart!!');
    });
});
bsItemShareBtn.forEach(function (item){
    item.addEventListener('click', popUpWindow);
});
function popUpWindow(){
    window.open('https://www.google.com', '_blank', 'width=400, height=200');
}
