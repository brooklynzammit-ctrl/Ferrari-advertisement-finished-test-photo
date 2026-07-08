// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const reservationForm = document.getElementById('reservationForm');

// Hamburger Menu Toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Form submission
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = document.querySelectorAll('.reservation-form input');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const phone = inputs[2].value;
        const select = document.querySelector('.reservation-form select');
        const model = select.value;
        
        if (name && email && phone && model) {
            showSuccessMessage();
            e.target.reset();
        } else {
            showErrorMessage();
        }
    });
}

function showSuccessMessage() {
    alert('🔴 Thank you for your reservation request!\n\nWe will contact you shortly to discuss your Ferrari purchase.\n\nWelcome to the Ferrari family!');
}

function showErrorMessage() {
    alert('Please fill in all required fields.');
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.23, 1, 0.320, 1) forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe animated elements
const animatedElements = document.querySelectorAll('.car-image-container, .car-content, .reason-card, .benefit, .stat-card, .gallery-item');
animatedElements.forEach(element => {
    observer.observe(element);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElement = document.querySelector('.gradient-overlay');
    if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                
                setTimeout(() => {
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
                }, 50);
                
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Particle background effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(220, 20, 60, ' + Math.random() * 0.5 + ')';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 2}s infinite ease-in-out`;
        particle.style.pointerEvents = 'none';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles on page load
window.addEventListener('load', () => {
    createParticles();
    updateActiveNavLink();
    document.body.style.opacity = '1';
});

// Console message
console.log('%c🔴 FERRARI - LUXURY PERFORMANCE 🔴', 'color: #DC143C; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px rgba(220, 20, 60, 0.5);');
console.log('%cSF90 Stradale | 488 Pista', 'color: #d4af37; font-size: 14px; font-weight: bold;');
console.log('%cExperience the pinnacle of automotive excellence', 'color: #ffffff; font-size: 12px;');

// Add smooth scroll behavior for browsers that don't support it
if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView();
            }
        });
    });
}
