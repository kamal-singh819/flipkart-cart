const carousel = document.querySelector('.carousel-images');
const carouselDots = document.querySelector('.carousel-dots');
const carouselImages = [
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5fc9e7a7f342b6a6.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/bd4cf86703c6399a.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/5a2311ff9e965a96.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/2a531c5058aa50b3.jpeg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/ae9a1349fe262071.png?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/352e6f0f8034fab5.jpg?q=20",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d05c680ac784bef4.png?q=20"
]
const size = carouselImages.length;
let index = -1;
for (let i = 0; i < size; i++) {
    const img = document.createElement('img');
    const dot = document.createElement('div');
    img.setAttribute('src', carouselImages[i]);
    img.setAttribute('alt', 'carousel-images');
    carousel.append(img);
    dot.setAttribute('class', 'dot');
    carouselDots.append(dot);
}

function highlightDot(index, dots) {
    dots.forEach(dot => dot.style.backgroundColor = "#9f86c0");
    dots[index].style.backgroundColor = "black";
}

function currentSlide(index) {
    carousel.querySelectorAll('img').forEach(item => item.style.transform = 'unset');
    carousel.querySelectorAll('img')[index].style.transform = `translateX(-${100 * index}%)`;
    highlightDot(index, carouselDots.querySelectorAll('div'));
}

function nextItem(index) {
    index = (index + 1) % size;
    currentSlide(index);
}

setInterval(() => {
    index = (index + 1) % size;
    nextItem(index);
}, 2000);

