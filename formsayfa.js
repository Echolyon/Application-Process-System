// JavaScript to handle application box clicks and lightbox display
document.getElementById('applicationBox1').addEventListener('click', function() {
    document.getElementById('applicationFormLightbox').style.display = 'flex';
});

document.getElementById('applicationBox2').addEventListener('click', function() {
    document.getElementById('applicationFormLightbox').style.display = 'flex';
});

document.getElementById('closeLightbox').addEventListener('click', function() {
    document.getElementById('applicationFormLightbox').style.display = 'none';
});

document.getElementById('closeConfirmationLightbox').addEventListener('click', function() {
    document.getElementById('confirmationLightbox').style.display = 'none';
});

// Handle form submission
document.getElementById('applicationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    document.getElementById('applicationFormLightbox').style.display = 'none';
    document.getElementById('confirmationLightbox').style.display = 'flex';
});
