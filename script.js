document.addEventListener('DOMContentLoaded', () => {
    // Initialize Typed.js for the typing effect in the Home section
    const typedTextSpan = document.querySelector('.typing-text span');
    if (typedTextSpan) {
        new Typed(typedTextSpan, {
            strings: ["Mechanical Engineer", "Electromobility Student", "CAD designer", "Sketch Artist"],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
        });
    }

    // --- Section Navigation Logic (for smooth scrolling) ---
    const mainNavLinks = document.querySelectorAll('.main-nav-link');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const letsGetStartedBtn = document.getElementById('lets-get-started-btn'); // Get the "Let's Get Started" button
    const mainContentSections = document.querySelectorAll('.main-content-section');

    // Function to set active navigation link based on current scroll position
    const setActiveNavLink = (currentSectionId) => {
        mainNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSectionId)) {
                link.classList.add('active');
            }
        });
    };

    // Initial setting of active navigation link on page load
    // This will highlight 'Home' initially.
    setActiveNavLink('home');

    mainNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor jump

            const targetId = link.getAttribute('href').substring(1); // Get section ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Calculate scroll position, accounting for fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active navigation link
                setActiveNavLink(targetId);
            }

            // Close mobile menu if open after clicking a link
            mobileMenuOverlay.classList.add('hidden');
        });
    });

    // --- "Let's Get Started" button click animation trigger ---
    if (letsGetStartedBtn) {
        letsGetStartedBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor jump
            const targetId = letsGetStartedBtn.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                setActiveNavLink(targetId); // Set projects section as active
            }
        });
    }


    // --- Mobile Menu Toggle ---
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuOverlay.classList.remove('hidden');
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenuOverlay.classList.add('hidden');
    });

    // --- Resume Tabbed Content Logic ---
    const resumeTabButtons = document.querySelectorAll('.resume-tab-button');
    const resumeContentPanes = document.querySelectorAll('.resume-content-pane');

    resumeTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and hide all panes
            resumeTabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-orange-600', 'text-black'); // Ensure all active classes are removed
                btn.classList.add('bg-gray-700', 'text-gray-300');
            });

            // Remove 'animated' class from all elements in all panes before hiding
            resumeContentPanes.forEach(pane => {
                pane.querySelectorAll('.animate-on-scroll').forEach(el => {
                    el.classList.remove('animated');
                });
                pane.classList.add('hidden');
            });

            // Add active class to clicked button and show corresponding pane
            button.classList.add('active', 'bg-orange-600', 'text-black');
            button.classList.remove('bg-gray-700', 'text-gray-300');
            const targetTabId = `resume-${button.dataset.tab}`;
            const targetPane = document.getElementById(targetTabId);
            if (targetPane) {
                targetPane.classList.remove('hidden');
                // Re-trigger animation for elements in the newly active pane with a slight delay
                setTimeout(() => {
                    targetPane.querySelectorAll('.animate-on-scroll').forEach(el => {
                        el.classList.add('animated');
                    });
                }, 50); // Small delay to ensure display property has taken effect
            }
        });
    });

    // --- Scroll Animation Logic ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element visible to trigger
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            } else {
                entry.target.classList.remove('animated');
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Active navigation link on scroll (for non-click scrolling) ---
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('header').offsetHeight;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        setActiveNavLink(current); // Update active navigation link based on scroll
    });

    // --- Horizontal Scroll with Mouse Wheel for Projects Section ---
    const projectsWrapper = document.querySelector('.overflow-x-auto-wrapper');
    if (projectsWrapper) {
        projectsWrapper.addEventListener('wheel', (event) => {
            // Check if the user is trying to scroll vertically
            if (event.deltaY !== 0) {
                // Prevent default vertical scrolling
                event.preventDefault();
                // Scroll horizontally instead
                projectsWrapper.scrollLeft += event.deltaY;
            }
        });
    }
});
