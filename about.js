let main = document.querySelector('main');
let fetching;

function notFetching(){
    fetching=false;
    //loader
    let loader = document.querySelector(".loader");
    if (fetching ==false){
    loader.classList.add("hide");}
}

// get the language setting in the URL
//let Urlpassed = new URLSearchParams(window.location.search);
//let languagePassed = Urlpassed.get("lang");
// if there is no language argument in the URL, set it to english version
//if(!languagePassed || languagePassed == 'en'){
//    languagePassed = "en";
//}

let defaultPath = 'https://onestepfurther.nu/cms/wp-json/wp/v2/artist';

fetchInfo(defaultPath, fillInfo);

function fetchInfo(path, fn) {
    fetching = true;
    lookingForData = true;
    fetch(defaultPath).then(e => e.json()).then(fillInfo)
}

function fillInfo(info){
    document.querySelector('body').style.height = "auto";
    document.querySelector('body').style.background = "linear-gradient(to bottom, #ffffff 0%, #f0f2f5 30%, #ffffff 100%)";
    notFetching();

    info.forEach((i)=>{
        document.querySelector('.bio p:nth-of-type(1)').innerHTML = i.acf['personal_metaphor_en']; // class setting not showing up in html, might because eng/its classed got hard overwrite in main.js... use this selector to make sure the selection
        document.querySelector('.bio p:nth-of-type(2)').innerHTML = i.acf['personal_metaphor_it'];
        document.querySelector('.bio p:nth-of-type(3)').innerHTML = i.acf['education_en'];
        document.querySelector('.bio p:nth-of-type(4)').innerHTML = i.acf['education_it'];
        document.querySelector('.bio p:nth-of-type(5)').innerHTML = i.acf['thank_you_note_en'];
        document.querySelector('.bio p:nth-of-type(6)').innerHTML = i.acf['thank_you_note_it'];
        document.querySelector('div.address p:nth-of-type(1) span.city').innerHTML = i.acf['address_city_en'];
        document.querySelector('div.address p:nth-of-type(1) span.country').textContent = i.acf['address_country_en'];
        document.querySelector('div.address p:nth-of-type(2) span.city').textContent = i.acf['address_city_it'];
        document.querySelector('div.address p:nth-of-type(2) span.country').textContent = i.acf['address_country_it'];
        document.querySelector('p.email').textContent = i.acf.email;
    })
}


// play video
document.querySelector('img.play').addEventListener('click', showIframe);
function showIframe(){
    document.querySelector('img.play').classList.add('fade-out');
    document.querySelector('img.portrait').classList.add('fade-out');
    document.querySelector('h1.name').classList.add('fade-out');
    document.querySelector('div.caption').classList.add('fade-out');
    document.querySelector('iframe').classList.add('show');
    document.querySelector('iframe').style.pointerEvents = "auto";
    document.querySelector('.stop').classList.add('show');
}
// stop video
document.querySelector('.stop').addEventListener('click', hideIframe);
function hideIframe(){
    document.querySelector('img.play').classList.remove('fade-out');
    document.querySelector('img.portrait').classList.remove('fade-out');
    document.querySelector('h1.name').classList.remove('fade-out');
    document.querySelector('div.caption').classList.remove('fade-out');
    document.querySelector('iframe').classList.remove('show');
    document.querySelector('iframe').style.pointerEvents = "none";
    document.querySelector('.stop').classList.remove('show');
}

