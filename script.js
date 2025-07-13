// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #2c5aa0 !important;
        position: relative;
    }
    
    .nav-link.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background: #2c5aa0;
        border-radius: 1px;
    }
`;
document.head.appendChild(style);

// Animation on scroll
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

// Apply animation to elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.timeline-item, .education-item, .project-card, .skill-category');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Profile image error handler
document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUwIiBoZWlnaHQ9IjM1MCIgdmlld0JveD0iMCAwIDM1MCAzNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzNTAiIGhlaWdodD0iMzUwIiBmaWxsPSIjZjBmMGYwIi8+CjxjaXJjbGUgY3g9IjE3NSIgY3k9IjE0MCIgcj0iNTAiIGZpbGw9IiNjY2MiLz4KPHBhdGggZD0iTTEwMCAyODBDMTAwIDI0MC4yIDEzMC4yIDIxMCAxNzAgMjEwSDIzMEMyNjkuOCAyMTAgMzAwIDI0MC4yIDMwMCAyODBWMzUwSDEwMFYyODBaIiBmaWxsPSIjY2NjIi8+Cjx0ZXh0IHg9IjE3NSIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPk11Y2hhbW1hZCBBcmRhbjwvdGV4dD4KPC9zdmc+';
            this.alt = 'Muchammad Ardan - Profile Image';
        };
    }
});

// Handle project images error
document.addEventListener('DOMContentLoaded', () => {
    const projectImages = document.querySelectorAll('.project-image img');
    projectImages.forEach(img => {
        img.onerror = function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjZjhmOWZhIi8+CjxyZWN0IHg9IjE1MCIgeT0iNzUiIHdpZHRoPSIxMDAiIGhlaWdodD0iNTAiIHJ4PSI1IiBmaWxsPSIjZGRkIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTA1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiPlByb2plY3QgSW1hZ2U8L3RleHQ+Cjwvc3ZnPg==';
        };
    });
});
