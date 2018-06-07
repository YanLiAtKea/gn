// loader
let fetching;
function notFetching(){
    fetching=false
    //loader
    let loader = document.querySelector(".loader");
    if (fetching ==false){
        loader.classList.add("hide");
    }
}
let main = document.querySelector('main');
let section = document.querySelector('section');
// get the language setting in the URL.
let Urlpassed = new URLSearchParams(window.location.search);
let languagePassed = Urlpassed.get("lang");
if(!languagePassed){
    languagePassed = "en";
}

// click back button and go back to previous page
document.querySelector('.back').addEventListener('click', goBack);
function goBack(){
    console.log('go back');
    window.history.back();
}

let id= Urlpassed.get("id");
let artPath = 'https://onestepfurther.nu/cms/wp-json/wp/v2/artwork/' + id + '?_embed';

fetchArt(artPath);

function fetchArt() {
    fetching = true;
    fetch(artPath).then(e => e.json()).then(showArt);
}
function showArt(a) {
    let mainPicPath = a.acf.image1.sizes.medium;
    // dynamic generate page title using artwork name, plus artist name and type of work, for SEO
    document.title = a.acf.title_of_work_en + '| by Gabriele Nicola | Conceptual Sculpture';
    section.querySelector('h1.title.eng').innerHTML = a.acf.title_of_work_en;
    section.querySelector('h1.title.ita').innerHTML = a.acf.title_of_work_it;
    section.querySelector('.year-of-creation').textContent = "(" + a.acf.year_of_creation + ")"
    section.querySelector('.height').textContent = a.acf.dimension_height;
    section.querySelector('.length').textContent = a.acf.dimension_length;
    section.querySelector('.width').textContent = a.acf.dimension_width;
    section.querySelector('div.description p.eng').innerHTML = a.acf.technical_description_en;
    section.querySelector('.description p.ita').innerHTML = a.acf.technical_description_it;
    section.querySelector('div.concept p.eng').innerHTML = a.acf.concept_en;
    section.querySelector('.concept p.ita').innerHTML = a.acf.concept_it;
    section.querySelector('div.gallery img.image1').src = a.acf.image1.sizes.large;
    if(a.acf.image2 !== false){
    let imgThumb = document.createElement('img')
    let divThumb = document.createElement('div')
    let gallery = section.querySelector('.gallery')

    imgThumb.src = a.acf.image2.sizes.medium
    divThumb.classList.add('mainImg')

        divThumb.appendChild(imgThumb);
        gallery.appendChild(divThumb);
   }
  if(a.acf.image3 !== false){
    let imgThumb = document.createElement('img')
    let divThumb = document.createElement('div')
    let gallery = section.querySelector('.gallery')

    imgThumb.src = a.acf.image3.sizes.medium
    divThumb.classList.add('mainImg')

        divThumb.appendChild(imgThumb);
        gallery.appendChild(divThumb);
   }
     if(a.acf.image4 !== false){
    let imgThumb = document.createElement('img')
    let divThumb = document.createElement('div')
    let gallery = section.querySelector('.gallery')

    imgThumb.src = a.acf.image4.sizes.medium
    divThumb.classList.add('mainImg')

        divThumb.appendChild(imgThumb);
        gallery.appendChild(divThumb);
   }
  if(a.acf.image5 !== false){
    let imgThumb = document.createElement('img')
    let divThumb = document.createElement('div')
    let gallery = section.querySelector('.gallery')

    imgThumb.src = a.acf.image5.sizes.medium
    divThumb.classList.add('mainImg')

        divThumb.appendChild(imgThumb);
        gallery.appendChild(divThumb);
   }
  if(a.acf.image6 !== false){
    let imgThumb = document.createElement('img')
    let divThumb = document.createElement('div')
    let gallery = section.querySelector('.gallery')

    imgThumb.src = a.acf.image6.sizes.medium
    divThumb.classList.add('mainImg')

        divThumb.appendChild(imgThumb);
        gallery.appendChild(divThumb);
    }
    if(languagePassed == "it"){
        showOnlyIt();
    }
    if(languagePassed == "en"){
        showOnlyEn();
    }
    notFetching();
}

document.querySelector('.enSet').addEventListener('click', showOnlyEn);
document.querySelector('.itSet').addEventListener('click', showOnlyIt);

function showOnlyEn(){
    document.querySelector('.enSet').className = "enSet lanactive";
    document.querySelector('.itSet').className = "itSet";
    document.querySelectorAll('.ita').forEach(e => e.classList.add('hide'));
    document.querySelectorAll('.eng').forEach(e => e.classList.remove('hide'));
}
function showOnlyIt(){
    document.querySelector('.itSet').className = "itSet lanactive";
    document.querySelector('.enSet').className = "enSet";
    document.querySelectorAll('.ita').forEach(e => e.classList.remove('hide'));
    document.querySelectorAll('.eng').forEach(e => e.classList.add('hide'));
}

// open / close modal
document.querySelector('.inquire').addEventListener('click', function(){document.querySelector('.modal').style.display = "inherit"});
document.querySelector('.closeMe').addEventListener('click', function(){document.querySelector('.modal').style.display = "none"});
