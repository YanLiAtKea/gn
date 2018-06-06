// burger menu
let burger = document.querySelector('img.burger');
burger.addEventListener('click', toggleBurgerMenu);
function toggleBurgerMenu(){
    document.querySelector('nav').classList.toggle('expanded');
    document.querySelector('nav').classList.toggle('collapse');
}

// drop down menu
document.querySelector('.timeline').addEventListener('mouseenter', dropDown);
function dropDown(){
    document.querySelector('.subMenu').classList.add('drop-down');
    document.querySelector('header').style.overflow = 'visible';
}
document.querySelector('.timeline').addEventListener('mouseleave', pullUp);  // use mouseleave as trigger can cause issues when testing mobile version on computer. on real mobile it's fine, since there is no mouse
function pullUp(){
    document.querySelector('.subMenu').classList.remove('drop-down');
    document.querySelector('header').style.overflow = 'hidden';
}

// switch hard-code part between en and it with lang buttons
let enButton = document.querySelector('.enSet');
let itButton = document.querySelector('.itSet');
let allIta = document.querySelectorAll('.ita');
let allEng = document.querySelectorAll('.eng');
enButton.addEventListener('click', showEn);
itButton.addEventListener('click', showIt);
function showEn(){
    enButton.className = 'enSet lanactive';
    itButton.className = 'itSet';
    allIta.forEach(function(it){it.className = 'ita hide'});
    allEng.forEach(function(it){it.className = 'eng'});
}
function showIt(){
    itButton.className = 'itSet lanactive';
    enButton.className = 'enSet';
    allIta.forEach(function(it){it.className = 'ita'});
    allEng.forEach(function(it){it.className = 'eng hide'});
}

// get the language setting in the URL and display the hard-code part in that language
let Urlpassed = new URLSearchParams(window.location.search);
let languagePassed = Urlpassed.get("lang");
// if there is no language argument in the URL, set it to english version
if(!languagePassed || languagePassed == 'en'){
    languagePassed = "en";
    showEn();
} else if (languagePassed && languagePassed == "it"){
    showIt();
}



// get hrefs of all the buttons and append the language to them, either by clicking on language button or by getting the language from url
let allNavButtons = document.querySelectorAll('header a[id]');
allNavButtons.forEach(updateHref);
function updateHref(a){
    // get the language buttons
    let langButtons = document.querySelectorAll('.lan button');
    let oldHref = a.getAttribute('href');
    let newHref;
    // append language argument after clicking on the language button
    langButtons.forEach(languageChosen);
    function languageChosen(l){
        l.addEventListener('click', changeLang);
        function changeLang(){
            // in HTML the languages are shown wish uppercase, need to change to lowercase
            let languageChosen = l.innerHTML.toLowerCase();
            // check to see if language setting already exist, if yes, overwrite with new language setting, if no, add language setting
            if(oldHref.indexOf('lang')>-1){
                newHref = oldHref.slice(0, -2) + languageChosen;
            } else {
                newHref = oldHref + '?lang=' + languageChosen;
            }
            a.setAttribute('href', newHref);
        }
    }
    // append language argument from url
    // get the language setting in the URL
    let originalUrl = new URLSearchParams(window.location.search);
    let languageSet = originalUrl.get("lang");
    if(!languageSet || languageSet == "en" || languageChosen == "en"){
        // set en span as active, show which lang is acive already after loading the page
        document.querySelector('.enSet').className = "enSet lanactive";
        document.querySelector('.itSet').className = "itSet";
        showEn();
        // pass language argument to the href. forEach loop to achieve the same effect see below
        newHref = oldHref + '?lang=en';
    } else if (languageSet == "it" || languageChosen == "it"){
        // set it span as active
        document.querySelector('.enSet').className = "enSet";
        document.querySelector('.itSet').className = "itSet lanactive";
        showIt();
        newHref = oldHref + '?lang=it';
    }
    a.setAttribute('href', newHref);
}

/////////// get event type and pass it to the href
let types = document.querySelectorAll('.subMenu>a');
types[0].addEventListener('click', types[0].setAttribute('type', 'experience'));
types[1].addEventListener('click', types[1].setAttribute('type', 'exhibition'));
types[2].addEventListener('click', types[2].setAttribute('type', 'press'));
types.forEach(chooseType);
function chooseType(t){
    t.addEventListener('click', updateURL);
    function updateURL(){
        let oldHref = t.getAttribute('href');
        let newHref;
        newHref = oldHref + '&type=' + t.getAttribute('type');
        t.setAttribute('href', newHref);
    }
}
