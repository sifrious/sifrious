

const showSkills = function() {
    console.log("showSkills");
};

const showAllProjects = function() {
    console.log("showSkills");
}; 

const showContact = function() {
    console.log("showContact");
};

const clearDisplay = function() {
    console.log(`clear display from ${displaying}`);
};

var nav_select = null;
var nav_highlight_name = null;
var displaying = "default";
const container = document.getElementById('grid-container');
const navTitleButton = document.getElementById('titleButton');
const navProjectsButton = document.getElementById('projectsButton');
const navContactButton = document.getElementById('contactButton');
const parentDivs = {
    "titleButton": ["left-main-item", showSkills],
    "projectsButton": ["button-projects", showAllProjects],
    "contactButton": ["button-contact", showContact],
}
const navButtons = [navTitleButton, navProjectsButton, navContactButton];


const toggleRainbows = function(e) {
    if (nav_select) {
        nav_select.style.backgroundImage = 'none';
        nav_select.classList.remove(nav_highlight_name);
        nav_select.classList.add('no-gradient');
        container.blur();
        clearDisplay();
    };
    nav_select = null;
    const targetButton = e.target;
    const id = (targetButton.id.length > 0) ? targetButton.id:targetButton.parentNode.id;
    const parentDivId = parentDivs[id][0];
    parentDivs[id][1];
    const targetParent = document.getElementById(parentDivId);
    nav_select = targetParent;
    const targetClassName = `${parentDivId}-select`;
    nav_highlight_name = targetClassName;
    targetParent.classList.remove('no-gradient');
    targetParent.classList.add(targetClassName);
    console.log(`target div id - ${parentDivId}`);
    console.log(targetParent);
    console.log(targetClassName);
}

const addNavListeners = function () {
    let i = 0
    for (let button of navButtons) {
        button.addEventListener("click", toggleRainbows);
        i += 1;
    };
}

window.onload = function() {
    console.log("it fired");
    addNavListeners();
};