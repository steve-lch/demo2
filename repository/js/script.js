
axios.all([getMenu(), getPage()])
.then(axios.spread((data1, data2) => {
    loadingAnimation.style.display = 'none';
}))
.catch(err => {console.log(err)});

function getMenu() {
    return axios.get('http://127.0.0.1:5501/components/navi_bar.html')
    .then((response)=> {
        let menuDiv = document.querySelector('.menu');
        menuDiv.innerHTML = response.data;
        const naviMenu = Array.from(document.querySelectorAll('.nav-option'));
        
        if (document.URL.includes('design')) {
            naviMenu.forEach(item => item.classList.remove('current'));
            naviMenu[1].classList.add('current');
        }
        else if (document.URL.includes('js_example')) {
            naviMenu.forEach(item => item.classList.remove('current'));
            naviMenu[2].classList.add('current');
        }
        else if (document.URL.includes('website')) {
            naviMenu.forEach(item => item.classList.remove('current'));
            naviMenu[3].classList.add('current');
        }
        else {
            naviMenu.forEach(item => item.classList.remove('current'));
            naviMenu[0].classList.add('current');
        }
    })
}

const loadingAnimation = document.querySelector('.loading');

//stickUp Menu
const stickMenuBtn = document.querySelector('.stickMenu_btn');
let sMBStatus = {
    isOpen: false
};
stickMenuBtn.addEventListener('click', ()=> {
    if (sMBStatus.isOpen) return sMBStatus.isOpen = false;
    else sMBStatus.isOpen = true;
});
setObjVal(sMBStatus, 'isOpen', showSMenu);
function showSMenu(){
    let menuDiv = document.querySelector('.menu');
    if (sMBStatus.isOpen) {
        stickMenuBtn.classList.add('open');
        menuDiv.classList.add('active');
    }
    else {
        stickMenuBtn.classList.remove('open');
        menuDiv.classList.remove('active');
    }
};

//get and render page data
function getPage(){
    let pageCnt = document.querySelector('.content');
    const designUrl = 'http://127.0.0.1:5501/data/design.json';
    const jsExUrl = 'http://127.0.0.1:5501/data/jspt_ex.json';
    const webExUrl = 'http://127.0.0.1:5501/data/webpage_ex.json';
    if (pageCnt.classList.contains('design')) {
        return axios.get(designUrl)
        .then(res => {
            let contentHtml = '';
            res.data.forEach(item => {
                contentHtml += `<a class="item-viewbox" href="${item.imgUrl}" data-fslightbox="gallery">
                                    <figure class="img-div">
                                        <img src="${item.imgUrl}">
                                    </figure>
                                </a>`
            })
            pageCnt.innerHTML = contentHtml;
        })
    }
    else if (pageCnt.classList.contains('jsex')) {
        return axios.get(jsExUrl)
        .then(res => {
            let contentHtml = '';
            res.data.forEach(item => {
                contentHtml += `<a href="${item.url}" class="js-viewbox">${item.title}</a>`
            })
            pageCnt.innerHTML = contentHtml;
        })
    }
    else if (pageCnt.classList.contains('web-ex')) {
        return axios.get(webExUrl)
        .then(res => {
            let contentHtml = '';
            res.data.forEach(item => {
                contentHtml += `<a class="web-viewbox" href="${item.webPageUrl}" target="_blank">
                                    <figure class="img-div">
                                        <img src="${item.imgUrl}">
                                    </figure>
                                </a>`
            })
            pageCnt.innerHTML = contentHtml;
        })
    }
}

//render DOM package function
function setObjVal(obj, key, fn){
    let defaultValue = obj[key];
    Object.defineProperty(obj, key, {
        get: () => defaultValue,
        set: val => {
            defaultValue = val;
            fn();
        }
    })
}