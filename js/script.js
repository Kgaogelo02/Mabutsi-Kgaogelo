// Typed.js initialization
var typed = new Typed(".text", {
    strings: ["Computer Science Graduate", "Junior Software Developer", "Data Analyst"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Sticky header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', function() {
    navbar.classList.toggle('active');
    this.querySelector('i').classList.toggle('bx-menu');
    this.querySelector('i').classList.toggle('bx-x');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function() {
        navbar.classList.remove('active');
        menuToggle.querySelector('i').classList.add('bx-menu');
        menuToggle.querySelector('i').classList.remove('bx-x');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.send');
        const originalText = submitBtn.value;
        
        // Simulate form submission
        submitBtn.value = 'Sending...';
        submitBtn.disabled = true;
        
        // In a real scenario, you would use fetch or XMLHttpRequest here
        setTimeout(() => {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
            submitBtn.value = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Portfolio item hover effect enhancement
const portfolioItems = document.querySelectorAll('.row');
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Skills animation on scroll
function animateSkills() {
    const skillsSection = document.querySelector('.skills-section');
    if (!skillsSection) return;
    
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (skillsPosition < screenPosition) {
        document.querySelectorAll('.progress-line span').forEach(span => {
            span.style.animation = 'animate 1s forwards';
        });
        
        document.querySelectorAll('.radial-bar .path').forEach(path => {
            path.style.animation = 'animate-path 2s forwards';
        });
        
        // Remove event listener after animation
        window.removeEventListener('scroll', animateSkills);
    }
}

window.addEventListener('scroll', animateSkills);

// Back to top button functionality
const topButton = document.querySelector('.top');
if (topButton) {
    topButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            topButton.style.display = 'block';
        } else {
            topButton.style.display = 'none';
        }
    });
}

// Certifications Section Animation
function animateCertifications() {
    const certificationsSection = document.querySelector('.certifications');
    if (!certificationsSection) return;
    
    const certifications = document.querySelectorAll('.certification-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                certifications.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, index * 200);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(certificationsSection);
    
    // Initialize styles
    certifications.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(50px)";
        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });
}

// Initialize certifications animation when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateCertifications();
});

// Filter certifications by category (optional future feature)
function setupCertificationFilters() {
    // This can be implemented later if you want to add filter buttons
    // For example: Filter by "All", "Programming", "Data Science", etc.
    console.log("Certification filters can be implemented here later");
}

// Export certifications as PDF (optional future feature)
function exportCertificationsPDF() {
    // This can be implemented later if you want to add an export feature
    console.log("PDF export functionality can be implemented here later");
}

// Preloader
window.addEventListener('load', function() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader">
            <div class="loader-circle"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    
    document.body.prepend(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1500);
});

// Add CSS for new elements programmatically
const style = document.createElement('style');
style.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #020e1a;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    }
    
    .loader-circle {
        width: 50px;
        height: 50px;
        border: 5px solid rgba(0, 239, 255, 0.2);
        border-radius: 50%;
        border-top-color: #0ef;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }
    
    .loader-text {
        margin-top: 15px;
        color: #0ef;
        font-size: 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .bx-x {
        transform: rotate(90deg);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on initial load
    const animateOnLoad = document.querySelectorAll('.home-content h3, .home-content h1, .home-content p, .home-sci a, .btn-box');
    
    animateOnLoad.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Initialize skills animation if already in view
    setTimeout(animateSkills, 500);
});

// Project modal functionality
function initProjectModals() {
    const projectRows = document.querySelectorAll('.row');
    
    projectRows.forEach(row => {
        row.addEventListener('click', function(e) {
            // Don't open modal if clicking on external link
            if (e.target.tagName === 'A' || e.target.closest('a')) return;
            
            const title = this.querySelector('h5').textContent;
            const description = this.querySelector('p').textContent;
            const techStack = this.querySelector('.tech-stack')?.innerHTML || '';
            const link = this.querySelector('a')?.href || '#';
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'project-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${title}</h3>
                    <p>${description}</p>
                    ${techStack ? `<div class="modal-tech">${techStack}</div>` : ''}
                    <div class="modal-actions">
                        <a href="${link}" target="_blank" class="btn-box">View Project</a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Show modal
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // Close modal handlers
            const closeModal = () => {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            };
            
            modal.querySelector('.close-modal').addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal();
            });
        });
    });
}

// Add modal styles dynamically
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .project-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        .project-modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-content {
            background: #031525;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            box-shadow: 0 0 20px rgba(0, 239, 255, 0.2);
        }
        
        .project-modal.active .modal-content {
            transform: translateY(0);
        }
        
        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #0ef;
        }
        
        .modal-content h3 {
            color: #0ef;
            margin-bottom: 15px;
            font-size: 24px;
        }
        
        .modal-content p {
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .modal-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 20px;
        }
        
        .modal-tech span {
            background: rgba(0, 239, 255, 0.2);
            color: #0ef;
            padding: 4px 10px;
            border-radius: 15px;
            font-size: 0.9rem;
        }
        
        .modal-actions {
            display: flex;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code
    
    // Add project modal functionality
    addModalStyles();
    initProjectModals();
});