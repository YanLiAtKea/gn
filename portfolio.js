let template = document.querySelector('template').content;
let pageNr = 1;
let wrapper = document.querySelector('main');
let lookingForData = false;
let defaultPath;
let fetching;

function notFetching(){
    fetching=false
    //loader
    let loader = document.querySelector(".loader");
    if (fetching ==false){
        loader.classList.add("hide");}
}
// get the language setting in the URL.
//let Urlpassed = new URLSearchParams(window.location.search);
//let languagePassed = Urlpassed.get("lang");
// if there is no language argument in the URL, set it to english version
//if(!languagePassed){
//    languagePassed = "en";
//}


// fetch data based on language
defaultPath = 'https://onestepfurther.nu/cms/wp-json/wp/v2/artwork?_embed&order=desc&per_page=3&page=';

fetchArt(defaultPath);

function fetchArt(path) {
    fetching = true;
    lookingForData = true;
    fetch(defaultPath + pageNr).then(e => e.json()).then(showArts);
}

function showArts(arts){
    // the first time when no more data got fetched from backend, clear the interval of checking the bottom. no more data, no more need for checking
    if(!arts.length){
        clearInterval(checkInterval);
        console.log('no more content to load');
    }

    arts.forEach((eachArt) => {
        let clone = template.cloneNode(true);
        let largeImagePath = eachArt.acf.image1.sizes.large;
        let thumNail1 = eachArt.acf.image2
        let thumNail2 = eachArt.acf.image3
        let thumNail3 = eachArt.acf.image4
        let thumNail4 = eachArt.acf.image5
        let thumNail5 = eachArt.acf.image6
        clone.querySelector('.text a').href = "subpage.html?lang=" + languagePassed + "&id=" + eachArt.id;
        clone.querySelector('.title.eng').innerHTML = eachArt.acf['title_of_work_en'];
        clone.querySelector('.title.ita').innerHTML = eachArt.acf['title_of_work_it'];
        clone.querySelector('.year-of-creation').textContent = "(" + eachArt.acf["year_of_creation"] + ")";
        clone.querySelector('.dimension .height').textContent = eachArt.acf['dimension_height'];
        clone.querySelector('.dimension .width').textContent = eachArt.acf['dimension_width'];
        clone.querySelector('.dimension .length').textContent = eachArt.acf['dimension_length'];
        if(eachArt.acf['locaion_of_art_work_en']){
            clone.querySelector('.location.eng').innerHTML = eachArt.acf['locaion_of_art_work_en'];
        }
        if(eachArt.acf['locaion_of_art_work_it']){
            clone.querySelector('.location.ita').innerHTML = eachArt.acf['locaion_of_art_work_it'];
        }
        clone.querySelector('.description p.eng').innerHTML = eachArt.acf['technical_description_en'];
        clone.querySelector('.description p.ita').innerHTML = eachArt.acf['technical_description_it'];
        clone.querySelector('.concept p.eng').innerHTML = eachArt.acf['concept_en'];
        clone.querySelector('.concept p.ita').innerHTML = eachArt.acf['concept_it'];
        let extraInfo = false;
        if(eachArt.acf['location_of_artwork_en'] || eachArt.acf['included_in_which_exhibition'] || eachArt.acf['easter_egg_text'] || eachArt.acf['easter_egg_audio'] || eachArt.acf['included_in_which exhibition'] || eachArt.acf['expert_comment_on_piece']){
            extraInfo = true;
        }
        // if concept is too long or if there's other info, show read more (only do this when in desktop mode for now, so detect window width as well)
        if((eachArt.acf['concept_en'].length>325 || extraInfo == true) && window.innerWidth >1200){
            clone.querySelector('.dotdotdot').style.display = "inherit";
            clone.querySelector('.read-more').style.display = "inherit";
        }
        clone.querySelector('.concept-modal p').innerHTML = clone.querySelector('.concept p:not(.hide)').innerHTML;
        // get the extra info if available
        if(eachArt.acf['location_of_artwork_en'] ){
            clone.querySelector('.extra-modal .where-is-piece p').innerHTML = "- currently at: " + eachArt.acf['location_of_artwork_en'];
        }
        if(eachArt.acf['included_in_which_exhibition']){
            clone.querySelector('.included-in-exhi').classList.remove('hide');
            eachArt.acf['included_in_which_exhibition'].forEach(getEachExhi);
            function getEachExhi(ex){
                let p = document.createElement('p');
                p.innerHTML = "'" + ex['post_name'] + "'"; // this is the post name not the actual exhibition name, need to use the post ID to fetch the title of the exhibition
                clone.querySelector('.included-in-exhi').appendChild(p);
            }
                    }
        if(eachArt.acf['expert_comment_on_piece']){
            clone.querySelector('.extra-modal .review p').innerHTML = "<span class='quot-mark'>&quot;</span>" + eachArt.acf['expert_comment_on_piece'] + "&quot;";
        }
        if(eachArt.acf['which_expert']){
            clone.querySelector('.extra-modal .by-whom p').innerHTML = " by: " + eachArt.acf['which_expert'];
        }
        if(eachArt.acf['easter_egg_text']){
            clone.querySelector('.extra-modal .easter-egg p').innerHTML = eachArt.acf['easter_egg_text'];
        }
        if(eachArt.acf['easter_egg_audio']){
            clone.querySelector('audio.easter-egg-audio').src = eachArt.acf['easter_egg_audio'].url;
        }

        clone.querySelector('.big-image img').src = largeImagePath;
        clone.querySelector('.big-image img').alt = "artwork from Gabriele Nicola: '" + eachArt.acf.title_of_work_en + "'";
        clone.querySelector('.big-image img').classList.add(eachArt.acf["orientation_image1"]);
        // check to see if the large image is in horizontal or vertical format, need this to choose layout for all images
        let largeImageOrientation = eachArt.acf["orientation_image1"];
        if(largeImageOrientation == "horizontal"){
            clone.querySelector('div.img').classList.add('horizontal');
        } else {
            clone.querySelector('div.img').classList.add('vertical');
        }
        // image 2-6 are not required, so check if each of these exsist, great thumbnail only when exsist

        let thumbnailWrapper = clone.querySelector('.small-images');
        if(eachArt.acf.image2 !== false){
            clone.querySelector('.thumbnail:nth-of-type(1) img').src = eachArt.acf.image2.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(1) img').alt = "artwork from Gabriele Nicola: '" + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(1) img').classList.add(eachArt.acf["orientation_image2"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot1'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        if(eachArt.acf.image3 !== false){
            clone.querySelector('.thumbnail:nth-of-type(2) img').src = eachArt.acf.image3.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(2) img').alt = "artwork from Gabriele Nicola: '" + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(2) img').classList.add(eachArt.acf["orientation_image3"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot2'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        if(eachArt.acf.image4 !== false){
            clone.querySelector('.thumbnail:nth-of-type(3) img').src = eachArt.acf.image4.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(3) img').alt = "artwork from Gabriele Nicola: '" + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(3) img').classList.add(eachArt.acf["orientation_image4"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot3'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        if(eachArt.acf.image5 !== false){
            clone.querySelector('.thumbnail:nth-of-type(4) img').src = eachArt.acf.image5.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(4) img').alt = "artwork from Gabriele Nicola: '" + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(4) img').classList.add(eachArt.acf["orientation_image5"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot4'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        if(eachArt.acf.image6 !== false){
            clone.querySelector('.thumbnail:nth-of-type(5) img').src = eachArt.acf.image6.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(5) img').alt = "artwork from Gabriele Nicola: '" + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(5) img').classList.add(eachArt.acf["orientation_image6"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot5'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        wrapper.appendChild(clone);

        // only display the passed language
        if(languagePassed == "en"){
            showEng();
        } else if(languagePassed == "it"){
            showIta();
        }
        function showEng(){
            document.querySelectorAll('.ita').forEach(function(i){i.classList.add('hide')});
            document.querySelectorAll('.eng').forEach(function(i){i.classList.remove('hide')});
        };
        function showIta(){
            document.querySelectorAll('.eng').forEach(function(i){i.classList.add('hide')}); document.querySelectorAll('.ita').forEach(function(i){i.classList.remove('hide')});
        };

        // clicked dot turns black
        let allDots = document.querySelectorAll('.slide-dot');
        allDots.forEach(click);
        function click(a){
            a.addEventListener('click', clickedDot);
            function clickedDot(){
                let siblingDots = a.parentElement.parentElement.querySelectorAll('.slide-dot');
                siblingDots.forEach(function(e){e.style.background = "var(--light-grey)"})
                a.style.background = "var(--dark-grey)";
            }
        }

        // treat the black dots, which is linked to the first image
        let blackDots = document.querySelectorAll('.slidedot0');
        blackDots.forEach(getLargeImgSrc);
        function getLargeImgSrc(b){
            // get the original src of the large image, so that clicking on the black dot can always come back to the original image
            let originalSrc = b.parentElement.parentElement.previousElementSibling.querySelector('.big-image img').getAttribute('src');
            let originalOrientation = b.parentElement.parentElement.previousElementSibling.querySelector('.big-image img').className;
            b.addEventListener('click', setSrcAndOri);
            function setSrcAndOri(){
                b.parentElement.parentElement.previousElementSibling.querySelector('.big-image img').setAttribute('src', originalSrc);
                b.parentElement.parentElement.previousElementSibling.querySelector('.big-image img').className = originalOrientation;
            }
        }

        // update image src when click "new dot"
        let allNewDots = document.querySelectorAll('.slide-dot-new.slide-dot');
        let srcArray2 = [];
        let orientationArray = [];
        allNewDots.forEach(clickDot);
        function clickDot(d){
            // listen to click on each dot
            d.addEventListener('click',updateSrc);
            function updateSrc(){
                let indexOfDot = d.className.slice(-1); // get the last digit, class was dynamicly added to each dot, so the last digit is controled as needed
                let allImgs = d.parentElement.parentElement.parentElement.previousElementSibling.querySelectorAll('img');

                if(allImgs[indexOfDot].getAttribute('src')){
                    srcArray2 = [];
                    orientationArray = [];
                    allImgs.forEach(pushSrc);
                    function pushSrc(img){
                        srcArray2.push(img.getAttribute('src'));
                        orientationArray.push(img.className);
                    }
                }
                d.parentElement.parentElement.parentElement.previousElementSibling.className = "img " + orientationArray[indexOfDot];
                d.parentElement.parentElement.parentElement.previousElementSibling.querySelector('.big-image img').className = orientationArray[indexOfDot];
                let newSrc = srcArray2[indexOfDot];
                d.parentElement.parentElement.parentElement.previousElementSibling.querySelector('.big-image img').setAttribute('src', newSrc);
            }
        }
    })

    // click on inquire button
    document.querySelectorAll('button.inquire').forEach(function(c){c.addEventListener('click', showForm)});
    function showForm(){
        document.querySelector('.inquire-form').className = "inquire-form show";
    }
    // click on X to close box in modal
    document.querySelector('.inquire-form .closeMe').addEventListener('click', closeForm);
    function closeForm(){
        document.querySelector('.inquire-form').className = "inquire-form hide";
    }
    // click on any image/video to open modal
    let allImg = document.querySelectorAll('div.img img');
    document.querySelectorAll('div.img img').forEach(function(img){
        img.addEventListener('click', openModal);})
    function openModal(c){
        let srcArray=[];

        document.querySelector('.slideshow').classList.remove('hide');
        document.querySelector('.modal').classList.remove('hide');
        let src = c.target.getAttribute('src');
        // get the clicked project
        let projectClicked;
        let allImagesInThisProject;
        if(c.target.parentElement.className == "thumbnail"){
            projectClicked = c.target.parentElement.parentElement.parentElement;
        } else {
            projectClicked = c.target.parentElement.parentElement;
        }
        allImagesInThisProject = projectClicked.querySelectorAll('img');
        // if there is an img, with a src, then add it to the arrar
        for(let i=0; i<allImagesInThisProject.length; i++){
            if(allImagesInThisProject[i].src){
                srcArray.push(allImagesInThisProject[i].src);
            }
        }
        for(let i=0; i<srcArray.length; i++){
            if(src == srcArray[i]){
                document.querySelector('.img-in-slide-show').setAttribute('src', srcArray[i]);
                let prev = document.querySelector('.toLeft');
                let next = document.querySelector('.toRight');
                prev.addEventListener('click', showPrev);
                function showPrev(){
                    if(i>=1){
                        i--;
                    } else {
                        i = srcArray.length-1;
                    }
                    document.querySelector('.img-in-slide-show').setAttribute('src', srcArray[i])
                }
                next.addEventListener('click', showNext);
                function showNext(){
                    if(i<srcArray.length-1){
                        i++;
                    } else {
                        i=0;
                    }
                    document.querySelector('.img-in-slide-show').setAttribute('src', srcArray[i]);
                }
            }
            let closeSlideshow = document.querySelector('.closeModal');
            closeSlideshow.addEventListener('click', clearModal);
            function clearModal(){
                document.querySelector('.img-in-slide-show').setAttribute('src', '');
                document.querySelector('.modal').classList.add('hide');
                document.querySelector('.slideshow').classList.add('hide');
            }
        }
    }
    lookingForData = false;
    notFetching();
    document.querySelector('body').style.height = "auto";

    // open / close extra modal
    let extraModalTimer;
    document.querySelectorAll('p.read-more').forEach(function(rm){rm.addEventListener('click', openExtraModal)});
    let timerInterval;
    function openExtraModal(e){
        this.parentElement.parentElement.parentElement.querySelector('.extra-modal').style.display = "grid";
        // run timer if there is an easter egg to switch to
        if(this.parentElement.parentElement.parentElement.querySelector('.extra-modal .easter-egg p').textContent !== ""){
            // set timer on showing extra modal
            extraModalTimer = 0;
            timerInterval = setInterval(timerRun, 1000);
            function timerRun(){
                extraModalTimer++;
                console.log(extraModalTimer);
                if(extraModalTimer > 10){
                    clearInterval(timerInterval);
                    e.target.parentElement.parentElement.parentElement.querySelector('.extra-modal .concept-modal').classList.add('hide');
                    e.target.parentElement.parentElement.parentElement.querySelector('.easter-egg').style.display = "inherit";
                    if(e.target.parentElement.parentElement.parentElement.querySelector('.easter-egg-audio').src){
                        e.target.parentElement.parentElement.parentElement.querySelector('.easter-egg-audio').play();
                        e.target.parentElement.parentElement.parentElement.querySelector('.easter-egg-audio').playbackRate = .95;
                        e.target.parentElement.parentElement.parentElement.querySelector('.easter-egg-audio').loop = true;
                    }
                }
            }
        }
    }
    document.querySelectorAll('.extra-closeMe').forEach(function(ec){ec.addEventListener('click', closeExtraModal)});
    function closeExtraModal(){
        this.parentElement.style.display = "none";
        this.parentElement.querySelector('.concept-modal').classList.remove('hide');
        this.parentElement.querySelector('.concept-modal').classList.add('fade-out');
        this.parentElement.querySelector('.easter-egg').style.display = "none";
        this.parentElement.querySelector('.easter-egg-audio').pause();
        this.parentElement.querySelector('.easter-egg-audio').currentTime = 0; // go back to the beginning of the audio. don't resume

        clearInterval(timerInterval);
    }

    // hide concept and show easter egg text


}

function loadMore() {
    if (bottomVisible() && lookingForData === false) {
        pageNr++;
        // update path again, cuz clicking on a languange button can also trigger language change
        fetchArt(defaultPath + pageNr); //concatenate path
    }
}

let checkInterval = setInterval(loadMore, 100)

// detect when the scrolling has reached the bottom. used for trigger the fetch of next page
function bottomVisible() {
    const scrollY = window.scrollY;
    const visible = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible;
}

