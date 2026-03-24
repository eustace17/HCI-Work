const laws = [
    {id:'p', icon:'🔵', name:'Proximity', title:'Law of Proximity', color:'#00f3ff', desc:'Elements that are close to each other are perceived as a group.'},
    {id:'s', icon:'🟣', name:'Similarity', title:'Law of Similarity', color:'#ff00ea', desc:'Objects that share visual characteristics (color, shape, size, texture) are seen as related.'},
    {id:'c', icon:'🟡', name:'Closure', title:'Law of Closure', color:'#ffe600', desc:'The mind fills in gaps to perceive complete, familiar shapes from incomplete or broken outlines.'},
    {id:'ct', icon:'🟢', name:'Continuity', title:'Law of Continuity', color:'#00ff66', desc:'The eye follows the smoothest path, perceiving lines or curves as continuous even when interrupted.'},
    {id:'fg', icon:'🟠', name:'Figure-Ground', title:'Figure-Ground', color:'#ff6a00', desc:'We instinctively separate objects (figure) from their background (ground), often perceiving one as dominant.'},
    {id:'cf', icon:'🟪', name:'Common Fate', title:'Common Fate', color:'#b200ff', desc:'Elements moving in the same direction are perceived as a unified group.'}
];

let viewed = new Set();

const menu = document.getElementById("menu-container");
const wrapper = document.getElementById("text-wrapper");
const title = document.getElementById("law-title");
const desc = document.getElementById("law-desc");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");

/* CREATE MENU */
laws.forEach((law, index) => {
    let item = document.createElement("div");
    item.className = "menu-item";
    item.innerHTML = `<span>${law.icon} ${law.name}</span><span class="check-icon">✓</span>`;
    item.onclick = () => selectLaw(index, item);
    menu.appendChild(item);
});

function selectLaw(index, element) {
    let law = laws[index];

    document.querySelectorAll(".menu-item").forEach(e => e.classList.remove("active"));
    element.classList.add("active");

    document.documentElement.style.setProperty('--active-glow', law.color);

    /* TEXT TRANSITION */
    wrapper.classList.add("hidden");

    setTimeout(() => {
        title.textContent = law.title;
        title.style.color = law.color;
        desc.textContent = law.desc;
        wrapper.classList.remove("hidden");
    }, 300);

    /* TRACK VIEWED */
    if (!viewed.has(law.id)) {
        viewed.add(law.id);
        element.classList.add("viewed");
        updateProgress();
    }
}

function updateProgress() {
    let percent = Math.round((viewed.size / laws.length) * 100);
    progressFill.style.width = percent + "%";
    progressText.textContent = percent + "%";
}

function resetAll() {
    viewed.clear();
    updateProgress();

    document.querySelectorAll(".menu-item").forEach(e => {
        e.classList.remove("viewed", "active");
    });

    title.textContent = "Select a Concept";
    desc.textContent = "Click a Gestalt law to begin.";
    
    // Reset the glow color to default
    document.documentElement.style.setProperty('--active-glow', '#00f3ff');
}