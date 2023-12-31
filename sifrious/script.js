

var nav_landing = document.getElementById('landing-button-container');
var nav_select = nav_landing;
var nav_select_group = "landing";
var nav_select_project = null;
var nav_highlight_div = null;
var nav_highlight_name = null;
var displaying = "landing";
// const container = document.getElementById('grid-container');
// const navLandingButton = document.getElementById('landingButton');
// const navSkillsButton = document.getElementById('skillsButton');
// const navProjectsButton = document.getElementById('projectsButton');
// const navContactButton = document.getElementById('contactButton');
// const navButtons = [navSkillsButton, navProjectsButton, navContactButton, navLandingButton];

// STATE FUNCTIONS

function getParentDiv(nav_button) {
    const nav_button_id = nav_button.id;
    if (nav_button_id.indexOf('-') > 0) {
        return nav_landing;
    };
    // if (nav_button.classList.includes('')));
    let parent_div = document.getElementById(nav_button.getAttribute('parent-item-id'));
    if (parent_div) {
        return parent_div
    } else {
        console.log("target parent not found");
        console.log(nav_button);
    }
}

function updateNavSelect(new_selection) {
    if (new_selection === null) {
        nav_select = nav_landing;
        nav_select_group = 'landing'
        nav_highlight_div = null;
        nav_highlight_name = null;
    } else {
        nav_select = new_selection;
        nav_select_group = new_selection.getAttribute('data-attribute');
        nav_highlight_div = getParentDiv(nav_select);
        nav_highlight_name = `button-${nav_select_group}-select`; 
    };
    console.log("--------------- updated nav_select ---------------");
    console.log(`nav_select: '${nav_select.id}'`);
    console.log(nav_select);
    console.log(`nav_select_group: '${nav_select_group}'`);
    console.log(`nav_highlight_name: '${nav_highlight_name}'`);
    if (nav_highlight_div !== null) {
        console.log(`nav_highlight_div: '${nav_highlight_div.id}'`);
        console.log(nav_highlight_div);
    }
};

/*
    ELEMENT GROUP FUNCTIONS
*/

function updateNavGroupDisplay() {
    // reset to landing if currently displayed selection is clicked
    if (nav_select_group === displaying) {
        updateNavSelect(null);
    };
    console.log(`navigated to ${nav_select_group} from ${displaying}`);
    toggleHidden(getToggleClassElements(displaying)); // hide old group
    toggleHidden(getToggleClassElements(nav_select_group)); // show new group
    displaying = nav_select_group; // update displaying to hold current display group
    return displaying;
};

function getToggleClassElements(group_name) {
    return {"list": document.getElementById(`${group_name}-container`), 
        "article": document.getElementById(`${group_name}-detail`), 
        "group": group_name};
}

function toggleHidden(elements) {
    for (let element of Object.keys(elements)) {
        const div = elements[element];
        console.log("toggleHidden");
        console.log(elements);
        if (div.classList) {
            if (div.classList.contains('hidden') === true) {
                div.classList.remove('hidden');
                console.log(`removed hidden to classlist ${div.classList}`);
            } else {
                div.classList.add('hidden');
                console.log(`added hidden to ${elements.group} classlist ${div.classList}`);
            };
        };
    };
};

function toggleDisplayGroup() {
    id = nav_select_group;
    let displayed_group = getToggleClassElements();
    console.log(displayed_group);
    updateNavGroupDisplay();
};

/*
    GRADIENT FUNCTIONS
*/


const addRainbow = function(targetParent) {
    console.log(`adding a rainbow to target using class ${nav_highlight_name}`);
    targetParent.classList.remove('no-gradient');
    targetParent.classList.add(nav_highlight_name);
    return targetParent;
};

const removeRainbow = function() {
    console.log(`hit removeRainbow with target_parent`);
    if (nav_highlight_div && nav_highlight_div !== null) {
        console.log("removing based on criteria ");
        nav_highlight_div.style.backgroundImage = 'none';
        nav_highlight_div.classList.remove(nav_highlight_name);
        nav_highlight_div.classList.add('no-gradient');
    }
}

const toggleRainbows = function() {
    if (nav_select.getAttribute('aria-expanded') === 'true') {
        addRainbow(nav_highlight_div);
    } else if (nav_highlight_div === nav_landing || nav_select.getAttribute('aria-expanded') === 'false') {
        removeRainbow(nav_highlight_div);
    };
};

const selectNavGroup = function (e) {
    // remove gradient from previous selection, if it exists
    if (nav_highlight_div !== null) {
        nav_select.setAttribute('aria-expanded', 'false');
        toggleRainbows();
    } else {
        console.log(`didnt remove rainbow because nav_highlight_div was ${nav_highlight_div}`);
    };
    const new_nav_select = e.target.offsetParent;
    if (new_nav_select === nav_select) {
        console.log("toggle off");
        updateNavSelect(null);
    } else {
        console.log("new thing here");
        updateNavSelect(e.target.offsetParent);
    }
    if (nav_select.getAttribute('aria-expanded') === 'true') {
        nav_select.setAttribute('aria-expanded', 'false');
    } else if (nav_select.getAttribute('aria-expanded') === 'false') {
        nav_select.setAttribute('aria-expanded', 'true');
    };
    toggleRainbows(nav_select);
}

const addProjectListeners = function () {
    const projectButtons = document.getElementsByClassName("project-button");
    for (let projectButton of projectButtons) {
        projectButton.addEventListener("click", toggleProjectVisibilty)
    }
}

const addNavListeners = function () {
    const navButtons = document.getElementsByClassName('nav-bar-button');
    for (let button of navButtons) {
        button.addEventListener("click", selectNavGroup);
        button.addEventListener("click", toggleDisplayGroup);
    };
};

window.onload = function() {
    updateNavSelect(null);
    console.log("it fired");
    addNavListeners();
    addProjectListeners();
};