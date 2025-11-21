// ===================================
// Palantir-Inspired Scroll & Transitions
// ===================================

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initSmoothScrolling();
  initScrollAnimations();
  initHeroAnimation();
  initParallaxEffects();
});

// ===================================
// Navbar Scroll Effect
// ===================================

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  let lastScrollTop = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleNavbarScroll(navbar, lastScrollTop);
        lastScrollTop = window.pageYOffset;
        ticking = false;
      });
      ticking = true;
    }
  });
}

function handleNavbarScroll(navbar, lastScrollTop) {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add scrolled class when scrolled past hero
  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// ===================================
// Smooth Scrolling for Navigation
// ===================================

function initSmoothScrolling() {
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only handle internal links
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Update active link
          updateActiveNavLink(link);
        }
      }
    });
  });
  
  // Update active link on scroll
  window.addEventListener('scroll', () => {
    updateActiveNavLinkOnScroll();
  });
}

function updateActiveNavLink(activeLink) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  activeLink.classList.add('active');
}

function updateActiveNavLinkOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navbarHeight = document.querySelector('.navbar').offsetHeight;
  const scrollPosition = window.pageYOffset + navbarHeight + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===================================
// Scroll-triggered Fade-in Animations
// ===================================

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all fade-in sections
  const fadeInSections = document.querySelectorAll('.fade-in-section');
  fadeInSections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe timeline items with stagger effect
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(item);
  });
}

// ===================================
// Hero Section Animation
// ===================================

function initHeroAnimation() {
  const heroContent = document.querySelector('.hero-content');
  
  if (heroContent) {
    // Trigger hero animation on load
    setTimeout(() => {
      heroContent.classList.add('fade-in');
    }, 100);
  }
}

// ===================================
// Parallax & Scroll Effects
// ===================================

function initParallaxEffects() {
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        applyParallaxEffects();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function applyParallaxEffects() {
  const scrolled = window.pageYOffset;
  
  // Hero parallax effect
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const heroContent = heroSection.querySelector('.hero-content');
    if (heroContent) {
      const offset = scrolled * 0.5;
      heroContent.style.transform = `translateY(${offset}px)`;
      
      // Fade out hero content on scroll
      const opacity = 1 - (scrolled / window.innerHeight);
      heroContent.style.opacity = Math.max(opacity, 0);
    }
  }
  
  // Scroll indicator fade out
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    const opacity = 1 - (scrolled / 300);
    scrollIndicator.style.opacity = Math.max(opacity, 0);
  }
}

// ===================================
// Timeline Item Hover Effects
// ===================================

const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'all 0.3s ease';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transition = 'all 0.3s ease';
  });
});

// ===================================
// Button Interactions
// ===================================

const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

buttons.forEach(button => {
  button.addEventListener('mouseenter', (e) => {
    createRipple(e, button);
  });
});

function createRipple(event, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.classList.add('ripple');
  
  // Remove any existing ripples
  const existingRipple = button.querySelector('.ripple');
  if (existingRipple) {
    existingRipple.remove();
  }
  
  button.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// ===================================
// Performance Optimization: Debounce
// ===================================

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func.apply(context, args);
  };
}

// ===================================
// Scroll Progress Indicator
// ===================================

function initScrollProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
  });
}

// Optional: Uncomment to add scroll progress bar
// initScrollProgress();

// ===================================
// Cursor Follow Effect (Optional)
// ===================================

function initCursorEffect() {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  const speed = 0.1;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    
    cursorX += distX * speed;
    cursorY += distY * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Add hover effects
  const interactiveElements = document.querySelectorAll('a, button, .timeline-content, .stat-item');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
    });
  });
}

// Optional: Uncomment to add custom cursor
// initCursorEffect();

// ===================================
// Smooth Page Load
// ===================================

window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// ===================================
// Responsive Navigation Toggle (Mobile)
// ===================================

function initMobileNav() {
  // Add mobile menu toggle if needed
  const navMenu = document.querySelector('.nav-menu');
  
  if (window.innerWidth <= 768) {
    // Mobile navigation logic can be added here
    console.log('Mobile navigation detected');
  }
}

window.addEventListener('resize', debounce(() => {
  initMobileNav();
}, 250));

initMobileNav();
