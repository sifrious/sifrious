

var nav_landing = document.getElementById('landing-button-container');
var nav_select = nav_landing;
var nav_select_group = "landing";
var nav_select_project = null;
var nav_select_button = null;
var nav_highlight_div = null;
var nav_highlight_name = null;
var nav_project_select = 'overview';
var nav_project_select_group = null;
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
        // console.log("target parent not found");
        // console.log(nav_button);
    }
}

function updateNavSelect(new_selection) {
    if (nav_select_button !== null) {
        nav_select_button.setAttribute('aria-expanded', false);
    };
    if (new_selection === null) {
        nav_select = nav_landing;
        nav_select_group = 'landing'
        nav_highlight_div = null;
        nav_highlight_name = null;
        nav_select_button = null;
    } else {
        console.log(nav_select_button);
        nav_select = new_selection;
        nav_select_group = new_selection.getAttribute('data-attribute');
        nav_highlight_div = getParentDiv(nav_select);
        nav_highlight_name = `button-${nav_select_group}-select`; 
        nav_select_button = document.getElementById(`${nav_select_group}Button`);
        nav_select_button.setAttribute('aria-expanded', true);
    };
};

function updateProjectSelect(new_selection) {
    console.log(`in updateProjectSelect with ${new_selection}`);
    if (new_selection === null) {
        nav_project_select = 'overview';
        nav_project_select_group = null;
    } else if (new_selection === nav_project_select) {
        nav_project_select = 'overview';
        nav_project_select_group = null;
    } else {
        nav_project_select = new_selection;
        nav_project_select_group = new_selection.slice(new_selection.indexOf('-') +1);
        console.log(`nav_project_select is ${nav_project_select} and nav_project_select_group is ${nav_project_select_group}`);
    };
}

/*
    ELEMENT GROUP FUNCTIONS
*/

function updateNavGroupDisplay() {
    // reset to landing if currently displayed selection is clicked
    if (nav_select_group === displaying) {
        updateNavSelect(null);
    };
    // console.log(`navigated to ${nav_select_group} from ${displaying}`);
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

function toggleHidden(elements, hidden_class_name) {
    if (hidden_class_name === undefined) {
        hidden_class_name = `${elements.group}-container--hidden`;
    };
    for (let element of Object.keys(elements)) {
        const div = elements[element];
        console.log(`"toggleHidden" with ${hidden_class_name}`);
        if (div.classList) {
            if (div.classList.contains(hidden_class_name) === true) {
                div.classList.remove(hidden_class_name);
            } else {
                div.classList.add(hidden_class_name);
            };
        };
    };
};

function toggleDisplayGroup() {
    id = nav_select_group;
    let displayed_group = getToggleClassElements();
    updateNavGroupDisplay();
};

// 

function toggleProjectVisibilty(e) {
    const title_div = e.target;
    const parent_div = e.target.parentElement.offsetParent;
    const project_button = parent_div.getElementsByClassName('project-detail')[0];
    console.log(title_div);
    console.log(project_button);
    console.log(parent_div);
    const project_title = parent_div.getAttribute('aria-controls');
    console.log(`project button is ${project_button} with ${project_title}`);
    updateProjectSelect(project_title);
}

/*
    GRADIENT FUNCTIONS
*/


const addRainbow = function(targetParent) {
    // console.log(`adding a rainbow to target using class ${nav_highlight_name}`);
    targetParent.classList.remove('no-gradient');
    targetParent.classList.add(nav_highlight_name);
    return targetParent;
};

const removeRainbow = function() {
    // console.log(`hit removeRainbow with target_parent`);
    if (nav_highlight_div && nav_highlight_div !== null) {
        // console.log("removing based on criteria ");
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
        // console.log(`didnt remove rainbow because nav_highlight_div was ${nav_highlight_div}`);
    };
    const new_nav_select = e.target.offsetParent;
    if (new_nav_select === nav_select) {
        // console.log("toggle off");
        updateNavSelect(null);
    } else {
        // console.log("new thing here");
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
    const projectButtons = document.getElementsByClassName("projects-button");
    for (let projectButton of projectButtons) {
        console.log(projectButton);
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
    addNavListeners();
    addProjectListeners();
};