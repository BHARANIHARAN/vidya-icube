document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const searchInput = document.getElementById('job-search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const careerCards = document.querySelectorAll('.career-card');
    const applyButtons = document.querySelectorAll('.apply-btn');

    // Initialize Intersection Observer for card animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe each career card
    careerCards.forEach(card => {
        observer.observe(card);
    });

    // Search functionality
    searchInput.addEventListener('input', filterCards);

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterCards();
        });
    });

    // Apply button hover effect
    applyButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            const icon = button.querySelector('i');
            icon.style.transform = 'translateX(5px)';
        });

        button.addEventListener('mouseleave', () => {
            const icon = button.querySelector('i');
            icon.style.transform = 'translateX(0)';
        });
    });

    // Filter cards based on search and category
    function filterCards() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;

        careerCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.career-tag'))
                .map(tag => tag.textContent.toLowerCase());
            const description = card.querySelector('.career-description').textContent.toLowerCase();

            const matchesSearch = title.includes(searchTerm) || 
                                tags.some(tag => tag.includes(searchTerm)) || 
                                description.includes(searchTerm);
            
            const matchesFilter = activeFilter === 'all' || 
                                tags.some(tag => tag.includes(activeFilter.toLowerCase()));

            if (matchesSearch && matchesFilter) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.classList.add('visible');
                }, 100);
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });
    }

    // Apply button click handler
    applyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = e.target.closest('.career-card');
            const position = card.querySelector('h3').textContent;
            
            // You can customize this to open a modal or redirect to an application form
            alert(`Applying for ${position}. This will be replaced with an application form.`);
        });
    });
});