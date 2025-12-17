/**
 * New Features JavaScript
 * - Live Greeting with Clock
 * - Download Button Animation
 * - Card Flip Effect
 */
(function () {
    'use strict';

    // ====================
    // 1. Live Greeting with Clock
    // ====================
    const initLiveGreeting = () => {
        const greetingContainer = document.querySelector('.live-greeting');
        if (!greetingContainer) return;

        const updateGreeting = () => {
            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();

            // Format time
            const hour12 = hours % 12 || 12;
            const period = hours >= 12 ? 'PM' : 'AM';
            const timeString = `${hour12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

            // Determine greeting
            let greetingType, icon, iconClass;
            if (hours >= 5 && hours < 12) {
                greetingType = 'Good Morning';
                icon = '☀️';
                iconClass = 'sun';
            } else if (hours >= 12 && hours < 17) {
                greetingType = 'Good Afternoon';
                icon = '🌤️';
                iconClass = 'sun';
            } else if (hours >= 17 && hours < 21) {
                greetingType = 'Good Evening';
                icon = '🌅';
                iconClass = 'sun';
            } else {
                greetingType = 'Good Night';
                icon = '🌙';
                iconClass = 'moon';
            }

            // Get timezone
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            // Update DOM
            const timeEl = greetingContainer.querySelector('.time');
            const periodEl = greetingContainer.querySelector('.period');
            const greetingTypeEl = greetingContainer.querySelector('.greeting-type');
            const greetingIconEl = greetingContainer.querySelector('.greeting-icon');
            const timezoneEl = greetingContainer.querySelector('.timezone-text');

            if (timeEl) timeEl.textContent = timeString;
            if (periodEl) periodEl.textContent = period;
            if (greetingTypeEl) greetingTypeEl.textContent = greetingType;
            if (greetingIconEl) {
                greetingIconEl.textContent = icon;
                greetingIconEl.className = `greeting-icon ${iconClass}`;
            }
            if (timezoneEl) timezoneEl.textContent = timezone;
        };

        // Update immediately and every second
        updateGreeting();
        setInterval(updateGreeting, 1000);
    };

    // ====================
    // 2. Download Button Animation
    // ====================
    const initDownloadButton = () => {
        const downloadBtns = document.querySelectorAll('.download-resume-btn');

        downloadBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                // Don't prevent default - let the link work
                const originalText = this.innerHTML;

                // Add downloading state
                this.classList.add('downloading');
                this.innerHTML = '<i class="ri-download-line"></i> DOWNLOADING...';

                // Reset after 2 seconds
                setTimeout(() => {
                    this.classList.remove('downloading');
                    this.innerHTML = '<i class="ri-download-line"></i> DOWNLOAD RESUME';
                }, 2000);
            });
        });
    };

    // ====================
    // 3. Card Flip Initialization
    // ====================
    const initCardFlip = () => {
        const flipCards = document.querySelectorAll('.portfolio-item.flip-card');

        flipCards.forEach(card => {
            // Add touch support for mobile
            card.addEventListener('touchstart', function () {
                this.querySelector('.portfolio-wrap').style.transform =
                    this.querySelector('.portfolio-wrap').style.transform === 'rotateY(180deg)'
                        ? 'rotateY(0deg)'
                        : 'rotateY(180deg)';
            }, { passive: true });
        });
    };

    // ====================
    // Initialize All Features
    // ====================
    document.addEventListener('DOMContentLoaded', () => {
        initLiveGreeting();
        initDownloadButton();
        initCardFlip();
    });

})();
