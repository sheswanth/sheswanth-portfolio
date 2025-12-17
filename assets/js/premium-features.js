/**
 * Premium Features JavaScript
 */
(function () {
    'use strict';

    // ====================
    // 1. Preloader
    // ====================
    const initPreloader = () => {
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
                // Remove from DOM after animation
                setTimeout(() => {
                    preloader.remove();
                }, 500);
            }, 1000);
        });
    };

    // ====================
    // 2. Scroll Progress Bar
    // ====================
    const initScrollProgress = () => {
        const progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) return;

        const updateProgress = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = progress + '%';
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();
    };

    // ====================
    // 3. Back to Top Button
    // ====================
    const initBackToTop = () => {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility();
    };

    // ====================
    // 4. Custom Cursor
    // ====================
    const initCustomCursor = () => {
        const cursor = document.querySelector('.custom-cursor');
        const cursorDot = document.querySelector('.custom-cursor-dot');

        if (!cursor || !cursorDot) return;

        // Check if it's a touch device
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            cursor.style.display = 'none';
            cursorDot.style.display = 'none';
            return;
        }

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update dot position immediately
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth cursor following
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .portfolio-wrap, .icon-box, .info-box, .nav-menu li');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
        });

        // Click effect
        document.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            cursorDot.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            cursorDot.style.opacity = '1';
        });
    };

    // ====================
    // 5. 3D Tilt Effect
    // ====================
    const initTiltEffect = () => {
        const cards = document.querySelectorAll('.portfolio-wrap');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    };

    // ====================
    // 6. Typing Effect Enhancement
    // ====================
    const initTypingEnhancement = () => {
        const typingElement = document.querySelector('.typing');
        if (!typingElement) return;

        // Add cursor blink effect
        typingElement.style.borderRight = '3px solid #12d640';
        typingElement.style.paddingRight = '5px';
    };

    // ====================
    // 7. Parallax Effect on Particles
    // ====================
    const initParallaxParticles = () => {
        const particles = document.querySelectorAll('.particle');
        if (particles.length === 0) return;

        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;

            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 20;
                const x = mouseX * speed;
                const y = mouseY * speed;
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    };

    // ====================
    // Initialize All Features
    // ====================
    document.addEventListener('DOMContentLoaded', () => {
        initPreloader();
        initScrollProgress();
        initBackToTop();
        initCustomCursor();
        initTiltEffect();
        initTypingEnhancement();
        initParallaxParticles();
    });

    // Initialize preloader early
    initPreloader();

})();
