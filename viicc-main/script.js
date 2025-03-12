document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const navbarTop = navbar.offsetTop;

    function handleScroll() {
        if (window.pageYOffset >= navbarTop) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    }

    window.addEventListener('scroll', handleScroll);
});