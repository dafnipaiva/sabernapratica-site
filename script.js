// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: false,
        mirror: false
    });

    // Preloader
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 1000);
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            menuToggle.classList.remove('open');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Back to Top button
    const backToTopButton = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const formData = new FormData(contactForm);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Log form data (for demonstration)
            console.log('Form submitted:', formValues);
            
            // Redirect to Google Form
            const googleFormUrl = 'https://forms.gle/jcCnvgh9QWKsZEbWA';
            
            // Show success modal
            successModal.classList.remove('hidden');
            successModal.classList.add('visible');
            
            // Reset form
            contactForm.reset();
            
            // Optional: Open Google Form in new tab
            // window.open(googleFormUrl, '_blank');
        });
    }

    // Close modal
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            successModal.classList.remove('visible');
            setTimeout(() => {
                successModal.classList.add('hidden');
            }, 300);
        });
    });

    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === successModal) {
            successModal.classList.remove('visible');
            setTimeout(() => {
                successModal.classList.add('hidden');
            }, 300);
        }
    });

    // Particulas animadas
    createParticles();
});

// Create particles for background effect
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = 50;
    
    if (!particlesContainer) return;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 3 + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Random color (orange, yellow, green)
        const colors = ['#FF6F3C', '#FF9F1C', '#009E73'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            top: ${posY}%;
            left: ${posX}%;
            width: ${size}px;
            height: ${size}px;
            background-color: ${color};
            border-radius: 50%;
            opacity: ${opacity};
            pointer-events: none;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // keyframes para particulas animadas
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for revealing elements on scroll
const revealElements = document.querySelectorAll('.solution-card, .diferencial-card, .contact-info, .contact-form-container');
const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Add SVG gradient for loader
document.addEventListener('DOMContentLoaded', function() {
    const svg = document.querySelector('.loader svg');
    if (svg) {
        // Add gradient definition
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'gradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '0%');
        
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#FF6F3C');
        
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#FF9F1C');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);
    }
});

// Hover effect for solution cards
const solutionCards = document.querySelectorAll('.solution-card');
solutionCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const cardGlow = card.querySelector('.card-glow');
        if (cardGlow) {
            cardGlow.style.opacity = '1';
            cardGlow.style.top = `${y}px`;
            cardGlow.style.left = `${x}px`;
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const cardGlow = card.querySelector('.card-glow');
        if (cardGlow) {
            cardGlow.style.opacity = '0';
        }
    });
});
