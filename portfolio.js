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
        clone.querySelector('.big-image img').src = largeImagePath;
        clone.querySelector('.big-image img').alt = "artwork from Gabriele Nicola:' " + eachArt.acf.title_of_work_en + "'";
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
            clone.querySelector('.thumbnail:nth-of-type(1) img').alt = "artwork from Gabriele Nicola:' " + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(1) img').classList.add(eachArt.acf["orientation_image2"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot1'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        if(eachArt.acf.image3 !== false){
            clone.querySelector('.thumbnail:nth-of-type(2) img').src = eachArt.acf.image3.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(2) img').alt = "artwork from Gabriele Nicola:' " + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(2) img').classList.add(eachArt.acf["orientation_image3"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot2'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        if(eachArt.acf.image4 !== false){
            clone.querySelector('.thumbnail:nth-of-type(3) img').src = eachArt.acf.image4.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(3) img').alt = "artwork from Gabriele Nicola:' " + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(3) img').classList.add(eachArt.acf["orientation_image4"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot3'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        if(eachArt.acf.image5 !== false){
            clone.querySelector('.thumbnail:nth-of-type(4) img').src = eachArt.acf.image5.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(4) img').alt = "artwork from Gabriele Nicola:' " + eachArt.acf.title_of_work_en + "'";
            clone.querySelector('.thumbnail:nth-of-type(4) img').classList.add(eachArt.acf["orientation_image5"]);
            let newDot = document.createElement('div');
            newDot.innerHTML = "<div class='slide-dot slide-dot-new slidedot4'></div>";
            clone.querySelector('.only-next').append(newDot);
        }
        if(eachArt.acf.image6 !== false){
            clone.querySelector('.thumbnail:nth-of-type(5) img').src = eachArt.acf.image6.sizes.large;
            clone.querySelector('.thumbnail:nth-of-type(5) img').alt = "artwork from Gabriele Nicola:' " + eachArt.acf.title_of_work_en + "'";
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
    document.querySelectorAll('button.inquire').forEach(function(c){c.addEventListener('click', showForm)})
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
