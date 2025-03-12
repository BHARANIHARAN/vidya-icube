// Custom cursor animation
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Double-click functionality for startup cards
    const startupCards = document.querySelectorAll('.startup-card');
    startupCards.forEach(card => {
        card.addEventListener('dblclick', () => {
            const url = card.getAttribute('data-url');
            if (url) {
                window.open(url, '_blank');
            }
        });
    });

    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const banner = document.querySelector('.banner');
    let isHovering = false;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let speed = 0.15;

    function animate() {
        // Smooth cursor movement
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = cursorX + 'px';
        cursorFollower.style.top = cursorY + 'px';
        
        requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Check if cursor is in banner
        const bannerRect = banner.getBoundingClientRect();
        if (mouseY >= bannerRect.top && mouseY <= bannerRect.bottom) {
            if (!isHovering) {
                cursor.style.transform = 'scale(1.2)';
                cursorFollower.style.transform = 'scale(1.5)';
                cursorFollower.style.border = '1px solid rgba(255, 203, 5, 0.5)';
                cursorFollower.style.backgroundColor = 'rgba(255, 203, 5, 0.1)';
            }
        } else {
            if (!isHovering) {
                cursor.style.transform = '';
                cursorFollower.style.transform = '';
                cursorFollower.style.border = '2px solid #ffcb05';
                cursorFollower.style.backgroundColor = 'transparent';
            }
        }
    });

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .interactive, .startup-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            isHovering = true;
            cursor.style.transform = 'scale(1.5)';
            cursorFollower.style.transform = 'scale(2)';
            cursorFollower.style.backgroundColor = 'rgba(255, 203, 5, 0.15)';
            cursorFollower.style.border = '1px solid rgba(255, 203, 5, 0.6)';
            
            // Add transition class to the element
            element.classList.add('element-hover');
        });

        element.addEventListener('mouseleave', () => {
            isHovering = false;
            cursor.style.transform = '';
            cursorFollower.style.transform = '';
            cursorFollower.style.backgroundColor = 'transparent';
            cursorFollower.style.border = '2px solid #ffcb05';
            
            // Remove transition class from the element
            element.classList.remove('element-hover');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
});

// Add particles background
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 300
            }
        },
        color: {
            value: '#4169E1'  // Royal Blue particles
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6495ED',  // Cornflower Blue for connecting lines
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: true,
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});