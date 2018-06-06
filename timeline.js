let fetching;

function notFetching(){
    fetching = false;
    //loader
    let loader = document.querySelector(".loader");
    if (fetching == false){
        loader.classList.add("hide");
    }
}

let templateExp = document.querySelector('template.experiences').content;
let templateExhi = document.querySelector('template.exhibition').content;
let templatePress = document.querySelector('template.press').content;
let main = document.querySelector('main');
let expPathEn = 'https://onestepfurther.nu/cms/wp-json/wp/v2/experience_en?_embed&per_page=50';
let expPathIt = 'https://onestepfurther.nu/cms/wp-json/wp/v2/experience_it?_embed&per_page=50';
let exhiPathEn = 'https://onestepfurther.nu/cms/wp-json/wp/v2/exhibition_en?_embed&per_page=50';
let exhiPathIt = 'https://onestepfurther.nu/cms/wp-json/wp/v2/exhibition_it?_embed&per_page=50';
let pressPathEn = 'https://onestepfurther.nu/cms/wp-json/wp/v2/press_en?_embed&per_page=50';
let pressPathIt = 'https://onestepfurther.nu/cms/wp-json/wp/v2/press_it?_embed&per_page=50';
let counter = 0

// get the language setting in the URL
//let Urlpassed = new URLSearchParams(window.location.search);
//let languagePassed = Urlpassed.get("lang");

// get type passed in the URL
let typePassed = Urlpassed.get("type");
if(typePassed == "experience" && languagePassed == 'en'){
    fetchTimeline(expPathEn, showExp);
    fetchTimeline(exhiPathEn, showExhi)
    fetchTimeline(pressPathEn, showPress);
    showUnderlingExp();
    showOnlyExp();
    setTimeout(filterOnlyExp, 2000);
}
if(typePassed == "experience" && languagePassed == "it"){
    fetchTimeline(expPathIt, showExp);
    fetchTimeline(exhiPathIt, showExhi)
    fetchTimeline(pressPathIt, showPress);
    showUnderlingExp();
    showOnlyExp();
    setTimeout(filterOnlyExp, 2000);
}
if(typePassed == "exhibition" && languagePassed == "en"){
    fetchTimeline(expPathEn, showExp);
    fetchTimeline(exhiPathEn, showExhi)
    fetchTimeline(pressPathEn, showPress);
    showOnlyExh();
    setTimeout(filterOnlyExhi, 2000);
}
if(typePassed == "exhibition" && languagePassed == "it"){
    fetchTimeline(expPathIt, showExp);
    fetchTimeline(exhiPathIt, showExhi)
    fetchTimeline(pressPathIt, showPress);
    showOnlyExp();
    showUnderlingExhi();
    setTimeout(filterOnlyExhi, 2000);
}
if(typePassed == "press" && languagePassed == "en"){
    fetchTimeline(expPathEn, showExp);
    fetchTimeline(exhiPathEn, showExhi)
    fetchTimeline(pressPathEn, showPress);
    showOnlyPress();
    showUnderlingPress();
    setTimeout(filterOnlyPress, 2000);
}
if(typePassed == "press" && languagePassed == "it"){
    fetchTimeline(expPathIt, showExp);
    fetchTimeline(exhiPathIt, showExhi)
    fetchTimeline(pressPathIt, showPress);
    showOnlyPress();
    showUnderlingPress();
    setTimeout(filterOnlyPress, 2000);
}
if(!typePassed && languagePassed == "en"){
    fetchTimeline(exhiPathEn, showExp);
    fetchTimeline(exhiPathEn, showExhi);
    fetchTimeline(pressPathEn, showPress);
}
if(!typePassed && languagePassed == "it"){
    fetchTimeline(exhiPathIt, showExp);
    fetchTimeline(exhiPathIt, showExhi);
    fetchTimeline(pressPathIt, showPress);
}


function fetchTimeline(path, show) {
    fetching = true;
    fetch(path).then(e => e.json()).then(show)
}

