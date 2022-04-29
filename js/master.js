
// Menu Button 
var link = document.querySelector('.landing-page .header-area .navbar');
var btn = document.querySelector('#menu-btn');
btn.addEventListener('click', (e) => {
    link.classList.toggle('active');
    btn.classList.toggle('active');
    // window.onscroll = () =>
    // {
    //     link.classList.remove('active');
    //     btn.classList.remove('active');
    // }
});


// Active Link 
var navb = document.querySelectorAll('.navbar a');
navb.forEach(a => {

        a.addEventListener('click', (e) => {
            handelActive(e);
        });
});

// Set Color in Local Storge

var mainColor = localStorage.getItem("colorOption");
if(mainColor !== null){

    document.documentElement.style.setProperty('--main--color', mainColor);

    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");

        if(element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}


//toggle setting
var mySett = document.querySelector(".sett-toggle .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};

// Switch Color For Page
var colorList = document.querySelectorAll(".color-list li");
colorList.forEach(li => {
    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty('--main--color', e.target.dataset.color);

        localStorage.setItem("colorOption",  e.target.dataset.color);
        handelActive (e);
    });
});


// Switch Random Background Options

var randomBackgroundImgOption = true;//control in background 
var backgroundInterval; //clear interval

// check local storge empty or not ?
var backgLocalItem = localStorage.getItem("background-option");

if(backgLocalItem !== null) {
    if(backgLocalItem === 'true') {
        randomBackgroundImgOption = true;
    }else {
        randomBackgroundImgOption = false;
    }
    document.querySelectorAll(".random-background span").forEach(e => {
        e.classList.remove("active");
    });

    if(backgLocalItem === 'false') {
        document.querySelector(".random-background .no").classList.add("active");
    } else {
        document.querySelector(".random-background .yes").classList.add("active");
    }
}

var randomBackEle = document.querySelectorAll(".random-background span");
randomBackEle.forEach(span => {
    span.addEventListener("click", (e) => {

        handelActive (e);

        if(e.target.dataset.background === "yes") {

            randomBackgroundImgOption = true;
            randomizeImgs();

            localStorage.setItem("background-option", true);

        }else {
            randomBackgroundImgOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background-option", false);
        }
    });
});



// change background images
var landingPage = document.querySelector(".landing-page");

var imagesArray = ["h1.jpg", "h2.jpg", "h3.jpg", "h4.jpg", "h5.jpg", "h6.jpg"];


function randomizeImgs() {
    if (randomBackgroundImgOption === true) {

        backgroundInterval = setInterval(() => {
            var randomNumber = Math.floor(Math.random() * imagesArray.length);
            landingPage.style.backgroundImage = 'url("images/header/' + imagesArray[randomNumber] + '")';  
            
        }, 6000);
        

    }
}

randomizeImgs();




// select Skills Selector
var ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    // skills offset top
    var skillsOffsetTop = ourSkills.offsetTop;

    // skills outer height
    var skillsOuterHeight = ourSkills.offsetHeight;

    // height of window
    var windowHeight = this.innerHeight;

    //window scroll
    var windowScrollTop = this.pageYOffset;

    if(windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)){

        var allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }

};

// create popup with image
var ourGalary = document.querySelectorAll(".galary img");

ourGalary.forEach(img => {

    img.addEventListener('click', (e) => {

        // create overlay 
        var overlay = document.createElement('div');
        // Add Class to overlay
        overlay.className = 'popup-overlay';
        // Add overlay to body
        document.body.appendChild(overlay);

        // Create popup box
        var popupBox = document.createElement('div');
        // Add Class to popupBox
        popupBox.className = 'popup-box';

        // Create header for the image
        if(img.alt !== null) {
            // Create Heading For The Image
            var imgHeading = document.createElement("h3");
            // Create text For The Heading
            var imgText = document.createTextNode(img.alt);
            // Append The Text To The Heading
            imgHeading.appendChild(imgText);
            // Append The Heading To The popupBox
            popupBox.appendChild(imgHeading);
        }

        // Create Imge
        var popupImage = document.createElement('img');
        // Set image source
        popupImage.src = img.src; 

        // Append The Image to popup box
        popupBox.appendChild(popupImage);
        // Append the popup box to body
        document.body.appendChild(popupBox);

        // Create Close Button 
        var closeButton = document.createElement("span");
        // Add Class Name For Close Button
        closeButton.className = 'close-button'; 
        // Create Text For Close Button
        var closeButtontext = document.createTextNode("x");
        // Add The Text To Close Button
        closeButton.appendChild(closeButtontext);
        // Add The Close Button To popupBox
        popupBox.appendChild(closeButton);

        
    });
});

// Close The Popup 
document.addEventListener('click', (e) => {
    if(e.target.className == 'close-button') {

        // Remove The Current Popup
        e.target.parentElement.remove();
        // Remove Class Overlay 
        document.querySelector(".popup-overlay").remove();
    }
});

// Sellect All Bullets
var allBullets = document.querySelectorAll(".nav-bullets .bullets");

allBullets.forEach(bullet => {

    bullet.addEventListener('click', (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({

            behavior: 'smooth'
        });
    });
});

// Handel Function For Active Class
function handelActive (ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    
        element.classList.remove("active");
    
    });
    ev.target.classList.add("active");
}

//
var bulletSpan = document.querySelectorAll(".bullets-option span");
var bulletsContainer = document.querySelector(".nav-bullets");
var bulletLocal = localStorage.getItem('bullet-option');

if(bulletLocal !== null) {

    bulletSpan.forEach(span => {

        span.classList.remove('active');

    });

    if(bulletLocal === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add('active');
    }else{
        
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add('active');
    }
}



bulletSpan.forEach(span => {

    span.addEventListener("click", (e) => {
        
        if(span.dataset.display === 'show') {

            bulletsContainer.style.display = 'block';
            localStorage.setItem('bullet-option', 'block');
        }
        else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem('bullet-option', 'none');
        }
        handelActive(e);
    });
});

// Reset Button
document.querySelector('.reset-option').onclick = function(){
    
    localStorage.clear();

    // If I Storge Alot Of Things In LocalStorge I Can Remove Some Of Items From LocalStorge
    // localStorage.removeItem('colorOption');
    // localStorage.removeItem('background-option');
    // localStorage.removeItem('bullet-option');

    window.location.reload();
}