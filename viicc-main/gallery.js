document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const closeLightbox = lightbox.querySelector('.close-lightbox');
    const prevBtn = lightbox.querySelector('.prev');
    const nextBtn = lightbox.querySelector('.next');
    let currentImageIndex = 0;

    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Filter gallery items with animation
            galleryItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';

                setTimeout(() => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // Lightbox functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            const img = item.querySelector('img');
            const caption = item.querySelector('.overlay-content').innerHTML;
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerHTML = caption;
            
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    closeLightbox.addEventListener('click', closeLightboxFunction);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxFunction();
        }
    });

    function closeLightboxFunction() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Navigate through images
    function showImage(index) {
        const visibleItems = Array.from(galleryItems).filter(item => 
            item.style.display !== 'none'
        );

        if (index >= visibleItems.length) {
            currentImageIndex = 0;
        } else if (index < 0) {
            currentImageIndex = visibleItems.length - 1;
        } else {
            currentImageIndex = index;
        }

        const currentItem = visibleItems[currentImageIndex];
        const img = currentItem.querySelector('img');
        const caption = currentItem.querySelector('.overlay-content').innerHTML;

        // Add fade out effect
        lightboxImg.style.opacity = '0';
        lightboxCaption.style.opacity = '0';

        setTimeout(() => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.innerHTML = caption;

            // Add fade in effect
            lightboxImg.style.opacity = '1';
            lightboxCaption.style.opacity = '1';
        }, 300);
    }

    prevBtn.addEventListener('click', () => {
        showImage(currentImageIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showImage(currentImageIndex + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightboxFunction();
        } else if (e.key === 'ArrowLeft') {
            showImage(currentImageIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentImageIndex + 1);
        }
    });

    // Load More functionality
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let currentPage = 1;

    loadMoreBtn.addEventListener('click', () => {
        loadMoreBtn.classList.add('loading');
        
        // Simulate loading new images
        setTimeout(() => {
            // Add new gallery items here
            // For demonstration, we'll just show a message
            loadMoreBtn.classList.remove('loading');
            loadMoreBtn.textContent = 'No More Items';
            loadMoreBtn.disabled = true;
        }, 1500);
    });

    // Lazy loading images
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        const imgs = document.querySelectorAll('img.lazy');
        imgs.forEach(img => imageObserver.observe(img));
    };

    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    // Smooth scroll to top when filter is changed
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const gallerySection = document.querySelector('.gallery-section');
            gallerySection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
