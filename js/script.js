// Ensure DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Typewriter Effect ---
  const phrases = [
    "Cybersecurity Student & Enthusiast",
    "Machine Learning & AI Explorer",
    "Backend Developer & Problem Solver"
  ];
  let currentPhraseIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  const animatedText = document.getElementById('animated-text');
  
  function type() {
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isDeleting) {
      currentCharIndex--;
    } else {
      currentCharIndex++;
    }
    
    animatedText.textContent = currentPhrase.substring(0, currentCharIndex) + '|';
    
    let typeSpeed = 100;
    
    if (isDeleting) {
      typeSpeed /= 2; // Delete faster
    }
    
    if (!isDeleting && currentCharIndex === currentPhrase.length) {
      typeSpeed = 1500; // Pause at the end
      isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      typeSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(type, typeSpeed);
  }
  
  // Start the typing animation
  type();

  // --- 2. Dark/Light Mode Toggle ---
  const toggleBtn = document.getElementById('toggleMode');
  const toggleIcon = toggleBtn.querySelector('i');
  
  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update Icon
    if (newTheme === 'dark') {
      toggleIcon.classList.remove('fa-sun');
      toggleIcon.classList.add('fa-moon');
      updateParticlesTheme('dark');
    } else {
      toggleIcon.classList.remove('fa-moon');
      toggleIcon.classList.add('fa-sun');
      updateParticlesTheme('light');
    }
  });

  // --- 3. Scroll Reveal Animation ---
  const fadeEls = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // --- 4. Smooth Scrolling & Active State for Nav Links ---
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current) && current !== '') {
        link.classList.add('active');
      }
    });
  });

  // --- 5. tsParticles Configuration ---
  function initParticles(theme) {
    if (typeof tsParticles === 'undefined') return;
    
    const color = theme === 'dark' ? '#ffffff' : '#3b82f6';
    
    tsParticles.load("tsparticles", {
      preset: "stars",
      background: {
        color: {
          value: "transparent",
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          enable: true,
          color: color,
          opacity: 0.2,
          distance: 150,
        },
        move: {
          enable: true,
          speed: 1,
        },
        number: {
          value: 60,
        },
        opacity: {
          value: 0.5,
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
    });
  }
  
  function updateParticlesTheme(theme) {
    // Reinitialize particles with new colors
    initParticles(theme);
  }

  // Load particles after a tiny delay to ensure script has loaded
  setTimeout(() => initParticles('dark'), 500);

  // --- 6. Set current year in footer ---
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

});
