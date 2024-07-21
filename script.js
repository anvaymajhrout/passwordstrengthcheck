document.getElementById('passwordInput').addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    const maxStrength = 7;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[\W_]/.test(password)) strength++;
    if (password.length > 12) strength++;
    if (/[A-Z].*[A-Z]/.test(password)) strength++;

    const strengthPercentage = (strength / maxStrength) * 100;
    updateStrengthBar(strengthPercentage);
    provideSuggestions(password, strength, maxStrength);
});

function updateStrengthBar(percentage) {
    const filler = document.getElementById('filler');
    if (percentage === 100) {
        filler.style.height = '100%';
        filler.style.backgroundColor = 'green';
    } else {
        filler.style.height = `${percentage}%`;
        filler.style.backgroundColor = `hsl(${percentage}, 100%, 50%)`;
    }
}

function provideSuggestions(password, strength, maxStrength) {
    const box = document.getElementById('suggestionsBox');
    const copyButton = document.getElementById('copyButton');
    box.innerHTML = ''; 
    copyButton.style.display = 'none';

    if (strength < maxStrength) {
        let suggestionsHtml = '<div class="error-alert">Improve your password by:<ul>';
        if (password.length < 8) suggestionsHtml += '<li>Increasing the length to at least 8 characters.</li>';
        if (!/[A-Z]/.test(password)) suggestionsHtml += '<li>Adding uppercase letters.</li>';
        if (!/[a-z]/.test(password)) suggestionsHtml += '<li>Adding lowercase letters.</li>';
        if (!/[0-9]/.test(password)) suggestionsHtml += '<li>Adding numbers.</li>';
        if (!/[\W_]/.test(password)) suggestionsHtml += '<li>Adding symbols.</li>';
        suggestionsHtml += '</ul></div>';
        box.innerHTML = suggestionsHtml;
    } else {
        box.innerHTML = '<div class="success-alert">Your password is strong!</div>';
        copyButton.style.display = 'block';
    }
}

document.getElementById('copyButton').addEventListener('click', function() {
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.select();
    document.execCommand('copy');
    alert('Password copied to clipboard!');
});
