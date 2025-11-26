// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
});

// Mobile Menu Toggle
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
});

// Countdown Timer Logic
// Set the date we're counting down to (Dec 1st, 2025)
const countDownDate = new Date(2025, 11, 1, 23, 59, 59).getTime();

const timerInterval = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display results
    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown").innerHTML = "OFFER EXPIRED";
    }
}, 1000);

// Form Submission Logic
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Show loading state
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
        formMessage.classList.add('hidden');

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };

        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1HSQJeR1rlOb__1vrzxrrLRXxoiC7jLCrp2el71lYGqh7-9tYWgjmjFG0jp6KFVzHig/exec';

        // Create a hidden iframe to submit the form (works from file://)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'hidden_iframe';
        document.body.appendChild(iframe);

        // Create a temporary form
        const form = document.createElement('form');
        form.action = GOOGLE_SCRIPT_URL;
        form.method = 'GET';
        form.target = 'hidden_iframe';

        // Add form fields
        const fields = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
            date: new Date().toLocaleString()
        };

        for (const [key, value] of Object.entries(fields)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            form.appendChild(input);
        }

        document.body.appendChild(form);

        // Submit the form
        form.submit();

        // Show success message immediately (since we can't read the response)
        formMessage.innerText = 'Thank you! We will contact you shortly.';
        formMessage.className = 'mt-4 text-center text-green-600 font-bold block';
        contactForm.reset();
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;

        // Clean up
        setTimeout(() => {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
        }, 1000);
    });
}
