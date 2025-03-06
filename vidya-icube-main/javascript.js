
let slideIndex = 0;

// Function to show slides
function showSlides() {
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    // Hide all slides
    slides.forEach((slide) => {
        slide.style.display = "none";
    });

    // Remove "active" class from all dots
    dots.forEach((dot) => {
        dot.classList.remove("active");
    });

    // Show the current slide and activate the corresponding dot
    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
}

// Function to change slides
function changeSlide(n) {
    const slides = document.querySelectorAll(".slide");
    slideIndex += n;

    // Loop back to the first slide if at the end
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    showSlides();
}

// Function to go to a specific slide
function goToSlide(n) {
    slideIndex = n;
    showSlides();
}

// Automatically change slides every 5 seconds
setInterval(() => {
    changeSlide(1);
}, 3000);

// Show the first slide initially
showSlides();
const marqueeContent = document.querySelector(".marquee-content");

marqueeContent.addEventListener("mouseenter", () => {
    marqueeContent.style.animationPlayState = "paused";
});

marqueeContent.addEventListener("mouseleave", () => {
    marqueeContent.style.animationPlayState = "running";
});