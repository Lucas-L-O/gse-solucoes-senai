const track = document.querySelector('.carousel-track');
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');

let currentIndex = 0;
const slideWidth = document.querySelector('.oferta').offsetWidth;

nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= track.children.length) currentIndex = 0; // Reinicia ao final
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
});

prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) currentIndex = track.children.length - 1; // Volta ao último
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
});
