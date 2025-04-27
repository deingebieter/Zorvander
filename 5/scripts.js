// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', function() {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentSlide = 0;
        
        // Show the current slide
        function showSlide(n) {
            // Hide all slides
            testimonials.forEach(slide => {
                slide.style.transform = 'translateX(-100%)';
                slide.style.opacity = '0';
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the current slide
            testimonials[n].style.transform = 'translateX(0)';
            testimonials[n].style.opacity = '1';
            
            // Add active class to the current dot
            dots[n].classList.add('active');
        }
        
        // Next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showSlide(currentSlide);
        }
        
        // Previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
            showSlide(currentSlide);
        }
        
        // Event listeners for buttons
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto slide
        setInterval(nextSlide, 7000);
        
        // Show first slide
        showSlide(currentSlide);
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle active class on item
                item.classList.toggle('active');
                
                // Toggle icon
                const icon = item.querySelector('.toggle-icon i');
                if (icon.classList.contains('fa-plus')) {
                    icon.classList.replace('fa-plus', 'fa-minus');
                } else {
                    icon.classList.replace('fa-minus', 'fa-plus');
                }
                
                // Set height for answer
                const answer = item.querySelector('.faq-answer');
                
                if (item.classList.contains('active')) {
                    answer.style.height = answer.scrollHeight + 'px';
                } else {
                    answer.style.height = '0';
                }
            });
        });
    }
    
    // FAQ category filter
    const categoryBtns = document.querySelectorAll('.category-btn');
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to current button
                btn.classList.add('active');
                
                // Get category
                const category = btn.dataset.category;
                
                // Filter FAQ items
                faqItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // FAQ search functionality
    const searchInput = document.getElementById('faq-search');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            faqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question h3').textContent.toLowerCase();
                const answerText = item.querySelector('.faq-answer').textContent.toLowerCase();
                
                if (questionText.includes(searchTerm) || answerText.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            
            // Check required fields
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('#email');
            if (emailField) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('error');
                }
            }
            
            // If form is valid, simulate submission
            if (valid) {
                // Add loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                submitBtn.innerHTML = 'Wird gesendet...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual submission)
                setTimeout(() => {
                    contactForm.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Vielen Dank für Ihre Anfrage!</h3>
                            <p>Wir haben Ihre Nachricht erhalten und werden uns in Kürze bei Ihnen melden.</p>
                        </div>
                    `;
                }, 1500);
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add animation to elements when they come into view
    function animateOnScroll() {
        const elements = document.querySelectorAll('.glass-card, .section-title, .service-card, .team-member, .value-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Run animation function on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Add gloss/shine effect on hover
    const glossElements = document.querySelectorAll('.primary-button, .secondary-button, .cta-button, .section-title, h3');
    
    glossElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--x-position', `${x}px`);
            this.style.setProperty('--y-position', `${y}px`);
        });
    });
    
    // Initialize dynamic background spheres
    function animateBackground() {
        const spheres = document.querySelectorAll('.sphere');
        
        spheres.forEach(sphere => {
            const speed = Math.random() * 0.5 + 0.1;
            const xPos = Math.random() * 100;
            const yPos = Math.random() * 100;
            
            sphere.style.setProperty('--x-pos', `${xPos}vw`);
            sphere.style.setProperty('--y-pos', `${yPos}vh`);
            sphere.style.setProperty('--speed', `${speed}`);
        });
    }
    
    // Initialize background animation
    animateBackground();
});