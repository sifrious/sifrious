
var nav_select = null;
var nav_select_group = "Landing";
var nav_select_project = null;
var nav_highlight_name = null;
var displaying = "default";
const container = document.getElementById('grid-container');
const navLandingButton = document.getElementById('landingButton');
const navSkillsButton = document.getElementById('skillsButton');
const navProjectsButton = document.getElementById('projectsButton');
const navContactButton = document.getElementById('contactButton');
const parentDivs = {
    "skillsButton": "skills-item",
    "projectsButton": "button-projects",
    "contactButton": "button-contact",
}
const navButtons = [navSkillsButton, navProjectsButton, navContactButton, navLandingButton];
/*
    ELEMENT GROUP FUNCTIONS
*/

function updateNavSelectGroup(group_name) {
    let global_group_name = `${group_name.charAt(0).toUpperCase()}${group_name.slice(1)}`;
    if (nav_select_group === global_group_name && nav_select_group != 'Landing') {
        displayed_group = getToggleClassElements(group_name);
        nav_select_group = 'Landing';
        toggleHidden(displayed_group);
        console.log(`nav select group should be Landing here ${nav_select_group}; returning reset`)
        return 'reset';
    };
    nav_select_group = global_group_name;
    console.log(`in UPDATENAVSELECTGROUP for ${group_name}: group name in update nav select group is ${nav_select_group} <= ${group_name}`);
    return group_name;
};

function getToggleClassElements(id) {
    let group_name = (id && id.length > 0)? id :nav_select_group.toLowerCase();
    let list_container = document.getElementById(`${group_name}-container`);
    let detail = document.getElementById(`${group_name}-detail`);
    return {"list": list_container, "article": detail, "group": group_name};
}

function toggleHidden(elements) {
    function hideAllMembers(elements) {
        console.log(`hiding all member of group ${elements.group}`);
        for (let element of Object.keys(elements)) {
            if (elements[element].classList && element !== 'group') {
                if (elements[element].classList.contains('hidden') === false) {
                    elements[element].classList.add('hidden');  
                }; 
            };
        };
    };

    function showAllMembers(elements) {
        console.log(`showing all member of group ${elements.group}`);
        for (let element of Object.keys(elements)) {
            if (elements[element].classList && element !== 'group') {
                if (elements[element].classList.contains('hidden') === true) {
                    elements[element].classList.remove('hidden');  
                };  
            };
        };
    };

    if (elements.group.slice(1) !== nav_select_group.slice(1)) {
        hideAllMembers(elements);
        return null;
    };
    if (elements !== 'reset') {
        showAllMembers(elements);
    };
}

function toggleDisplayGroup(e) {
    id = e.target.parentNode.id.slice(0, e.target.parentNode.id.toLowerCase().indexOf("button"));
    console.log(getToggleClassElements())
    let displayed_group = getToggleClassElements();
    e = updateNavSelectGroup(id);
    if (e === 'reset') {
        toggleHidden(getToggleClassElements('landing'));
    } else {
        toggleHidden(displayed_group);
        toggleHidden(getToggleClassElements(e));
    };
}

function toggleLandingDiv(e) {
    console.log("hit toggle landing div");
    toggleDisplayGroup(e);
}

function toggleSkillsDiv(e) {
    console.log("hit toggle skills div -------------------------------------------------------------------");
    toggleDisplayGroup(e);
}

function toggleProjectsDiv(e) {
    console.log("hit toggle projects div");
    toggleDisplayGroup(e);
}

function toggleContactDiv(e) {
    console.log("hit toggle contact div");
    toggleDisplayGroup(e);
}

/*
    GRADIENT FUNCTIONS
*/
const addRainbow = function(targetParent) {
    const targetClassName = `${targetParent.id}-select`;
    nav_highlight_name = targetClassName;
    targetParent.classList.remove('no-gradient');
    targetParent.classList.add(targetClassName);
    // console.log(`target div id - ${targetParent.id}`);
    // console.log(targetParent);
    // console.log(targetClassName);
    return targetParent;
}

const determineRainbowLocation = function(e) {
    // return parent element of button (event target with listener)
    const targetButton = e.target;
    const id = (targetButton.id.length > 0) ? targetButton.id:targetButton.parentNode.id;
    const parentDivId = parentDivs[id];
    return targetParent = document.getElementById(parentDivId);
};

const toggleRainbows = function(e) {
    // determine if rainbow background should be added to another div
    var parent_div = determineRainbowLocation(e);
    if (nav_select) {
        var requires_rainbow_elsewhere = parent_div !== nav_select;
        nav_select.style.backgroundImage = 'none';
        nav_select.classList.remove(nav_highlight_name);
        nav_select.classList.add('no-gradient');
        container.blur();
        nav_select = null;
        if (requires_rainbow_elsewhere === false) {
            return null;
        };
    };
    nav_select = addRainbow(parent_div);
};

const toggleProjectVisibility = function (event) {
    
}

const addProjectListeners = function () {
    const projectButtons = document.getElementById("projects-item");
    for (let projectButton of ProjectButtons) {
        button.addEventListener("click", toggleProjectVisibilty)
    }
}

const addNavListeners = function () {
    for (let button of navButtons) {
        button.addEventListener("click", toggleRainbows);
        let group_name = button.id.slice(0, button.id.indexOf("Button"));
        nav_select_group = `${group_name.charAt(0).toUpperCase()}${group_name.slice(1)}`;
        console.log(nav_select_group)
        let group_function_name = `toggle${nav_select_group}Div`;
        if(group_function_name in window){
            button.addEventListener("click", window[group_function_name]);
        };
    };

}

window.onload = function() {
    console.log("it fired");
    addNavListeners();
    addProjectListeners();
};