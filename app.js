console.log("Script loaded");

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPage = window.location.pathname.split("/").pop();
    const navbar = document.querySelector(".navbar");

    // Navbar Animation
    if (sessionStorage.getItem("navClicked") === "true") {
        // Skip animation if navigating via navbar
        navbar.classList.add("no-animation");
        sessionStorage.removeItem("navClicked");
    } else {
        // Play animation normally
        navbar.classList.add("animate-navbar");
    }

    // Mark navbar click to skip animation on next page
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            sessionStorage.setItem("navClicked", "true");
        });
    });

    // Highlight current page link
    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Section reveal on scroll
    const hiddenElements = document.querySelectorAll('.hidden');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                revealObserver.unobserve(entry.target); // optional: animate once
            }
        });
    });
    hiddenElements.forEach(el => revealObserver.observe(el));

    // Skills wheel
    const skills = document.querySelectorAll("#skills-list li");
    let currentIndex = 0;

    function updateSkills() {
        skills.forEach(skill => skill.classList.remove("active"));
        skills[currentIndex].classList.add("active");

        const itemHeight = 60; // same as line-height
        const containerMidpoint = 120; // half of .skills-wheel height (300px / 2.5ish)
        const offset = -(currentIndex * itemHeight) + containerMidpoint;

        document.getElementById("skills-list").style.transform = `translateY(${offset}px)`;
    }

    function rotateSkills() {
        currentIndex = (currentIndex + 1) % skills.length;
        updateSkills();
    }

    // Start rotation
    updateSkills();
    setInterval(rotateSkills, 2000); // rotates every 2s
});
