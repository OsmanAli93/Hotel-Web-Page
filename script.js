// Hero Banner Slideshow

let bannerIndex = 0;
const bannerSlides = document.querySelectorAll('.slides-wrapper');
const bannerDots = document.querySelectorAll('.dot');
const bannerBtn = document.querySelectorAll('.arrow');


function autoBannerSlideshow () {
    
    // Iterate through each elements and find an active class, set it to none
    bannerSlides.forEach((slides) => {
        slides.className = slides.className.replace(' active', '');
    })
    // Iterate through each elements and find an active class, set it to none
    bannerDots.forEach((dot) => {
        dot.className = dot.className.replace(' active', '');
    })
    // Increase banner index 
    bannerIndex++;
    // Check if index is greater than banner length , if true set it back to 0
    if (bannerIndex > bannerSlides.length) {bannerIndex = 1}
    // Set each slides class name to  active
    bannerSlides[bannerIndex-1].className += ' active';
    bannerDots[bannerIndex-1].className += ' active';
    // Get  new slides every 10 seconds
    setTimeout(autoBannerSlideshow, 10000);
}

autoBannerSlideshow();


function bannerSlidesOnclick () {
    // Iterate through each elements and find an active class, set it to none
    bannerSlides.forEach((slides) => {
        slides.className = slides.className.replace(' active', '');
    })
    // Iterate through each elements and find an active class, set it to none
    bannerDots.forEach((dot) => {
        dot.className = dot.className.replace(' active', '');
    })
    
     // Check if index is greater than banner length , if true set it back to 0 else set it back to lenght
    if (bannerIndex > bannerSlides.length) {bannerIndex = 1}
    else if (bannerIndex < 1) {bannerIndex = bannerSlides.length}
    // Set each slides class name to  active
    bannerSlides[bannerIndex-1].className += ' active';
    bannerDots[bannerIndex-1].className += ' active';

}

function bannerDotOnclick () {

    const value = this.dataset.index;
    
    if (value) {
        bannerSlidesOnclick(bannerIndex = value);
    }
}

bannerBtn.forEach((btn) => btn.addEventListener('click', function(){
    if (this.classList.contains('slider-arrow-prev')){
        bannerSlidesOnclick(bannerIndex--)
    } else {
        bannerSlidesOnclick(bannerIndex++)
    }
}));

bannerDots.forEach((dot) => dot.addEventListener('click', bannerDotOnclick));

// Parallax Background

const parallaxBg = document.querySelectorAll('.parallax');

function parallaxBackground () {
    
    parallaxBg.forEach((bg) => {
        // Cache offset top of parallax elements
        let offset = bg.getBoundingClientRect().top
        bg.style.backgroundPosition = '50%' + (-offset * 0.5) + 'px';
    })
}

window.addEventListener('scroll', parallaxBackground);

// Countdown Timer 

function countDownTimer () {
    // Set the time we're counting down to
    const countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

    let timer = setInterval(() => {
        // Get current time
        const now = new Date().getTime();   
        // Subtract the date we're counting down to current time
        const distance = countDownDate - now;
        // Time calculation  for weeks, days, hours, minutes and seconds
        let weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
        let days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Display the countdown
        document.querySelector('#weeks').innerHTML = `${weeks}`;
        document.querySelector('#days').innerHTML = `${days}`;
        document.querySelector('#hours').innerHTML = `${hours}`;
        document.querySelector('#minutes').innerHTML = `${minutes}`;
        document.querySelector('#seconds').innerHTML = `${seconds}`;
        // If countdown reach 0, clear the timer
        if (distance <= 0) {
            clearInterval(timer);
            
        }
        
    }, 1000);
}

countDownTimer();

// Lightbox Gallery

let lightboxIndex = 0;
let slides = ['/img/img_1.jpg', '/img/img_2.jpg', '/img/img_3.jpg', '/img/img_4.jpg', '/img/img_5.jpg', '/img/img_6.jpg', '/img/img_7.jpg', '/img/img_4.jpg'];
let num = ['1', '2', '3', '4', '5', '6', '7', '8'];
const galleryItems = document.querySelectorAll('.gallery-item');
const lightboxModal = document.querySelector('.gallery-modal');
const imageHolder = document.querySelector('#image-holder');
const galleryBtn = document.querySelectorAll('.gallery-btn');
const captionText = document.querySelector('.counter');

function lightBoxSlides () {

    if (lightboxIndex > slides.length - 1) {lightboxIndex = 0}
    else if (lightboxIndex < 0) {lightboxIndex = slides.length - 1}

    imageHolder.src = slides[lightboxIndex];
    captionText.textContent = `${num[lightboxIndex]} of 8`;

}

galleryBtn.forEach((galleryBtn) => galleryBtn.addEventListener('click', function(){
    if (this.classList.contains('gallery-prev')) {
        lightBoxSlides(lightboxIndex--);
    } else {
        lightBoxSlides(lightboxIndex++);
    }
}));

function openLightbox () {
    const imageIndex = this.dataset.image;
    
    lightboxModal.style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    lightboxIndex = imageIndex;
    imageHolder.src = slides[imageIndex];
    captionText.textContent = `${num[imageIndex]} of 8`;

}

