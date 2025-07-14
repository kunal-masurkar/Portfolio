// Typewriter effect for animated intro text
const phrases = [
  "A passionate cybersecurity and forensics student",
  "Blending expertise in machine learning, IoT, Backend development",
  "Cybersecurity | AI | Forensics | ML | IoT | Backend"
];
let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
const animatedText = document.getElementById('animated-text');

function type() {
  const phrase = phrases[currentPhrase];
  if (isDeleting) {
    currentChar--;
    if (currentChar === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % phrases.length;
    }
  } else {
    currentChar++;
    if (currentChar === phrase.length) {
      isDeleting = true;
      setTimeout(type, 1200);
      return;
    }
  }
  animatedText.textContent = phrase.substring(0, currentChar);
  setTimeout(type, isDeleting ? 40 : 80);
}
type();

// Dark/Light mode toggle
const toggleBtn = document.getElementById('toggleMode');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  toggleBtn.textContent = document.body.classList.contains('light-mode') ? '☀️' : '🌙';
});

// Scroll-triggered fade-in animation
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeEls.forEach(el => observer.observe(el)); 
