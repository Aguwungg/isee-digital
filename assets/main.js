document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn'); // Find hamburger button
    const mobileMenuContainer = document.getElementById('mobile-menu-container');

    if (mobileMenuBtn && mobileMenuContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            if (mobileMenuContainer.classList.contains('hidden')) {
                mobileMenuContainer.classList.remove('hidden');
                mobileMenuContainer.classList.add('flex');
            } else {
                mobileMenuContainer.classList.add('hidden');
                mobileMenuContainer.classList.remove('flex');
            }
        });
    }
});
