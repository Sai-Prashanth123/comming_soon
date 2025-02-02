const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 7);
launchDate.setHours(launchDate.getHours() + 21);
launchDate.setMinutes(launchDate.getMinutes() + 43);
launchDate.setSeconds(launchDate.getSeconds() + 36);

function updateCountdown() {
    const now = new Date();
    const distance = launchDate - now;

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.querySelector('.launch-time').innerHTML = '<h2>We Are Live!</h2>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

const countdownInterval = setInterval(updateCountdown, 1000);

document.getElementById('email-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email-input');
    const messageDiv = document.getElementById('message');
    const email = emailInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        messageDiv.textContent = 'Please enter a valid email address';
        messageDiv.className = 'message error';
        return;
    }

    fetch('/subscribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            messageDiv.textContent = data.error;
            messageDiv.className = 'message error';
        } else {
            messageDiv.textContent = data.message;
            messageDiv.className = 'message success';
            emailInput.value = '';
        }
    })
    .catch(error => {
        messageDiv.textContent = 'An error occurred. Please try again.';
        messageDiv.className = 'message error';
    });
});