function showExp(exp) {
    exp.forEach((e) => {
        let clone = templateExp.cloneNode(true);
        counter++;
        clone.querySelector('article').classList.add('needSort')
        clone.querySelector('article').classList.add('experience');
        clone.querySelector('article').setAttribute('date-string', e.acf.start_date);
        let startDate = e.acf.start_date.substring(6, 8) + " / " + e.acf.start_date.substring(4, 6) + " / " + e.acf.start_date.substring(0, 4)
        // get today
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + mm + dd
        let endDate = e.acf.end_date.substring(6, 8) + " / " + e.acf.end_date.substring(4, 6) + " / " + e.acf.end_date.substring(0, 4)

        clone.querySelector('.startDate').textContent = startDate
        clone.querySelector('.endDate').textContent = endDate

        if (startDate < today < endDate) {
            clone.querySelector('.now').style.cssText = "display:block;"
            clone.querySelector('.startDate').style.cssText = "display:none;"
            clone.querySelector('.endDate').style.cssText = "display:none;"
        }
        clone.querySelector('.job').innerHTML = e.acf.your_role_at_activity
        clone.querySelector('.collaborators').innerHTML = e.acf.what_did_you_do;
        clone.querySelector('.description').innerHTML = e.acf.place
        main.appendChild(clone)
    })
    notFetching();
    document.querySelector('body').style.height = "auto";
    document.querySelector('body').style.background = "linear-gradient(to bottom, #ffffff 0%, #f0f2f5 30%, #ffffff 100%)";

}

function showExhi(exhi) {
    exhi.forEach((e) => {
        let clone = templateExhi.cloneNode(true);
        counter++
        function isOdd(num) {
            return num % 2;
        }
        if (isOdd(counter)) {
            clone.querySelector('article').classList.add('needSort')

        } else {
            clone.querySelector('article').classList.add('needSort')

        }
        clone.querySelector('article').classList.add('exhibition');
        clone.querySelector('article').setAttribute('date-string', e.acf.start_date);
        let startDate = e.acf.start_date.substring(6, 8) + " / " + e.acf.start_date.substring(4, 6) + " / " + e.acf.start_date.substring(0, 4)
        /*define today*/
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();
        today = yyyy + mm + dd
        let endDate = e.acf.end_date.substring(6, 8) + " / " + e.acf.end_date.substring(4, 6) + " / " + e.acf.end_date.substring(0, 4)
        clone.querySelector('.startDate').textContent = startDate
        clone.querySelector('.endDate').textContent = endDate
        clone.querySelector('.title').innerHTML = e.acf.gallery_name;
        clone.querySelector('.address').innerHTML = e.acf.address_of_exhibition

        if (e.link_of_exhibition == undefined) {
            clone.querySelector('.linkIcon').classList.add('hide')
        } else {
            clone.querySelector('.link').innerHTML = e.acf.link_of_exhibition;
            clone.querySelector('.linkIcon').classList.remove('hide');
        }
        main.appendChild(clone)
    })
}

function showPress(press) {
    press.forEach((e) => {

        let clone = templatePress.cloneNode(true);
        counter++
        function isOdd(num) {
            return num % 2;
        }
        if (isOdd(counter)) {
            clone.querySelector('article').classList.add('needSort')

        } else {
            clone.querySelector('article').classList.add('needSort')
        }
        clone.querySelector('article').classList.add('press');
        clone.querySelector('article').setAttribute('date-string', e.acf.time_of_publication);
        let publicationDate = e.acf.time_of_publication.substring(6, 8) + " / " + e.acf.time_of_publication.substring(4, 6) + " / " + e.acf.time_of_publication.substring(0, 4)


        clone.querySelector('.date').textContent = publicationDate

        clone.querySelector('.title').innerHTML = e.acf.name_of_press
        clone.querySelector('.titleArticle').innerHTML = e.acf.title_of_article

        if (e.link_of_exhibition == undefined) {
            clone.querySelector('.linkIcon').classList.add('hide')
        } else {
            clone.querySelector('.link').innerHTML = e.link_of_exhibition;
            clone.querySelector('.linkIcon').classList.remove('hide');
        }
        main.appendChild(clone)
    })
}

// event type filters
document.querySelector('.expFilter').addEventListener('click', showOnlyExp);
function showOnlyExp(){
    showUnderlingExp();
    filterOnlyExp();
}
document.querySelector('.exhiFilter').addEventListener('click', showOnlyExh);
function showOnlyExh(){
    showUnderlingExhi();
    filterOnlyExhi();
}
document.querySelector('.pressFilter').addEventListener('click', showOnlyPress);
function showOnlyPress(){
    showUnderlingPress();
    filterOnlyPress();
}
document.querySelector('.allFilter').addEventListener('click', showAll);
function showAll(){
    document.querySelector('.expFilter').classList.remove('active');
    document.querySelector('.exhiFilter').classList.remove('active');
    document.querySelector('.pressFilter').classList.remove('active');
    document.querySelector('.allFilter').classList.add('active');
    document.querySelectorAll('.press').forEach(e => e.classList.remove('hide'));
    document.querySelectorAll('.exhibition').forEach(e => e.classList.remove('hide'));
    document.querySelectorAll('.experience').forEach(e => e.classList.remove('hide'));
}

