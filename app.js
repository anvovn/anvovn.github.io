console.log("Script loaded");

// Setting active
const navLinks = document.querySelectorAll('.navbar a');
// Scroll affects all sections with IDs (all on navbar)
const sections = document.querySelectorAll('section');

// On click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active')); // remove from all
        link.classList.add('active'); // add to clicked
    });
});

// On scroll
const observer = new IntersectionObserver(entries => {
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
                revealObserver.unobserve(entry.target); // optional: animate once
            }
        });
    },
);
hiddenElements.forEach(el => revealObserver.observe(el));

