/**
 * Theme Toggle - Dark/Light Mode
 */
(function () {
    // Get stored theme or default to dark
    const getStoredTheme = () => localStorage.getItem('theme') || 'dark';

    // Set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleButton(theme);
    };

    // Update toggle button text
    const updateToggleButton = (theme) => {
        const toggleText = document.querySelector('.theme-toggle span');
        if (toggleText) {
            toggleText.textContent = theme === 'dark' ? 'Light' : 'Dark';
        }
    };

    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = getStoredTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // Initialize theme on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Apply stored theme immediately
        setTheme(getStoredTheme());

        // Add click listener to toggle button
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }
    });

    // Apply theme immediately (before DOM is fully loaded to prevent flash)
    setTheme(getStoredTheme());
})();
