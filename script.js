document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        clearErrors();

        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();
        if (!isValidName(nameValue)) {
            displayError('error-name', 'Invalid name format');
        }

        const emailInput = document.getElementById('email');
        const emailValue = emailInput.value.trim();
        if (!isValidEmail(emailValue)) {
            displayError('error-email', 'Invalid email format');
        }

        const cardInput = document.getElementById('card');
        const cardValue = cardInput.value.replace(/\s/g, '');
        if (!isValidCreditCard(cardValue)) {
            displayError('error-card', 'Invalid credit card number');
        }

        if (isValidName(nameValue) && isValidEmail(emailValue) && isValidCreditCard(cardValue)) {
            sendEmail(nameValue, emailValue, cardValue);
        }
    });

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    function displayError(errorClass, errorMessage) {
        const errorElement = document.querySelector(`.${errorClass}`);
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }

    function isValidName(name) {
        const nameRegex = /^[A-Za-z ]+$/;
        return nameRegex.test(name) && name.split(' ').length >= 2;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidCreditCard(cardNumber) {
        const cardRegex = /^\d{16}$/;
        if (!cardRegex.test(cardNumber)) {
            return false;
        }
        return checkLuhn(cardNumber);
    }

    function checkLuhn(cardNo) {
        let nDigits = cardNo.length;
        let nSum = 0;
        let isSecond = false;
        for (let i = nDigits - 1; i >= 0; i--) {
            let d = parseInt(cardNo.charAt(i), 10);
            if (isSecond) {
                d *= 2;
                if (d > 9) d -= 9;
            }
            nSum += d;
            isSecond = !isSecond;
        }
        return (nSum % 10 === 0);
    }

    function validateName() {
        const nameInput = document.getElementById('name');
        const nameValue = nameInput.value.trim();
        if (!isValidName(nameValue)) {
            displayError('error-name', 'Invalid name format');
        } else {
            clearError('error-name');
        }
    }

    function validateCreditCard() {
        const cardInput = document.getElementById('card');
        const cardValue = cardInput.value.replace(/\s/g, '');
        if (!isValidCreditCard(cardValue)) {
            displayError('error-card', 'Invalid credit card number');
        } else {
            clearError('error-card');
        }
    }

    function clearError(errorClass) {
        const errorElement = document.querySelector(`.${errorClass}`);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    function sendEmail(name, email, card) {
        const subject = encodeURIComponent('Form Submission');
        const body = encodeURIComponent(`Name: ${name}%0AEmail: ${email}%0ACard: ${card}`);
        window.location.href = `mailto:challenge@dn-uk.com?subject=${subject}&body=${body}`;
    }
});
