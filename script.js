const projects = [
    {
        title: "Election Voting System",
        description: "A secure voting system with admin, voter and candidate modules built for reliability and data integrity.",
        tags: ["Flask", "PostgreSQL", "JavaScript"],
        liveUrl: "#contact",
        codeUrl: "#contact"
    },
    {
        title: "Swahiliplot Learning Platform",
        description: "A learning management system with courses, quizzes and progress tracking for language learners.",
        tags: ["Flask", "JavaScript", "SQL"],
        liveUrl: "#contact",
        codeUrl: "https://github.com/louis479/Learningplatform"
    },
    {
        title: "Portfolio Website",
        description: "A responsive personal portfolio website to showcase projects, skills and professional experience.",
        tags: ["HTML", "CSS", "JavaScript"],
        liveUrl: "#contact",
        codeUrl: "#contact"
    },
    {
        title: "Expense Tracker",
        description: "An application for tracking income, expenses and generating clean financial reports.",
        tags: ["Flask", "Bootstrap", "JavaScript"],
        liveUrl: "#contact",
        codeUrl: "#contact"
    }
];

const projectsGrid = document.getElementById("projects-grid");
const yearElement = document.getElementById("year");
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.getElementById("nav-links");

function renderProjects() {
    const cards = projects.map((project, index) => {
        const tagMarkup = project.tags
            .map((tag) => `<span>${tag}</span>`)
            .join("");

        return `
            <article class="project-card reveal">
                <span class="project-index">0${index + 1}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${tagMarkup}</div>
                <div class="project-links">
                    <a href="${project.liveUrl}">View Project</a>
                    <a href="${project.codeUrl}">Source Code</a>
                </div>
            </article>
        `;
    });

    projectsGrid.innerHTML = cards.join("");
}

function setupNavigation() {
    navToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("is-open");
        nav.classList.toggle("nav-open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("is-open");
            nav.classList.remove("nav-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setupRevealAnimation() {
    const revealElements = document.querySelectorAll(".reveal, .hero-card, .sidebar-card, .info-panel");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.16 }
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}

function setYear() {
    yearElement.textContent = new Date().getFullYear();
}

renderProjects();
setupNavigation();
setupRevealAnimation();
setYear();
