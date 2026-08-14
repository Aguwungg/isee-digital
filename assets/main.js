document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle (Smooth & Click-Outside Close)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuContainer = document.getElementById('mobile-menu-container');

    if (mobileMenuBtn && mobileMenuContainer) {
        const toggleMenu = (show) => {
            const isCurrentlyHidden = mobileMenuContainer.classList.contains('hidden');
            const shouldOpen = show !== undefined ? show : isCurrentlyHidden;

            if (shouldOpen) {
                mobileMenuContainer.classList.remove('hidden');
                mobileMenuContainer.classList.add('flex');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenuContainer.classList.add('hidden');
                mobileMenuContainer.classList.remove('flex');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        };

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuContainer.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                if (!mobileMenuContainer.classList.contains('hidden')) {
                    toggleMenu(false);
                }
            }
        });

        // Close menu on pressing Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenuContainer.classList.contains('hidden')) {
                toggleMenu(false);
            }
        });
    }
});

