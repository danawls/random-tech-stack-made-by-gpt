const backendTechnologies = [
    "Node.js", "Django", "Ruby on Rails", "Spring Boot", "Flask", 
    "Express.js", "ASP.NET Core", "Laravel", "Phoenix", "Koa.js"
];

const frontendTechnologies = [
    "React", "Vue.js", "Angular", "Svelte", "Ember.js", 
    "Backbone.js", "Preact", "Alpine.js", "LitElement", "Stencil"
];

const databaseTechnologies = [
    "MySQL", "PostgreSQL", "MongoDB", "SQLite", "Oracle Database", 
    "Microsoft SQL Server", "Firebase", "Redis", "Elasticsearch", "Cassandra"
];

const hostingTechnologies = [
    "AWS", "Azure", "Google Cloud", "Heroku", "Netlify", 
    "Vercel", "DigitalOcean", "Firebase Hosting", "GitHub Pages", "Linode"
];

const favorites = {
    backend: [],
    frontend: [],
    database: [],
    hosting: []
};

function getRandomTech(techArray) {
    const randomIndex = Math.floor(Math.random() * techArray.length);
    return techArray[randomIndex];
}

function generateBackend() {
    const tech = getRandomTech(backendTechnologies);
    document.getElementById("backend-tech").textContent = tech;
}

function generateFrontend() {
    const tech = getRandomTech(frontendTechnologies);
    document.getElementById("frontend-tech").textContent = tech;
}

function generateDatabase() {
    const tech = getRandomTech(databaseTechnologies);
    document.getElementById("database-tech").textContent = tech;
}

function generateHosting() {
    const tech = getRandomTech(hostingTechnologies);
    document.getElementById("hosting-tech").textContent = tech;
}

function addCustomTech() {
    const section = document.getElementById("customize-section").value;
    const newTech = document.getElementById("customize-tech").value.trim();
    if (newTech) {
        let techArray;
        switch (section) {
            case "backend":
                techArray = backendTechnologies;
                break;
            case "frontend":
                techArray = frontendTechnologies;
                break;
            case "database":
                techArray = databaseTechnologies;
                break;
            case "hosting":
                techArray = hostingTechnologies;
                break;
        }
        if (!techArray.includes(newTech)) {
            techArray.push(newTech);
            alert(`${newTech} added to ${section} technologies!`);
            document.getElementById("customize-tech").value = "";
        } else {
            alert(`${newTech} is already in the ${section} technologies list.`);
        }
    } else {
        alert("Please enter a valid technology name.");
    }
}

function addFavorite(tech, category) {
    if (!favorites[category].includes(tech)) {
        favorites[category].push(tech);
        updateFavorites();
        updateFavoritesByCategory();
    }
}

function updateFavorites() {
    const favoritesList = document.getElementById("favorites-list");
    favoritesList.innerHTML = '';
    Object.keys(favorites).forEach(category => {
        favorites[category].forEach(tech => {
            const techElement = document.createElement("div");
            techElement.className = "favorite-tech";
            techElement.textContent = tech;
            techElement.addEventListener("click", () => showTechDetails(tech));
            favoritesList.appendChild(techElement);
        });
    });
}

function updateFavoritesByCategory() {
    Object.keys(favorites).forEach(category => {
        const categoryList = document.getElementById(`${category}-favorites-list`);
        categoryList.innerHTML = '';
        favorites[category].forEach(tech => {
            const techItem = document.createElement("li");
            techItem.textContent = tech;
            techItem.addEventListener("click", () => showTechDetails(tech));
            categoryList.appendChild(techItem);
        });
    });
}

function showTechDetails(tech) {
    const detailsSection = document.getElementById("tech-details");
    const detailsContent = document.getElementById("tech-details-content");
    detailsContent.innerHTML = `<h3>${tech}</h3><p>Details about ${tech}.</p>`;
    detailsSection.classList.add("show-section");
}

// Initial generation
document.addEventListener("DOMContentLoaded", () => {
    generateBackend();
    generateFrontend();
    generateDatabase();
    generateHosting();
    updateFavoritesByCategory();
});

const refreshButton = document.createElement("button");
refreshButton.textContent = "Generate All";
refreshButton.style.marginTop = "1em";
refreshButton.addEventListener("click", () => {
    generateBackend();
    generateFrontend();
    generateDatabase();
    generateHosting();
});
document.querySelector("main").appendChild(refreshButton);

document.querySelectorAll("section").forEach(section => {
    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = "Add to Favorites";
    favoriteButton.addEventListener("click", () => {
        const tech = section.querySelector("p").textContent;
        const category = section.id;
        addFavorite(tech, category);
    });
    section.appendChild(favoriteButton);
});

document.querySelectorAll("section").forEach(section => {
    section.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() !== 'button') {
            const tech = section.querySelector("p").textContent;
            showTechDetails(tech);
        }
    });
});

// Dark mode toggle
const darkModeButton = document.createElement("button");
darkModeButton.textContent = "Toggle Dark Mode";
darkModeButton.style.marginTop = "1em";
darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
document.querySelector("main").appendChild(darkModeButton);

const css = `
body.dark-mode {
    background-color: #121212;
    color: #e0e0e0;
}
body.dark-mode header {
    background-color: #333;
}
body.dark-mode section {
    background-color: #1e1e1e;
    box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
}
body.dark-mode button {
    background-color: #333;
    color: #e0e0e0;
}
body.dark-mode footer {
    background-color: #1e1e1e;
}
body.dark-mode .favorite-tech {
    background-color: #333;
    color: #e0e0e0;
}
body.dark-mode .favorite-tech:hover {
    background-color: #555;
}
body.dark-mode #favorites-by-category li {
    background-color: #333;
    color: #e0e0e0;
}
body.dark-mode #favorites-by-category li:hover {
    background-color: #555;
}
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = css;
document.head.appendChild(styleSheet);

// Drag and Drop Functionality
const sectionsContainer = document.getElementById("sections-container");
let draggedSection = null;

document.querySelectorAll("section").forEach(section => {
    section.addEventListener("dragstart", (e) => {
        draggedSection = section;
        section.style.opacity = 0.5;
    });

    section.addEventListener("dragend", (e) => {
        section.style.opacity = "";
    });

    section.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    section.addEventListener("dragenter", (e) => {
        e.preventDefault();
        section.style.backgroundColor = "#f0f0f0";
    });

    section.addEventListener("dragleave", (e) => {
        section.style.backgroundColor = "";
    });

    section.addEventListener("drop", (e) => {
        e.preventDefault();
        section.style.backgroundColor = "";
        if (section !== draggedSection) {
            let allSections = Array.from(sectionsContainer.children);
            let draggedIndex = allSections.indexOf(draggedSection);
            let targetIndex = allSections.indexOf(section);
            if (draggedIndex < targetIndex) {
                sectionsContainer.insertBefore(draggedSection, section.nextSibling);
            } else {
                sectionsContainer.insertBefore(draggedSection, section);
            }
        }
    });
});
