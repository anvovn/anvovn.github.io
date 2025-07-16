console.log("Script loaded");

// Setting active
const navLinks = document.querySelectorAll('.navbar a');
// Scroll affects all sections with IDs (all on navbar)
const sections = document.querySelectorAll('section');

let isNavClick = false;

// On click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active')); // remove from all
        link.classList.add('active'); // add to clicked
        isNavClick = true;
        setTimeout(() => {
            isNavClick = false;
        }, 1000); // Adjust timeout as needed for your scroll duration
    });
});

// On scroll
const observer = new IntersectionObserver(entries => {
    if (isNavClick) return; // Skip if nav click is in progress
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
                }
            });
            }
        });
    },
    { threshold: 0.3 }
);
sections.forEach(section => observer.observe(section));

// Section animation on scroll
const hiddenElements = document.querySelectorAll('.hidden');
const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // revealObserver.unobserve(entry.target); // optional: animate once
            } else {
                entry.target.classList.remove('show');
            }
        });
    },
);
hiddenElements.forEach(el => revealObserver.observe(el));

