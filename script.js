// Initialize EmailJS Configuration
// To enable EmailJS, uncomment and fill in your credentials:
// 1. Get Public Key from EmailJS Dashboard > Account > General
// 2. Get Service ID from EmailJS Dashboard > Email Services
// 3. Get Template ID from EmailJS Dashboard > Email Templates
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID

// Target email address
const TARGET_EMAIL = 'ashikimman007@gmail.com';

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Reveal animations on scroll
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once revealed
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-parallax');
    
    if (heroSection) {
        const heroShapes = heroSection.querySelectorAll('.shape');
        heroShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K';
    }
    return num.toString();
}

// Observe stat cards for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statCard = entry.target;
            const target = parseInt(statCard.getAttribute('data-count'));
            const numberElement = statCard.querySelector('.stat-number');
            
            if (numberElement && !statCard.classList.contains('counted')) {
                statCard.classList.add('counted');
                animateCounter(numberElement, target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
});

// 3D card tilt effect
document.querySelectorAll('.about-card-3d').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.querySelector('.card-front').style.transform = 
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.card-front').style.transform = '';
    });
});

// Product filter functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const productCategorySections = document.querySelectorAll('.product-category-section');

if (filterButtons.length > 0 && productCategorySections.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            productCategorySections.forEach((section, index) => {
                const category = section.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    setTimeout(() => {
                        section.style.display = 'block';
                        section.style.opacity = '0';
                        section.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            section.style.transition = 'all 0.4s ease';
                            section.style.opacity = '1';
                            section.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 30);
                } else {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        section.style.display = 'none';
                    }, 300);
                }
            });

            // Smooth scroll to products section after filter
            if (filterValue !== 'all') {
                setTimeout(() => {
                    const productsSection = document.querySelector('.products-filter');
                    if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            }
        });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form with EmailJS
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    // Initialize EmailJS (comment out if you don't have EmailJS set up yet)
    // emailjs.init(EMAILJS_PUBLIC_KEY);
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        // Remove previous messages
        const existingMessage = contactForm.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value || 'Not provided',
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            to_email: 'ashikimman007@gmail.com'
        };

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message';
        
        try {
            // Check if EmailJS is configured
            if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY' && 
                EMAILJS_SERVICE_ID !== 'YOUR_SERVICE_ID' && 
                EMAILJS_TEMPLATE_ID !== 'YOUR_TEMPLATE_ID') {
                
                // Initialize EmailJS if not already done
                if (typeof emailjs !== 'undefined') {
                    emailjs.init(EMAILJS_PUBLIC_KEY);
                }
                
                // Send email using EmailJS
                const response = await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        from_name: formData.name,
                        from_email: formData.email,
                        phone: formData.phone,
                        subject: formData.subject,
                        message: formData.message,
                        to_email: TARGET_EMAIL,
                        reply_to: formData.email
                    }
                );
                
                if (response.status === 200) {
                    messageDiv.classList.add('success');
                    messageDiv.textContent = 'Message sent successfully! We will get back to you soon.';
                    contactForm.appendChild(messageDiv);
                    contactForm.reset();
                    
                    // Remove message after 5 seconds
                    setTimeout(() => {
                        messageDiv.remove();
                    }, 5000);
                } else {
                    throw new Error('Failed to send message');
                }
            } else {
                // Fallback to mailto if EmailJS is not configured
                const mailtoLink = `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                    `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\nMessage:\n${formData.message}`
                )}`;
                
                // Show success message
                messageDiv.classList.add('success');
                messageDiv.textContent = 'Opening email client... Please send the email to ' + TARGET_EMAIL;
                contactForm.appendChild(messageDiv);
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Reset form after a delay
                setTimeout(() => {
                    contactForm.reset();
                    messageDiv.textContent = 'Message prepared! Please check your email client and send to ' + TARGET_EMAIL;
                }, 2000);
            }
            
        } catch (error) {
            console.error('Error sending email:', error);
            messageDiv.classList.add('error');
            messageDiv.textContent = `There was an error sending your message. Please try again or contact us directly at ${TARGET_EMAIL}`;
            contactForm.appendChild(messageDiv);
            
            // Remove error message after 5 seconds
            setTimeout(() => {
                messageDiv.remove();
            }, 5000);
        } finally {
            // Re-enable button
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 2000);
        }
    });
}

// Add active class to current page in navigation
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Cursor trail effect (optional enhancement)
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor follow
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    requestAnimationFrame(animateCursor);
}

// animateCursor(); // Uncomment if you want cursor effects

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--secondary-green), var(--accent-green));
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

createScrollProgress();

// Add typing effect to hero (optional)
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Intersection Observer for all animations
const allAnimationsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

// Observe animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.floating-leaf, .shape, .service-card-new, .product-card');
    animatedElements.forEach(el => {
        allAnimationsObserver.observe(el);
    });
});