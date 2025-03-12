document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Navbar dropdown functionality
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

    // Apply button dropdown
    const applyBtn = document.getElementById('applyBtn');
    const applyDropdown = document.getElementById('applyDropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    if (applyBtn && applyDropdown) {
        applyBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            applyDropdown.classList.toggle('active');
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
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            // Close apply dropdown
            if (applyBtn && applyDropdown) {
                applyBtn.classList.remove('active');
                applyDropdown.classList.remove('active');
            }
            
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

    // Smooth scroll for facility navigation
    document.querySelectorAll('.facility-nav-item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Parallax effect for banner
    const banner = document.querySelector('.facilities-banner');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (banner) {
            banner.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    // Active state for facility navigation
    const navItems = document.querySelectorAll('.facility-nav-item');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Book Now button effect
    const bookNowBtn = document.querySelector('.book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', function() {
            // Add your booking logic here
            console.log('Book Now clicked');
        });
    }

    // Custom Cursor Effect
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
        
        // Scale effect when hovering over interactive elements
        const target = e.target;
        if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.classList.contains('interactive')) {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(255, 215, 0, 0.2)';
        } else {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'rgba(255, 215, 0, 0.3)';
        }
    });

    // Hide cursor when leaving the banner
    banner.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });

    banner.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });

    // Particle Effect
    const particlesContainer = document.querySelector('.particles');
    let particles = [];
    const particleCount = 30;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFade ${2 + Math.random() * 2}s ease-out`;
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
            createParticle();
        }, 4000);

        particles.push(particle);
    }

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 100);
    }

    // Mouse trail effect
    banner.addEventListener('mousemove', (e) => {
        const rect = banner.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animation = 'particleFade 1s ease-out';
        particlesContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1000);
    });

    // Clean Room Lab Search Functionality
    const searchInput = document.querySelector('.search-box input');
    const equipmentRows = document.querySelectorAll('.equipment-table tbody tr');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            equipmentRows.forEach(row => {
                const equipmentName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                if (equipmentName.includes(searchTerm)) {
                    row.style.display = '';
                    row.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // Table Row Hover Effect
    equipmentRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            const cells = this.querySelectorAll('td');
            cells.forEach((cell, index) => {
                cell.style.transform = 'translateX(10px)';
                cell.style.transition = `transform 0.3s ease ${index * 0.05}s`;
            });
        });

        row.addEventListener('mouseleave', function() {
            const cells = this.querySelectorAll('td');
            cells.forEach(cell => {
                cell.style.transform = 'translateX(0)';
            });
        });
    });

    // Status Badge Animation
    const statusBadges = document.querySelectorAll('.status-badge');
    statusBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Book Lab Button Effect
    const bookLabBtn = document.querySelector('.book-lab-btn');
    if (bookLabBtn) {
        bookLabBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px)';
            }, 150);
        });
    }

    // Image Parallax Effect
    const labImages = document.querySelector('.lab-images');
    if (labImages) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.05;
            
            const mainImage = labImages.querySelector('.main-image');
            const secondaryImage = labImages.querySelector('.secondary-image');
            
            if (mainImage && secondaryImage) {
                mainImage.style.transform = `translateY(${rate * 0.5}px)`;
                secondaryImage.style.transform = `translateY(${rate * 0.8}px)`;
            }
        });
    }
});
