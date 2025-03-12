document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        // Set initial height for smooth animation
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        }

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });

            // Toggle current FAQ item
            item.classList.toggle('active');
            
            // Animate the answer height
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // Add hover effect for questions
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(question => {
        question.addEventListener('mouseenter', () => {
            const icon = question.querySelector('i');
            icon.style.transform = question.parentElement.classList.contains('active') 
                ? 'rotate(180deg) scale(1.1)' 
                : 'scale(1.1)';
        });

        question.addEventListener('mouseleave', () => {
            const icon = question.querySelector('i');
            icon.style.transform = question.parentElement.classList.contains('active')
                ? 'rotate(180deg)'
                : 'none';
        });
    });

    // Add category hover effects
    const categories = document.querySelectorAll('.faq-category');
    categories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-5px)';
            category.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.1)';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
            category.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
        });
    });
});
