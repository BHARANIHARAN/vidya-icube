// Animation helper functions
function animateElement(element, animation, duration = '0.5s') {
    element.style.animation = `${animation} ${duration} forwards`;
}

function addIntersectionObserver() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                if (entry.target.dataset.animation) {
                    animateElement(entry.target, entry.target.dataset.animation);
                }
                observer.unobserve(entry.target);
            }
        });
    }, options);

    // Observe all animatable elements
    document.querySelectorAll('[data-animation]').forEach(el => observer.observe(el));
    document.querySelectorAll('.opportunity-card').forEach(el => observer.observe(el));
}

// Enhanced slideshow functionality
let slideIndex = 0;
let slides = null;
let dots = null;
let slideInterval = null;

function initializeSlideshow() {
    slides = document.getElementsByClassName("slide");
    dots = document.getElementsByClassName("dot");
    
    // Add parallax effect to slide images
    Array.from(slides).forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            window.addEventListener('mousemove', (e) => {
                if (slide.style.display === 'block') {
                    const mouseX = e.clientX / window.innerWidth - 0.5;
                    const mouseY = e.clientY / window.innerHeight - 0.5;
                    img.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
                }
            });
        }
    });

    showSlides();
    startSlideshow();
}

function startSlideshow() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(() => changeSlide(1), 5000);
}

function changeSlide(n, manual = true) {
    if (manual) {
        // Add transition effect
        const currentSlide = slides[slideIndex];
        currentSlide.style.animation = 'fadeOut 0.5s forwards';
    }

    slideIndex += n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    showSlides();
    if (manual) startSlideshow();
}

function showSlides() {
    if (!slides || !dots) return;

    Array.from(slides).forEach((slide, i) => {
        slide.style.display = "none";
        dots[i].classList.remove("active");
    });

    slides[slideIndex].style.display = "block";
    slides[slideIndex].style.animation = 'fadeIn 0.5s forwards';
    dots[slideIndex].classList.add("active");

    // Animate slide content
    const content = slides[slideIndex].querySelector('.slide-content');
    if (content) {
        content.style.animation = 'none';
        content.offsetHeight; // Trigger reflow
        content.style.animation = 'fadeInUp 0.8s forwards';
    }
}

function goToSlide(n) {
    if (!slides || !dots) return;
    
    // Add transition effect to current slide
    const currentSlide = slides[slideIndex];
    currentSlide.style.animation = 'fadeOut 0.5s forwards';
    
    // Update slide index
    slideIndex = n;
    
    showSlides();
    startSlideshow(); // Reset the automatic slideshow timer
}

// Enhanced modal functionality
function toggleApplyModal() {
    const modal = document.getElementById('applyModal');
    if (!modal) return;

    if (modal.style.display !== "block") {
        modal.style.display = "block";
        modal.style.animation = 'fadeIn 0.3s forwards';
        document.body.style.overflow = 'hidden';
    } else {
        modal.style.animation = 'fadeOut 0.3s forwards';
        setTimeout(() => {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Enhanced form handling
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Animate button during submission
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    submitBtn.disabled = true;

    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        startup: form.querySelector('#startup').value,
        description: form.querySelector('#description').value
    };

    if (!validateForm(formData)) {
        submitBtn.innerHTML = 'Submit Application';
        submitBtn.disabled = false;
        return;
    }

    // Simulate API call
    setTimeout(() => {
        showNotification('Application submitted successfully! We will contact you soon.', 'success');
        form.reset();
        submitBtn.innerHTML = 'Submit Application';
        submitBtn.disabled = false;
        toggleApplyModal();
    }, 1500);
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }

    for (let key in data) {
        if (!data[key].trim()) {
            showNotification('Please fill in all fields.', 'error');
            return false;
        }
    }

    return true;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);
    
    // Animate notification
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Particle animation for hero section
function createParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        hero.appendChild(particle);
    }
}

// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Apply button dropdown handling
    const applyBtn = document.getElementById('applyBtn');
    const applyDropdown = document.getElementById('applyDropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // Toggle apply dropdown
    applyBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        applyDropdown.classList.toggle('active');
        
        // Reset animation
        dropdownItems.forEach(item => {
            item.style.animation = 'none';
            item.offsetHeight; // Trigger reflow
            item.style.animation = null;
        });
    });

    // Navigation dropdowns handling
    const navDropdowns = document.querySelectorAll('.navbar .dropdown');
    
    navDropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const content = dropdown.querySelector('.dropdown-content');
        
        if (trigger && content) {
            // Click handling
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // Close other nav dropdowns
                navDropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                dropdown.classList.toggle('active');
            });

            // Hover handling
            dropdown.addEventListener('mouseenter', () => {
                navDropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                dropdown.classList.add('active');
            });

            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Nested dropdowns (Funding and Competition)
    const nestedDropdowns = document.querySelectorAll('.nested-dropdown');
    
    nestedDropdowns.forEach(nested => {
        const trigger = nested.querySelector('.nested-trigger');
        const content = nested.querySelector('.nested-content');
        
        if (trigger && content) {
            // Handle hover for nested dropdowns
            trigger.addEventListener('mouseenter', () => {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
                content.style.transform = 'translateX(0)';
            });

            nested.addEventListener('mouseleave', () => {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.transform = 'translateX(10px)';
            });

            // Handle click for nested dropdowns
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isVisible = content.style.visibility === 'visible';
                
                if (!isVisible) {
                    content.style.opacity = '1';
                    content.style.visibility = 'visible';
                    content.style.transform = 'translateX(0)';
                } else {
                    content.style.opacity = '0';
                    content.style.visibility = 'hidden';
                    content.style.transform = 'translateX(10px)';
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            // Close apply dropdown
            applyBtn.classList.remove('active');
            applyDropdown.classList.remove('active');
            
            // Close nav dropdowns
            navDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Close nested dropdowns
            nestedDropdowns.forEach(nested => {
                const content = nested.querySelector('.nested-content');
                if (content) {
                    content.style.opacity = '0';
                    content.style.visibility = 'hidden';
                    content.style.transform = 'translateX(10px)';
                }
            });
        }
    });

    // Handle apply dropdown item clicks
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const type = this.getAttribute('data-type');
            
            // Add ripple effect
            const ripple = document.createElement('div');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // Get click coordinates
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 1000);

            // Close dropdown with delay for animation
            setTimeout(() => {
                applyBtn.classList.remove('active');
                applyDropdown.classList.remove('active');
                console.log(`Selected ${type} funding`);
            }, 300);
        });
    });
});

// Navigation dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const navDropdowns = document.querySelectorAll('.navbar .dropdown');

    // Handle dropdown clicks
    navDropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        
        dropdownLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close all other dropdowns
            navDropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove('active');
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle('active');
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar .dropdown')) {
            navDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});

// Vision & Mission card flip functionality
document.addEventListener('DOMContentLoaded', function() {
    const vmCards = document.querySelectorAll('.vm-card');
    
    vmCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const content = dropdown.querySelector('.dropdown-content');

        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                content.style.display = 'none';
            });
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            dropdowns.forEach(dropdown => {
                const content = dropdown.querySelector('.dropdown-content');
                content.style.removeProperty('display');
            });
        }
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSlideshow();
    addIntersectionObserver();
    createParticles();

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just "#"
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close dropdown if open
                const dropdownContent = this.closest('.dropdown-content');
                if (dropdownContent) {
                    dropdownContent.style.display = 'none';
                    setTimeout(() => {
                        dropdownContent.style.display = '';
                    }, 500);
                }
            }
        });
    });

    // Add form submission handler
    const applicationForm = document.getElementById('applicationForm');
    if (applicationForm) {
        applicationForm.addEventListener('submit', handleFormSubmit);
    }

    // Add hover effect to cards
    document.querySelectorAll('.opportunity-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-hover)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });

    // Handle nested dropdowns
    document.querySelectorAll('.nested-dropdown').forEach(dropdown => {
        const trigger = dropdown.querySelector('.nested-trigger');
        const content = dropdown.querySelector('.nested-content');
        
        // Prevent parent dropdown from closing when clicking nested content
        content.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Prevent closing when hovering out briefly between parent and child dropdown
        let timeout;
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeout);
        });
        
        dropdown.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                content.style.transform = 'translateX(10px)';
            }, 300);
        });
    });
});
