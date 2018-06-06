let main = document.querySelector('main');
let fetching;

function notFetching(){
    fetching=false
    //loader
let loader = document.querySelector(".loader");
if (fetching ==false){
    loader.classList.add("hide");}
}

// get the language setting in the URL
//let Urlpassed = new URLSearchParams(window.location.search);
//let languagePassed = Urlpassed.get("lang");
// if there is no language argument in the URL, set it to english version
if(!languagePassed || languagePassed == 'en'){
    languagePassed = "en";
}
// fetch data based on language setting in the url
let defaultPath = 'https://onestepfurther.nu/cms/wp-json/wp/v2/about_yourself_' + languagePassed;

fetchInfo(defaultPath, fillInfo);

function fetchInfo(exp, fnc) {
    fetching = true;
    lookingForData = true;
    fetch(exp).then(e => e.json()).then(fnc)
}

// play video
document.querySelector('img.play').addEventListener('click', showIframe);
function showIframe(){
    document.querySelector('img.play').classList.add('fade-out');
    document.querySelector('img.portrait').classList.add('fade-out');
    document.querySelector('h1.name').classList.add('fade-out');
    document.querySelector('div.address').classList.add('fade-out');
    document.querySelector('div.email').classList.add('fade-out');
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
    document.querySelector('div.address').classList.remove('fade-out');
    document.querySelector('div.email').classList.remove('fade-out');
    document.querySelector('div.caption').classList.remove('fade-out');
    document.querySelector('iframe').classList.remove('show');
    document.querySelector('iframe').style.pointerEvents = "none";
    document.querySelector('.stop').classList.remove('show');
}



// used for clicking on language buttons
let infoPathEn = 'https://onestepfurther.nu/cms/wp-json/wp/v2/about_yourself_en';
let infoPathIt = 'https://onestepfurther.nu/cms/wp-json/wp/v2/about_yourself_it'

function fillInfo(info){

    info.forEach((i)=>{
    document.querySelector('.metaphor').innerHTML = i.acf.personal_metaphor;

    document.querySelector('.edu').textContent = i.acf.education;
    document.querySelector('.support').textContent = i.acf.support;

    document.querySelector('.country').textContent = i.acf.address_country;

    document.querySelector('.city').textContent = i.acf.address_city;

    document.querySelector('p.email').textContent = i.acf.email_address;


    })
    document.querySelector('body').style.height = "auto";
    document.querySelector('body').style.background = "linear-gradient(to bottom, #ffffff 0%, #f0f2f5 30%, #ffffff 100%)";
    notFetching();
}


/*set language*/

$('.enSet').on('click', () => { fetchInfo(infoPathEn, fillInfo)

})

$('.itSet').on('click', () => { fetchInfo(infoPathIt, fillInfo)

})
