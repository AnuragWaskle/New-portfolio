// DOM Elements
const darkModeToggle = document.getElementById('dark-mode-toggle');
const lightModeToggle = document.getElementById('light-mode-toggle');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navDots = document.querySelectorAll('.nav-dots .dot');
const sections = document.querySelectorAll('section');

// Theme Toggle Functionality
darkModeToggle.addEventListener('click', () => {
    document.body.classList.add('light-mode');
    darkModeToggle.style.display = 'none';
    lightModeToggle.style.display = 'block';
    localStorage.setItem('theme', 'light');
});

lightModeToggle.addEventListener('click', () => {
    document.body.classList.remove('light-mode');
    lightModeToggle.style.display = 'none';
    darkModeToggle.style.display = 'block';
    localStorage.setItem('theme', 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    darkModeToggle.style.display = 'none';
    lightModeToggle.style.display = 'block';
}

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navigation Dots Functionality
const sectionIds = ['hero', 'journey', 'gallery', 'experience', 'memories'];

navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const targetSection = document.getElementById(sectionIds[index]);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Update active dot based on scroll position
function updateActiveDot() {
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navDots.forEach(dot => dot.classList.remove('active'));
            if (navDots[index]) {
                navDots[index].classList.add('active');
            }
        }
    });
}

// Parallax Effect for Hero Section
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroImage = document.querySelector('.floating-image');
    
    if (hero && heroImage) {
        const speed = scrolled * 0.5;
        hero.style.transform = `translateY(${speed}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
}

// Smooth reveal animations on scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.text-card, .memory-card, .timeline-item, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 80);
    }
});

// Gallery image modal functionality
function initGalleryModal() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="" class="modal-image">
            <div class="modal-info">
                <h3></h3>
                <p></p>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyles = `
        .gallery-modal {
            display: none;
            position: fixed;
            z-index: 9999;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            position: relative;
            margin: 50px auto;
            max-width: 90%;
            max-height: 90%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: calc(100% - 100px);
        }
        
        .modal-image {
            max-width: 100%;
            max-height: 70%;
            object-fit: contain;
            border-radius: 10px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        
        .modal-info {
            text-align: center;
            margin-top: 20px;
            color: white;
        }
        
        .modal-info h3 {
            font-family: var(--font-heading);
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        
        .close-modal {
            position: absolute;
            top: 20px;
            right: 30px;
            color: white;
            font-size: 40px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .close-modal:hover {
            color: var(--accent-color);
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = modalStyles;
    document.head.appendChild(style);
    
    // Add click handlers
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            
            if (img) {
                modal.style.display = 'block';
                modal.querySelector('.modal-image').src = img.src;
                modal.querySelector('.modal-image').alt = img.alt;
                
                if (overlay) {
                    const title = overlay.querySelector('h3');
                    const description = overlay.querySelector('p');
                    
                    if (title) modal.querySelector('.modal-info h3').textContent = title.textContent;
                    if (description) modal.querySelector('.modal-info p').textContent = description.textContent;
                }
            }
        });
    });
    
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navbar background change on scroll
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.9)';
        navbar.style.boxShadow = 'none';
    }
}

// Mouse cursor trail effect
function createCursorTrail() {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-trail';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--accent-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - i / trailLength};
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x + 'px';
            dot.style.top = y + 'px';
            
            if (nextDot) {
                const nextX = parseFloat(nextDot.style.left);
                const nextY = parseFloat(nextDot.style.top);
                
                if (!isNaN(nextX) && !isNaN(nextY)) {
                    x += (nextX - x) * 0.3;
                    y += (nextY - y) * 0.3;
                }
            }
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Initialize all functionality
function init() {
    // Set initial styles for animations
    const animatedElements = document.querySelectorAll('.text-card, .memory-card, .timeline-item, .gallery-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    // Initialize features
    initGalleryModal();
    initSmoothScrolling();
    createCursorTrail();
    
    // Initial calls
    revealOnScroll();
    updateActiveDot();
    handleNavbarScroll();
}

// Event listeners
window.addEventListener('scroll', () => {
    updateActiveDot();
    revealOnScroll();
    parallaxEffect();
    handleNavbarScroll();
});

window.addEventListener('resize', () => {
    updateActiveDot();
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Add loading animation
window.addEventListener('load', () => {
    // Remove loading screen if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
    
    // Trigger initial animations
    setTimeout(() => {
        revealOnScroll();
    }, 500);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.gallery-modal');
        if (modal && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
        
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements when they're added to the DOM
document.addEventListener('DOMContentLoaded', () => {
    const elementsToObserve = document.querySelectorAll('.text-card, .memory-card, .timeline-item, .gallery-item');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    updateActiveDot();
    parallaxEffect();
    handleNavbarScroll();
}, 16)); // ~60fps