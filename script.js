// Get all slides
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Create navigation dots
const navDots = document.getElementById('navDots');
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    navDots.appendChild(dot);
});

// Update progress bar
function updateProgress() {
    const progress = ((currentSlide + 1) / slides.length) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Update navigation dots
function updateDots() {
    document.querySelectorAll('.nav-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Update navigation buttons
function updateButtons() {
    document.getElementById('prevBtn').disabled = currentSlide === 0;
    document.getElementById('nextBtn').disabled = currentSlide === slides.length - 1;
}

// Navigate to specific slide
function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
        currentSlide = index;
        slides[index].scrollIntoView({ behavior: 'smooth' });
        updateProgress();
        updateDots();
        updateButtons();
    }
}

// Navigate by offset
function navigateSlide(direction) {
    goToSlide(currentSlide + direction);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        navigateSlide(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        navigateSlide(-1);
    }
});

// Update current slide on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(slides).indexOf(entry.target);
            currentSlide = index;
            updateProgress();
            updateDots();
            updateButtons();
        }
    });
}, { threshold: 0.5 });

slides.forEach(slide => observer.observe(slide));

// Initialize
updateProgress();
updateButtons();