galleryItems.forEach((items) => items.addEventListener('click', openLightbox));
window.addEventListener('click', function(e) {

    if(e.target.classList.contains('gallery-modal')) {
        e.target.style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
    }
})

// Event Slideshow

let slideCounter = 0;
let eventDots = document.querySelectorAll('.event-dot');
const eventSlider = document.querySelector('.event-slide');
const eventItem = document.querySelectorAll('.event-item');
const size = eventItem[0].offsetWidth;
const eventNext = document.querySelectorAll('.event-btn');



function nextEventCarousel () {

    eventSlider.style.transform = 'translateX(' + (-size * slideCounter) + 'px)';
    eventSlider.style.transition = 'transform 0.25s ease-in-out';

    if (slideCounter > 6) {
        slideCounter = 0;
        eventSlider.style.transform = 'translateX(0px)';
        eventSlider.style.transition = 'none';

    } else if (slideCounter < 0) {

        slideCounter = 6;
        eventSlider.style.transform = 'translateX(' + (-size * slideCounter) + 'px)';
        eventSlider.style.transition = 'none';
    }
    console.log(slideCounter);
    activeEventDots();
}


function mobileDotsOnClick (e) {
    const target = e.target.dataset.slide;
    
    if (target) {
        slideCounter = target;
        eventSlider.style.transform = 'translateX(' + (-size * slideCounter) + 'px)';
        eventSlider.style.transition = 'transform 0.25s ease-in-out';
        console.log(true);
    }
}


function slidesOndotsClick () {
    
    const target = this.dataset.slide;

    if (target === '1') {
        slideCounter = target * 3;
        eventSlider.style.transform = 'translateX(' + (-size * slideCounter) + 'px)';
        eventSlider.style.transition = 'transform 0.25s ease-in-out';

    } else if (target === '2') {
        slideCounter = target * 3;
        eventSlider.style.transform = 'translateX(' + (-size * slideCounter) + 'px)';
        eventSlider.style.transition = 'transform 0.25s ease-in-out';

    } else if (target === '0') {
        slideCounter = 0;
        eventSlider.style.transform = 'translateX(0px)';
        eventSlider.style.transition = 'transform 0.25s ease-in-out';
    }

    activeEventDots();
    
}


function activeEventDots () {

    if (slideCounter === 3) {
        eventDots[0].classList.remove('active');
        eventDots[1].classList.add('active');
        eventDots[2].classList.remove('active');
    }

    if (slideCounter === 6) {
        eventDots[0].classList.remove('active');
        eventDots[1].classList.remove('active');
        eventDots[2].classList.add('active');

    } else if (slideCounter === 0) {
        eventDots[0].classList.add('active');
        eventDots[1].classList.remove('active');
        eventDots[2].classList.remove('active');

    }
   
}   

eventDots.forEach((eventDot) => eventDot.addEventListener('click', slidesOndotsClick));

eventNext.forEach((eventBtn) => eventBtn.addEventListener('click', function(){
    if (this.classList.contains('event-prev')) {
        nextEventCarousel(slideCounter--);
    } else {
        nextEventCarousel(slideCounter++);
    }
}))


// Local Storage 
"use strict"

const form = document.querySelector('#reserveForm');
const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
const output = document.querySelector('#output');



function saveBookings (e) {
    e.preventDefault();

    const dateIn = document.querySelector('#checkIn').value;
    const dateOut = document.querySelector('#checkOut').value;
    const guest = document.querySelector('#guest').value;

    const booking = {
        checkIn: dateIn,
        checkOut: dateOut,
        total: guest
    };

    
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    fetchBookings(bookings, output);
    this.reset();

    console.log(bookings);
}

function fetchBookings (bookingList = [], outputList) {

    outputList.innerHTML = bookingList.map(book => {

        const timeIn = book.checkIn;
        const timeOut = book.checkOut;
        const total = book.total;

        return `
                <tr>
                    <td>${timeIn}</td>
                    <td>${timeOut}</td>
                    <td>${total}</td>
                    <td><button class="btn btn-danger mb-3" data-target="${total}">Delete</button></td>
                </tr>
                `

    }).join('');

    limitBookingList();
}

function deleteBookings (e) {

    if (!e.target.matches('button')) return;

    bookings.forEach(book => {
        if (book.total === e.target.dataset.target) {
            
            bookings.splice(book, 1);
        }

    })

    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    fetchBookings(bookings, output);
}

function limitBookingList () {

    for (let i = 0; i < bookings.length; i++) {
        if (bookings.length >= 5) {
            
            document.querySelector('#submitBtn').disabled = true;
            
        } else {

            document.querySelector('#submitBtn').disabled = false;
        }

    
    }
}


fetchBookings(bookings, output);

form.addEventListener('submit', saveBookings);
output.addEventListener('click', deleteBookings);

console.log(bookings);

// Javascript Media Queries

const mobileWidth = window.matchMedia('(max-width: 600px)');

function mediaQueriesListener (mobileWidth) {

    if (mobileWidth.matches) {
        console.log(true);
       
        window.removeEventListener('scroll', parallaxBackground);
        
    } else {

        window.addEventListener('scroll', parallaxBackground);
    }


}

mobileWidth.addListener(mediaQueriesListener);