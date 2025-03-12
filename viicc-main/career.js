// Initialize animations
const jobCards = document.querySelectorAll('.job-card');

// Initial load animation
function initializeCards() {
    jobCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.display = 'block';
            card.classList.add('visible');
        }, index * 200);
    });
}

// Filter functionality
const filterButtons = document.querySelectorAll('.filter-buttons button');
const searchInput = document.querySelector('.search-box input');

async function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-buttons button.active').textContent.trim();

    // First hide all cards with animation
    const hidePromises = Array.from(jobCards).map(card => {
        return new Promise(resolve => {
            if (card.style.display !== 'none') {
                card.classList.remove('visible');
                card.classList.add('hidden');
                setTimeout(() => {
                    card.style.display = 'none';
                    resolve();
                }, 300);
            } else {
                resolve();
            }
        });
    });

    // Wait for hide animations
    await Promise.all(hidePromises);

    // Show matching cards
    jobCards.forEach((card, index) => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('.job-details p').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.job-tags li'))
            .map(tag => tag.textContent.trim().toLowerCase());
        
        const matchesFilter = activeFilter === 'All Positions' || 
            tags.some(tag => {
                const tagText = tag.toLowerCase();
                switch(activeFilter) {
                    case 'Engineering':
                        return tagText.includes('python') || 
                               tagText.includes('machine learning') || 
                               tagText.includes('ai') ||
                               tagText.includes('engineering');
                    case 'Design':
                        return tagText.includes('design') || 
                               tagText.includes('mobile') || 
                               tagText.includes('web');
                    case 'Management':
                        return tagText.includes('leadership') || 
                               tagText.includes('agile') || 
                               tagText.includes('strategy') ||
                               tagText.includes('management');
                    default:
                        return false;
                }
            });

        const matchesSearch = searchTerm === '' || 
            title.includes(searchTerm) || 
            description.includes(searchTerm) || 
            tags.some(tag => tag.includes(searchTerm));

        if (matchesSearch && matchesFilter) {
            setTimeout(() => {
                card.style.display = 'block';
                requestAnimationFrame(() => {
                    card.classList.remove('hidden');
                    card.classList.add('visible');
                });
            }, index * 200);
        }
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        filterJobs();
    });
});

searchInput.addEventListener('input', () => {
    filterJobs();
});

// Apply button effect
document.querySelectorAll('.apply-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const jobTitle = e.target.closest('.job-card').querySelector('h3').textContent;
        console.log(`Applying for: ${jobTitle}`);
    });
});

// Initialize the page
initializeCards();
filterJobs();