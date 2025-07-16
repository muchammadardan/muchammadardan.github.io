// Modern JavaScript for enhanced user experience
document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeScrollEffects();
  initializeAnimations();
  initializeImageHandlers();
  initializeThemeEnhancements();
});

// Navigation functionality
function initializeNavigation() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveNavLink() {
    let current = "";
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Throttled scroll event for better performance
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveNavLink();
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Scroll effects
function initializeScrollEffects() {
  const navbar = document.querySelector(".navbar");

  function updateNavbarOnScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  // Throttled scroll event
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateNavbarOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Enhanced animations
function initializeAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply fade-in animation to elements
  const animatedElements = document.querySelectorAll(
    ".timeline-item, .education-item, .project-card, .skill-category, .about-info"
  );

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(el);
  });

  // Add CSS for animation
  const animationStyle = document.createElement("style");
  animationStyle.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-link.active {
            color: var(--primary-color) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
        
        /* Enhanced hover effects */
        .project-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .education-item {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .skill-category {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Loading states */
        .loading {
            opacity: 0.7;
            pointer-events: none;
        }
        
        /* Smooth focus transitions */
        *:focus {
            transition: outline 0.2s ease;
        }
    `;
  document.head.appendChild(animationStyle);
}

// Image handlers with modern fallbacks
function initializeImageHandlers() {
  // Profile image error handler
  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.onerror = function () {
      console.log("Profile image failed to load, using placeholder");
      this.src = generateProfilePlaceholder();
      this.alt = "Muchammad Ardan - Profile Image";
    };

    // Add loading state
    profileImg.addEventListener("load", function () {
      console.log("Profile image loaded successfully");
    });
  }

  // Project images error handler
  const projectImages = document.querySelectorAll(".project-image img");
  projectImages.forEach((img, index) => {
    img.onerror = function () {
      console.log(`Project image ${index + 1} failed to load: ${this.src}`);
      this.src = generateProjectPlaceholder(this.alt);
    };

    // Add loading animation
    img.addEventListener("load", function () {
      console.log(
        `Project image ${index + 1} loaded successfully: ${this.src}`
      );
    });
  });

  // Check all images on page load and ensure they're visible
  setTimeout(() => {
    const allImages = document.querySelectorAll("img");
    allImages.forEach((img, index) => {
      // Ensure images are visible by removing any opacity restrictions
      img.style.opacity = "1";

      if (!img.complete || img.naturalHeight === 0) {
        console.warn(`Image ${index + 1} may have loading issues: ${img.src}`);
        // Try to reload the image
        const originalSrc = img.src;
        img.src = "";
        img.src = originalSrc;
      } else {
        console.log(`Image ${index + 1} is loaded correctly: ${img.src}`);
      }
    });
  }, 1000);
}

// Theme enhancements
function initializeThemeEnhancements() {
  // Add subtle parallax effect to hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          hero.style.transform = `translateY(${rate}px)`;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-text h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";
    heroTitle.style.borderRight = "2px solid rgba(255,255,255,0.8)";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = "none";
        }, 1000);
      }
    };

    setTimeout(typeWriter, 1000);
  }

  // Enhanced button interactions
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
    });

    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });

    btn.addEventListener("mousedown", function () {
      this.style.transform = "translateY(0) scale(0.98)";
    });

    btn.addEventListener("mouseup", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
    });
  });

  // Add ripple effect to buttons
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      this.style.position = "relative";
      this.style.overflow = "hidden";
      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple animation
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyle);
}

// Utility functions for generating placeholders
function generateProfilePlaceholder() {
  const svgContent = `
        <svg width="350" height="350" viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="350" height="350" fill="#f1f3f4"/>
            <circle cx="175" cy="140" r="50" fill="#6366f1" opacity="0.3"/>
            <path d="M100 280C100 240.2 130.2 210 170 210H230C269.8 210 300 240.2 300 280V350H100V280Z" fill="#6366f1" opacity="0.3"/>
            <text x="175" y="320" text-anchor="middle" fill="#6366f1" font-family="Inter, sans-serif" font-size="14" font-weight="600">Muchammad Ardan</text>
        </svg>
    `;
  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
}

function generateProjectPlaceholder(altText) {
  const projectName = altText.split(" ")[0] || "Project";
  const svgContent = `
        <svg width="400" height="200" viewBox="0 0 400 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="200" fill="#f8fafc"/>
            <rect x="150" y="75" width="100" height="50" rx="8" fill="#6366f1" opacity="0.2"/>
            <circle cx="200" cy="100" r="15" fill="#6366f1" opacity="0.4"/>
            <text x="200" y="140" text-anchor="middle" fill="#6366f1" font-family="Inter, sans-serif" font-size="12" font-weight="500">${projectName}</text>
        </svg>
    `;
  return `data:image/svg+xml;base64,${btoa(svgContent)}`;
}

// Performance optimization: Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Accessibility enhancements
document.addEventListener("keydown", (e) => {
  // Skip to main content with Tab key
  if (
    e.key === "Tab" &&
    !e.shiftKey &&
    document.activeElement === document.body
  ) {
    const mainContent = document.querySelector("#home");
    if (mainContent) {
      mainContent.focus();
      e.preventDefault();
    }
  }
});

// Add focus indicators for keyboard navigation
const focusStyle = document.createElement("style");
focusStyle.textContent = `
    .nav-link:focus,
    .btn:focus,
    .project-link:focus,
    .social-link:focus,
    .whatsapp-link:focus,
    .whatsapp-float:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
        border-radius: 4px;
    }
`;
document.head.appendChild(focusStyle);

// Console welcome message
console.log(
  "🚀 Muchammad Ardan's Portfolio - Modern Design Loaded Successfully!"
);
console.log(
  "Portfolio website with modern design and responsive layout is now ready!"
);
