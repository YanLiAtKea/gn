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
let expPath = 'https://onestepfurther.nu/cms/wp-json/wp/v2/experience?_embed&per_page=50'; // per page is now set to 50, need to be more than the actual post number, so remember to change this when there're more events added to the backend
let exhiPath = 'https://onestepfurther.nu/cms/wp-json/wp/v2/exhibition?_embed&per_page=50';
let pressPath = 'https://onestepfurther.nu/cms/wp-json/wp/v2/press?_embed&per_page=50';
let counter = 0

// get the language setting in the URL
//let Urlpassed = new URLSearchParams(window.location.search);
//let languagePassed = Urlpassed.get("lang");
/*
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
    fetchTimeline(exhiPath, showExp);
    fetchTimeline(exhiPath, showExhi);
    fetchTimeline(pressPath, showPress);
}
if(!typePassed && languagePassed == "it"){
    fetchTimeline(exhiPath, showExp);
    fetchTimeline(exhiPath, showExhi);
    fetchTimeline(pressPath, showPress);
}

*/

// get today
var today = new Date();
var dd = today.getDate();
if(dd<10){
    dd = '0'+ dd;
}
var mm = today.getMonth() + 1; //January is 0!
if(mm<10){
    mm = '0'+ mm;
}
var yyyy = today.getFullYear();
today = yyyy.toString() + mm.toString() + dd.toString();

fetchTimeline(expPath, showExp);
fetchTimeline(exhiPath, showExhi);
//fetchTimeline(pressPath, showPress);
function fetchTimeline(path, show) {
    fetching = true;
    fetch(path).then(e => e.json()).then(show);
}

function showExp(exp) {
    exp.forEach((e) => {
        let clone = templateExp.cloneNode(true);
        clone.querySelector('article').classList.add('needSort')
        clone.querySelector('article').classList.add('experience');
        clone.querySelector('article').setAttribute('date-string', e.acf['end_date']);
        let startDate = e.acf.start_date.substring(6, 8) + " / " + e.acf.start_date.substring(4, 6) + " / " + e.acf.start_date.substring(0, 4);
        let endDate = e.acf.end_date.substring(6, 8) + " / " + e.acf.end_date.substring(4, 6) + " / " + e.acf.end_date.substring(0, 4);
        clone.querySelector('.startDate').textContent = startDate;
        clone.querySelector('.endDate').textContent = endDate;
        // compare with today to decide if "now" or "upcoming" should be displayed
        if(e.acf['start_date'] > today){
            clone.querySelector('.upcoming').classList.remove('hide');
        }
        if(e.acf['start_date'] <= today && e.acf['end_date'] >= today){
            clone.querySelector('.now').classList.remove('hide');
        }
        clone.querySelector('.place.eng').innerHTML = e.acf['place_en'];
        clone.querySelector('.place.ita').innerHTML = e.acf['place_it'];
        clone.querySelector('.job.eng').innerHTML = e.acf['your_role_en'];
        clone.querySelector('.job.ita').innerHTML = e.acf['your_role_it'];
        clone.querySelector('.collaborators.eng').innerHTML = e.acf.what_did_you_do_en;
        clone.querySelector('.collaborators.ita').innerHTML = e.acf.what_did_you_do_it;
        if(e.acf['link_to_the_experience']){
            clone.querySelector('a.link').classList.remove('hide');
            clone.querySelector('a.link').setAttribute('href', e.acf['link_to_the_experience'])
        }
        main.appendChild(clone);
        preFilter();
    })
    notFetching();
}
function preFilter(){
    // only show the chosen or passed language
    if(languagePassed == "it"){
        document.querySelectorAll('.eng').forEach(function(i){i.classList.add('hide')});
        document.querySelectorAll('.ita').forEach(function(i){i.classList.remove('hide')})
    }
    if(languagePassed == "en"){
        document.querySelectorAll('.eng').forEach(function(i){i.classList.remove('hide')});
        document.querySelectorAll('.ita').forEach(function(i){i.classList.add('hide')})
    }
}
function showExhi(exhi) {
    exhi.forEach((e) => {
        let clone = templateExhi.cloneNode(true);
        clone.querySelector('article').classList.add('exhibition');
        // prepare for sorting later
        clone.querySelector('article').classList.add('needSort')
        clone.querySelector('article').setAttribute('date-string', e.acf.end_date);

        let startDate = e.acf.start_date.substring(6, 8) + " / " + e.acf.start_date.substring(4, 6) + " / " + e.acf.start_date.substring(0, 4);
        let endDate = e.acf.end_date.substring(6, 8) + " / " + e.acf.end_date.substring(4, 6) + " / " + e.acf.end_date.substring(0, 4)

        // compare with today to decide if "now" or "upcoming" should be displayed
        if(e.acf['start_date'] > today){
            clone.querySelector('.upcoming').classList.remove('hide');
        }
        if(e.acf['start_date'] <= today && e.acf['end_date'] >= today){
            clone.querySelector('.now').classList.remove('hide');
        }
        clone.querySelector('.startDate').textContent = startDate;
        clone.querySelector('.endDate').textContent = endDate;
        clone.querySelector('.title.eng').innerHTML = e.acf['exhibition_name_en'];
        clone.querySelector('.title.ita').innerHTML = e.acf['exhibition_name_it'];
        clone.querySelector('.place.eng').innerHTML = e.acf['exhibition_place_en'];
        clone.querySelector('.place.ita').innerHTML = e.acf['exhibition_place_it'];
        if (!e.acf['link_to_exhibition']) {
            clone.querySelector('a.link').classList.add('hide')
        } else {
            clone.querySelector('a.link').setAttribute('href', e.acf['link_to_exhibition']);
            clone.querySelector('a.link').classList.remove('hide');
        }
        if(e.acf['which_piece_is_shown']){
            // get how many pieces are included
            let allInclude = e.acf['which_piece_is_shown'];
            for(let n=0; n<allInclude.length; n++){
                let eachPiece = document.createElement('a');
                let pieceID = allInclude[n].ID;
                //fetch the artwork based on id, need both english and italian names
                let rootPath = "https://onestepfurther.nu/cms/wp-json/wp/v2/artwork/";
                fetch(rootPath+pieceID).then(e => e.json()).then(getBothNames);
                function getBothNames(a){
                    let engName = a.acf['title_of_work_en'];
                    let itaName = a.acf['title_of_work_it'];
                    eachPiece.innerHTML = "<p class='eng'>&quot;" + engName + "&quot;</p> <p class='ita'>&quot;" + itaName + "&quot;</p>";
                    eachPiece.setAttribute('href', "/subpage.html?id="+pieceID);
                    preFilter();
                }
                clone.querySelector('p.piece').appendChild(eachPiece);
            }
        }
        main.appendChild(clone);
        preFilter();
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
        main.appendChild(clone);
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
///////////////
    document.querySelector('body').style.height = "auto";
    document.querySelector('body').style.background = "linear-gradient(to bottom, #ffffff 0%, #f0f2f5 30%, #ffffff 100%)";

}
setTimeout(sortAll, 2000);


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
