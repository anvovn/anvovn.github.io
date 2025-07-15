console.log("Script loaded");

// Setting active
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.navbar a');
    // Scroll affects all divs with IDs (all on navbar)
    const sections = document.querySelectorAll('div[id]');
  
    // On click
    navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active')); // remove from all
        link.classList.add('active'); // add to clicked
    });
    });

    // On scroll
    const observer = new IntersectionObserver(
        entries => {
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
    { threshold: 1 }
    );

    sections.forEach(section => observer.observe(section));
});

