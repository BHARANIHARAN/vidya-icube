document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    const formSection = document.querySelector('.contact-section');
    const inputs = document.querySelectorAll('input, textarea, select');

    // Add placeholder attribute to make the floating label work
    inputs.forEach(input => {
        input.setAttribute('placeholder', ' ');
    });

    function showMessage(type, text) {
        // Remove any existing message
        const existingMessage = formSection.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;

        // Insert before the form
        form.parentNode.insertBefore(messageDiv, form);

        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        const firstName = form.querySelector('#firstName').value.trim();
        const lastName = form.querySelector('#lastName').value.trim();
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const userType = form.querySelector('#userType').value;
        const message = form.querySelector('#message').value.trim();

        // Basic validation
        if (!firstName || !lastName || !email || !phone || !userType || !message) {
            showMessage('error', 'Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('error', 'Please enter a valid email address');
            return;
        }

        if (!isValidPhone(phone)) {
            showMessage('error', 'Please enter a valid phone number');
            return;
        }

        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        showMessage('success', 'Thank you for your message! We will get back to you soon.');
        form.reset();

        // Reset floating labels
        inputs.forEach(input => {
            input.setAttribute('placeholder', ' ');
        });
    });

    // Email validation helper
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    // Phone validation helper
    function isValidPhone(phone) {
        const re = /^\(\d{3}\)\s\d{3}-\d{4}$/;
        return re.test(phone);
    }

    // Add animation classes on form field focus
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        
        input.addEventListener('focus', () => {
            formGroup.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                formGroup.classList.remove('focused');
            }
        });

        // Set initial state for pre-filled inputs
        if (input.value) {
            formGroup.classList.add('focused');
        }
    });

    // Animate select arrow on focus
    const select = document.querySelector('select');
    select.addEventListener('focus', () => {
        select.parentElement.classList.add('select-focused');
    });

    select.addEventListener('blur', () => {
        select.parentElement.classList.remove('select-focused');
    });
});
