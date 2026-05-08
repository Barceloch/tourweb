/**
 * Miami Walking Tours - Main JavaScript
 * Modern, performant, mobile-first functionality
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  Navbar.init();
  MobileMenu.init();
  ScrollAnimations.init();
  FAQ.init();
  SmoothScroll.init();
  LazyLoadImages.init();
  BookingWidget.init();
});

/**
 * Navbar Module
 * Handles navbar scroll effects and state
 */
const Navbar = {
  navbar: null,
  
  init() {
    this.navbar = document.querySelector('.navbar');
    if (!this.navbar) return;
    
    window.addEventListener('scroll', () => this.handleScroll());
    this.handleScroll(); // Initial check
  },
  
  handleScroll() {
    if (window.scrollY > 50) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }
};

/**
 * Mobile Menu Module
 * Handles mobile navigation toggle
 */
const MobileMenu = {
  toggle: null,
  menu: null,
  links: null,
  
  init() {
    this.toggle = document.querySelector('.navbar-toggle');
    this.menu = document.querySelector('.navbar-menu');
    this.links = document.querySelectorAll('.navbar-link');
    
    if (!this.toggle || !this.menu) return;
    
    this.toggle.addEventListener('click', () => this.toggleMenu());
    this.links.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
        this.closeMenu();
      }
    });
  },
  
  toggleMenu() {
    this.toggle.classList.toggle('active');
    this.menu.classList.toggle('active');
    document.body.style.overflow = this.menu.classList.contains('active') ? 'hidden' : '';
  },
  
  closeMenu() {
    this.toggle.classList.remove('active');
    this.menu.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/**
 * Scroll Animations Module
 * Handles fade-in animations on scroll
 */
const ScrollAnimations = {
  elements: null,
  
  init() {
    this.elements = document.querySelectorAll('.fade-in');
    if (!this.elements.length) return;
    
    // Use Intersection Observer for better performance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    this.elements.forEach(el => observer.observe(el));
  }
};

/**
 * FAQ Module
 * Handles FAQ accordion functionality
 */
const FAQ = {
  items: null,
  
  init() {
    this.items = document.querySelectorAll('.faq-item');
    if (!this.items.length) return;
    
    this.items.forEach(item => {
      const question = item.querySelector('.faq-question');
      if (question) {
        question.addEventListener('click', () => this.toggleItem(item));
      }
    });
  },
  
  toggleItem(item) {
    const isActive = item.classList.contains('active');
    
    // Close all items
    this.items.forEach(i => i.classList.remove('active'));
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  }
};

/**
 * Smooth Scroll Module
 * Handles smooth scrolling for anchor links
 */
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

/**
 * Lazy Load Images Module
 * Implements lazy loading for images
 */
const LazyLoadImages = {
  init() {
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        img.src = img.dataset.src || img.src;
      });
    } else {
      // Fallback to Intersection Observer
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
};

/**
 * Booking Widget Module
 * Handles Bokun widget integration placeholders
 */
const BookingWidget = {
  init() {
    // This is where Bokun widget initialization code would go
    // Example: BokunWidget.init({ widgetId: 'your-widget-id' });
    
    console.log('Booking widget ready for Bokun integration');
    
    // Add event listeners to booking buttons
    document.querySelectorAll('[data-book-now]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const tourId = button.dataset.tourId;
        this.scrollToBooking(tourId);
      });
    });
  },
  
  scrollToBooking(tourId) {
    const bookingSection = document.querySelector('.booking-widget');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
};

/**
 * Gallery Lightbox (Optional Enhancement)
 * Simple lightbox for gallery images
 */
const Lightbox = {
  init() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!galleryItems.length) return;
    
    // Create lightbox element
    this.createLightbox();
    
    galleryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        const img = item.querySelector('img');
        this.openLightbox(img.src, img.alt);
      });
    });
  },
  
  createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close">&times;</button>
        <img src="" alt="">
      </div>
    `;
    document.body.appendChild(lightbox);
    
    this.lightbox = lightbox;
    this.lightboxImg = lightbox.querySelector('img');
    this.lightboxClose = lightbox.querySelector('.lightbox-close');
    
    this.lightboxClose.addEventListener('click', () => this.closeLightbox());
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });
  },
  
  openLightbox(src, alt) {
    this.lightboxImg.src = src;
    this.lightboxImg.alt = alt;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  },
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/**
 * Form Validation (for Contact Page)
 * Basic form validation
 */
const FormValidation = {
  init() {
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => this.validateForm(e, form));
    });
  },
  
  validateForm(e, form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        this.showError(field, 'This field is required');
      } else {
        this.clearError(field);
      }
      
      // Email validation
      if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          isValid = false;
          this.showError(field, 'Please enter a valid email');
        }
      }
    });
    
    if (!isValid) {
      e.preventDefault();
    }
  },
  
  showError(field, message) {
    this.clearError(field);
    field.classList.add('error');
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    field.parentNode.appendChild(error);
  },
  
  clearError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) existingError.remove();
  }
};

// Initialize form validation if forms exist
if (document.forms.length > 0) {
  FormValidation.init();
}

/**
 * Performance Optimization
 * Debounce and throttle utilities
 */
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

function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export utilities for external use
window.MiamiToursUtils = {
  debounce,
  throttle
};
