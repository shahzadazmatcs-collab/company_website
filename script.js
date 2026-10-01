/* =========================================================
   DORSCH ENGINEERING & CONSTRUCTION
   JAVASCRIPT
========================================================= */


/* =========================================================
   ELEMENTS
========================================================= */

const header = document.getElementById("header");
const mobileMenu = document.getElementById("mobileMenu");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("backToTop");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const counters = document.querySelectorAll("[data-count]");


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function handleHeaderScroll() {

    if (window.scrollY > 60) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}

window.addEventListener("scroll", handleHeaderScroll);

handleHeaderScroll();


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

mobileMenu.addEventListener("click", () => {

    nav.classList.toggle("open");

    document.body.classList.toggle("menu-open");

    const icon = mobileMenu.querySelector("i");

    if (nav.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close menu after navigation */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");
        document.body.classList.remove("menu-open");

        const icon = mobileMenu.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveLink() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {

            link.classList.add("active");

        }

    });

}

window.addEventListener("scroll", updateActiveLink);


/* =========================================================
   BACK TO TOP
========================================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================================
   NUMBER COUNTER
========================================================= */

let countersStarted = false;

function startCounters() {

    if (countersStarted) {
        return;
    }

    const statsSection =
        document.querySelector(".stats-section");

    if (!statsSection) {
        return;
    }

    const sectionPosition =
        statsSection.getBoundingClientRect().top;

    const screenPosition =
        window.innerHeight * 0.85;

    if (sectionPosition < screenPosition) {

        countersStarted = true;

        counters.forEach(counter => {

            const target =
                Number(counter.getAttribute("data-count"));

            let current = 0;

            const duration = 1400;

            const increment =
                target / (duration / 20);

            const timer = setInterval(() => {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent =
                    Math.floor(current) + "+";

            }, 20);

        });

    }

}

window.addEventListener("scroll", startCounters);

startCounters();


/* =========================================================
   CONTACT FORM
========================================================= */

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (!name || !email || !message) {

        formMessage.textContent =
            "Please complete all required fields.";

        formMessage.style.color = "#b33a3a";

        return;

    }


    /*
        IMPORTANT:

        This is only front-end validation.

        For a real company website, connect this form
        to a backend/API/email service.

        Example flow:

        Website
           ↓
        Backend
           ↓
        Email / CRM
           ↓
        DORSCH team
    */


    formMessage.textContent =
        "Thank you. Your enquiry has been prepared successfully.";

    formMessage.style.color = "#557a42";


    contactForm.reset();

});


/* =========================================================
   SMOOTH SCROLL FOR ANCHOR LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header.offsetHeight;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight;

        window.scrollTo({

            top: targetPosition,

            behavior: "smooth"

        });

    });

});


/* =========================================================
   PROJECT CARD INTERACTION
========================================================= */

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.cursor = "pointer";

    });

});


/* =========================================================
   ESCAPE KEY — CLOSE MOBILE MENU
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        nav.classList.remove("open");

        document.body.classList.remove("menu-open");

        const icon =
            mobileMenu.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElement =
    document.getElementById("currentYear");

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}