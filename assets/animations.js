document.addEventListener('DOMContentLoaded', () => {
    // 1. PAGE TRANSITIONS (FADE EFFECT)
    const overlay = document.getElementById('page-transition-overlay');
    
    // Fade in when page loads (remove the white overlay)
    if (overlay) {
        // A small delay to ensure rendering is complete before fading in
        setTimeout(() => {
            overlay.classList.remove('opacity-100');
            overlay.classList.add('opacity-0');
            // Remove from DOM flow after transition
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 500);
        }, 50);
    }

    // Intercept clicks on all internal links for fade out
    const internalLinks = document.querySelectorAll('a[href$=".html"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Ignore links opening in new tabs
            if (link.target === '_blank' || link.ctrlKey || link.metaKey) return;
            
            e.preventDefault();
            const targetUrl = link.href;

            if (overlay) {
                overlay.style.display = 'block';
                // Trigger reflow
                void overlay.offsetWidth;
                
                overlay.classList.remove('opacity-0');
                overlay.classList.add('opacity-100');
                
                // Wait for the transition to finish before navigating
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400); // 400ms to match duration-500 closely but not completely
            } else {
                window.location.href = targetUrl;
            }
        });
    });

    // 2. SLIDING NAVBAR INDICATOR
    const navContainer = document.getElementById('nav-links-container');
    const indicator = document.getElementById('nav-indicator');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (navContainer && indicator && navItems.length > 0) {
        let activeItem = document.querySelector('.nav-item[data-active="true"]') || navItems[0];
        
        // Function to move the pill
        const moveIndicator = (element) => {
            indicator.style.width = `${element.offsetWidth}px`;
            indicator.style.left = `${element.offsetLeft}px`;
            indicator.style.height = `${element.offsetHeight}px`;
            indicator.style.top = `${element.offsetTop}px`;
        };
        
        // Function to update text colors
        const updateTextColors = (hoveredElement) => {
            navItems.forEach(item => {
                if (item === hoveredElement) {
                    item.classList.remove('text-slate-600', 'hover:text-brand-navy');
                    item.classList.add('text-white', 'font-bold');
                } else {
                    item.classList.remove('text-white', 'font-bold');
                    item.classList.add('text-slate-600', 'hover:text-brand-navy');
                }
            });
        };

        // Initialize position on load
        setTimeout(() => {
            moveIndicator(activeItem);
            updateTextColors(activeItem);
            indicator.style.opacity = '1';
        }, 100);

        // Hover events
        navItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                moveIndicator(e.target);
                updateTextColors(e.target);
            });
        });

        // Mouse leave container -> return to active item
        navContainer.addEventListener('mouseleave', () => {
            moveIndicator(activeItem);
            updateTextColors(activeItem);
        });

        // Click event -> set new active item (though page transition will trigger anyway)
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                activeItem = e.target;
                moveIndicator(activeItem);
                updateTextColors(activeItem);
            });
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            moveIndicator(activeItem);
        });
    }
});
