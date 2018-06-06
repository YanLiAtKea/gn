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

// back to list
document.querySelector('.back').addEventListener('click', goBack);
function goBack(){
    let originalHref = document.querySelector('.back').parentElement.getAttribute('href');
    document.querySelector('.back').parentElement.setAttribute('href', originalHref + "?lang=" + languagePassed);
}

// if there is no language argument in the URL, set it to english version
if(!languagePassed){
    languagePassed = "en";
}
let id= Urlpassed.get("id");
let artPath = 'https://onestepfurther.nu/cms/wp-json/wp/v2/artwork_' + languagePassed + '/' + id + '?_embed';

fetchArt(artPath);

function fetchArt() {
    fetching = true;
    fetch(artPath).then(e => e.json()).then(showArt);
}
function showArt(a) {
    let mainPicPath = a.acf.image1.sizes.medium;
    // dynamic generate page title using artwork name, plus artist name and type of work, for SEO
    document.title = a.acf.title_of_artwork + '| Gabriele Nicola | Conceptual Sculpture';
    section.querySelector('.title').innerHTML = a.acf.title_of_artwork;
    section.querySelector('.year').textContent = "(" + a.acf.year_of_work + ")"
    section.querySelector('.height').textContent = a.acf.dimension_height;
    section.querySelector('.length').textContent =
        a.acf.dimension_length;
    section.querySelector('.width').textContent = a.acf.dimension_width;
    section.querySelector('.sculpture').src = mainPicPath;
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
    section.querySelector('.des').nextElementSibling.textContent = a.acf.technical_description;
    section.querySelector('.con').nextElementSibling.innerHTML = a.acf.concept;
    notFetching()
}
