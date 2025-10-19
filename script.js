// Intersection Observer for fade-in animations
const fadeSections = document.querySelectorAll('.fade-in-section');

const sectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Start animation when 10% of section is visible
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, sectionObserverOptions);

fadeSections.forEach(section => {
    sectionObserver.observe(section);
});

// General functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tabs for IOL
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;

            tabButtons.forEach(btn => {
                btn.classList.remove('tab-active');
                btn.classList.add('border-transparent', 'text-gray-500', 'hover:text-sky-700', 'hover:border-gray-300');
            });
            button.classList.add('tab-active');
            button.classList.remove('border-transparent', 'text-gray-500', 'hover:text-sky-700', 'hover:border-gray-300');
            
            tabContents.forEach(content => {
                content.style.opacity = 0; // Start fade out
                setTimeout(() => { // Hide after fade out
                    if (content.id === tabId) {
                        content.classList.remove('hidden');
                        setTimeout(() => content.style.opacity = 1, 10); // Fade in new content
                    } else {
                        content.classList.add('hidden');
                    }
                }, 300); // Duration matches CSS transition
            });
        });
    });
    // Initial opacity set for tab content (hidden content remains hidden, visible content is made opaque)
    tabContents.forEach(content => {
        content.style.transition = 'opacity 0.3s ease-in-out';
        if (!content.classList.contains('hidden')) {
            content.style.opacity = 1;
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile navigation
    const mobileNav = document.getElementById('mobile-nav');
    mobileNav.addEventListener('change', function() {
        document.querySelector(this.value).scrollIntoView({ behavior: 'smooth' });
    });
    
    // Intersection Observer for active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active-nav');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active-nav');
                        if(mobileNav.value !== `#${entry.target.id}`) {
                            mobileNav.value = `#${entry.target.id}`;
                        }
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
