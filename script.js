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

    // --- Section Navigation and Mobile Menu ---
    mainNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
            // Close mobile menu after clicking a link
            if (mobileMenuOverlay.classList.contains('translate-x-0')) {
                mobileMenuOverlay.classList.remove('translate-x-0');
            }
        });
    });

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('translate-x-0');
        });
    }

    if (closeMobileMenuButton) {
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('translate-x-0');
        });
    }

    // Scroll to contact section when "Let's Get Started" is clicked
    if (letsGetStartedBtn) {
        letsGetStartedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const contactSection = document.getElementById('project');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // --- Observer for fade-in animations on scroll ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element must be visible
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

    // --- Project Filter Buttons Functionality ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove 'active' class from all buttons and reset styles
            filterButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-orange-400', 'text-black');
                btn.classList.add('bg-gray-800', 'text-gray-300');
            });

            // Add 'active' class to the clicked button and apply active styles
            button.classList.add('active', 'bg-orange-400', 'text-black');
            button.classList.remove('bg-gray-800', 'text-gray-300');

            const filter = button.getAttribute('data-filter');

            // Reset all animations by removing the 'animated' class and hiding all items
            projectItems.forEach(item => {
                item.classList.remove('animated');
                item.style.display = 'none';
            });
            
            // Use a counter to apply a sequential delay
            let delay = 0;
            const delayIncrement = 50; // Milliseconds

            // Iterate over all project items and animate the ones that match the filter
            projectItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filter === 'all' || itemCategory.includes(filter)) {
                    // Show the item
                    item.style.display = 'block';

                    // Apply the 'animated' class with a delay
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, delay);
                    
                    // Increment the delay for the next item
                    delay += delayIncrement;
                }
            });
        });
    });

    // --- Resume Tabbed Content Functionality ---
    const resumeTabButtons = document.querySelectorAll('.resume-tab-button');
    const resumeContentPanes = document.querySelectorAll('.resume-content-pane');

    resumeTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes and add hidden class to all panes and buttons
            resumeTabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-orange-600', 'text-black');
                btn.classList.add('bg-gray-700', 'text-gray-300');
            });
            resumeContentPanes.forEach(pane => {
                pane.classList.add('hidden');
            });

            // Add active class to the clicked button and show the corresponding pane
            button.classList.add('active', 'bg-orange-600', 'text-black');
            button.classList.remove('bg-gray-700', 'text-gray-300');
            const targetTab = button.getAttribute('data-tab');
            const targetPane = document.getElementById(`resume-${targetTab}`);
            if (targetPane) {
                targetPane.classList.remove('hidden');
            }
        });
    });

    // --- Set initial active resume tab on page load ---
    const initialTabButton = document.querySelector('.resume-tab-button[data-tab="skills"]');
    const initialContentPane = document.getElementById('resume-skills');
    if (initialTabButton && initialContentPane) {
        initialTabButton.classList.add('active', 'bg-orange-600', 'text-black');
        initialTabButton.classList.remove('bg-gray-700', 'text-gray-300');
        initialContentPane.classList.remove('hidden');
    }
});