// sort all input by date
function sortAll(){
    let wrapper = document.querySelector('main.timeline');
    let neetSortS = document.querySelectorAll('.needSort');
    let sortArray = [];
    neetSortS.forEach(addToArray);
    function addToArray(s){
        sortArray.push(s);
    }
    sortArray.sort(// sort() gives "in place" result, read more on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
        function (a,b){
            return b.getAttribute('date-string') - a.getAttribute('date-string');
        }
    )
    for(let i=0; i<sortArray.length; i++){
        wrapper.appendChild(sortArray[i]);
    }
    let sortedEven = document.querySelectorAll('.needSort:nth-of-type(2n)');
    sortedEven.forEach(e => e.classList.add('right'));
    let sortedOdd = document.querySelectorAll('.needSort:nth-of-type(2n+1)');
    sortedOdd.forEach(e => e.classList.add('left'));

}
setTimeout(sortAll, 2000);

/*set language*/

$('.enSet').on('click', () => {
    // when click on language button, show underling under the "all" since it's a new fetch
    document.querySelector('.allFilter').classList.add('active');
    document.querySelector('.exhiFilter').classList.remove('active');
    document.querySelector('.expFilter').classList.remove('active');
    document.querySelector('.pressFilter').classList.remove('active');
    main.innerHTML = "     <div class='line'></div>"
    fetchTimeline(expPathEn, showExp)
    fetchTimeline(exhiPathEn, showExhi)
    fetchTimeline(pressPathEn, showPress)
    setTimeout(sortAll, 2000);
})

$('.itSet').on('click', () => {
    // when click on language button, show underling under the "all" since it's a new fetch
    document.querySelector('.allFilter').classList.add('active');
    document.querySelector('.exhiFilter').classList.remove('active');
    document.querySelector('.expFilter').classList.remove('active');
    document.querySelector('.pressFilter').classList.remove('active');
    main.innerHTML = " <div class='line'></div>"
    fetchTimeline(expPathIt, showExp)
    fetchTimeline(exhiPathIt, showExhi)
    fetchTimeline(pressPathIt, showPress)
    setTimeout(sortAll, 2000);
});



function showUnderlingExp(){
    document.querySelector('.allFilter').classList.remove('active');
    document.querySelector('.exhiFilter').classList.remove('active');
    document.querySelector('.pressFilter').classList.remove('active');
    document.querySelector('.expFilter').classList.add('active');
}
function filterOnlyExp(){
    document.querySelectorAll('.experience').forEach(e => e.classList.remove('hide'));
    document.querySelectorAll('.press').forEach(e => e.classList.add('hide'));
    document.querySelectorAll('.exhibition').forEach(e => e.classList.add('hide'));
}

function showUnderlingExhi(){
    document.querySelector('.allFilter').classList.remove('active');
    document.querySelector('.expFilter').classList.remove('active');
    document.querySelector('.pressFilter').classList.remove('active');
    document.querySelector('.exhiFilter').classList.add('active');
}
function filterOnlyExhi(){
    document.querySelectorAll('.exhibition').forEach(e => e.classList.remove('hide'));
    document.querySelectorAll('.press').forEach(e => e.classList.add('hide'));
    document.querySelectorAll('.experience').forEach(e => e.classList.add('hide'));
}

function showUnderlingPress(){
    document.querySelector('.allFilter').classList.remove('active');
    document.querySelector('.exhiFilter').classList.remove('active');
    document.querySelector('.expFilter').classList.remove('active');
    document.querySelector('.pressFilter').classList.add('active');
}
function filterOnlyPress(){
    document.querySelectorAll('.press').forEach(e => e.classList.remove('hide'));
    document.querySelectorAll('.exhibition').forEach(e => e.classList.add('hide'));
    document.querySelectorAll('.experience').forEach(e => e.classList.add('hide'));
}
