document.addEventListener('DOMContentLoaded', function() {
    // Navigation background change on scroll
    const header = document.querySelector('header');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate burger menu
        const spans = burger.querySelectorAll('span');
        spans.forEach(span => {
            span.classList.toggle('active');
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                burger.querySelectorAll('span').forEach(span => {
                    span.classList.remove('active');
                });
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle active menu item based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Wird gesendet...';
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => {
                    group.style.display = 'none';
                });
                
                // Create and display success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <div class="icon-success">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3>Vielen Dank für Ihre Nachricht!</h3>
                    <p>Wir werden uns in Kürze bei Ihnen melden.</p>
                    <button class="btn btn-primary" id="resetForm">Neue Nachricht</button>
                `;
                
                contactForm.appendChild(successMessage);
                
                // Reset form button
                document.getElementById('resetForm').addEventListener('click', function() {
                    contactForm.reset();
                    successMessage.remove();
                    formGroups.forEach(group => {
                        group.style.display = 'block';
                    });
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                });
                
                console.log('Form submitted:', formData);
            }, 2000);
        });
    }
    
    // Animate service cards on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .value-card, .glass-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
                
                // Trigger shine effect with a random delay
                setTimeout(() => {
                    const shineEffect = element.querySelector('.shine-effect');
                    if (shineEffect) {
                        shineEffect.style.animation = 'none';
                        void element.offsetWidth; // Trigger reflow
                        shineEffect.style.animation = 'shine 1.5s ease-in-out';
                    }
                }, Math.random() * 500);
            }
        });
    };
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
    
    // Background effects animation
    const moveBackgroundElements = function(e) {
        const circles = document.querySelectorAll('.effect-circle');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 2;
            const offsetX = (0.5 - x) * speed;
            const offsetY = (0.5 - y) * speed;
            
            circle.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    };
    
    // Move background elements on mouse move
    document.addEventListener('mousemove', moveBackgroundElements);
});

// Additional animations for effects
window.addEventListener('load', function() {
    // Animate hero section elements
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage) {
        heroContent.style.opacity = '0';
        heroImage.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroImage.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                heroImage.style.transition = 'opacity 1s ease, transform 1s ease';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0)';
            }, 400);
        }, 300);
    }
    
    // Add CSS for smooth section transitions
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .value-card, .glass-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .service-card.animate, .value-card.animate, .glass-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .burger span.active:nth-child(1) {
            transform: rotate(45deg) translate(5px, 6px);
        }
        
        .burger span.active:nth-child(2) {
            opacity: 0;
        }
        
        .burger span.active:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -6px);
        }
        
        .success-message {
            text-align: center;
            padding: 2rem;
        }
        
        .icon-success {
            font-size: 4rem;
            color: #4CAF50;
            margin-bottom: 1rem;
        }
        
        @keyframes fadeUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});