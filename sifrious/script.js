

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

// STATE FUNCTIONS

function getParentDiv(nav_button) {
    const nav_button_id = nav_button.id;
    if (nav_button_id.indexOf('-') > 0) {
        return nav_landing;
    };
    let parent_div = document.getElementById(nav_button.getAttribute('parent-item-id'));
    if (parent_div) {
        return parent_div
    };
}

function updateNavSelect(new_selection) {
    if (new_selection === null) {
        nav_select = nav_landing;
        nav_select_group = 'landing'
        nav_highlight_div = null;
        nav_highlight_name = null;
        nav_select_button = null;
    } else {
        nav_select = new_selection;
        nav_select_group = new_selection.getAttribute('data-attribute');
        nav_highlight_div = getParentDiv(nav_select);
        nav_highlight_name = `button-${nav_select_group}-select`; 
        nav_select_button = document.getElementById(`${nav_select_group}Button`);
    };
};

function updateProjectSelect(new_selection, detail_div) {
    if (new_selection === null) {
        nav_project_select = 'overview';
        nav_project_select_group = null;
    } else if (nav_project_select === detail_div) {
        nav_project_select = 'overview';
        nav_project_select_group = null;
    } else {
        nav_project_select = detail_div;
        nav_project_select_group = new_selection.slice(new_selection.indexOf('-') +1);
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

function getToggleProjectClassElements(project_name, project_title){
    if (project_name === null) {
        return {"title": project_title}
    }
    var project_elements = getToggleClassElements(`${project_name}-project`);
    project_elements["mobile"] = document.getElementById(`${project_name}-mobile-title`);
    project_elements["preview"] = document.getElementById(`${project_name}-preview`);
    project_elements["title"] = project_title;
    project_elements["group"] = "project";
    return project_elements;
}

function toggleHidden(elements, hidden_class_name) {
    if (hidden_class_name === undefined) {
        hidden_class_name = `${elements.group}-container--hidden`;
    };
    for (let element of Object.keys(elements)) {
        const div = elements[element];
        if (div && div.classList) {
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
    updateNavGroupDisplay();
};

// 

function toggleProjectVisibilty(e) {
    const project_title = e.target.outerText.replace("\n", "").replace("Name.", "");
    const parent_div = e.target.parentElement.offsetParent;
    const project_button = parent_div.getElementsByClassName('project-detail')[0];
    const project_var_id = parent_div.getAttribute('aria-controls');
    toggleHidden(getToggleProjectClassElements(nav_project_select_group, project_title), 'project-detail--hidden');
    updateProjectSelect(project_var_id, project_button);
    toggleHidden(getToggleProjectClassElements(nav_project_select_group, project_title), 'project-detail--hidden');
}

/*
    GRADIENT FUNCTIONS
*/


const addRainbow = function(targetParent) {
    targetParent.classList.remove('no-gradient');
    targetParent.classList.add(nav_highlight_name);
    return targetParent;
};

const removeRainbow = function() {
    if (nav_highlight_div && nav_highlight_div !== null) {
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
    if (nav_highlight_div !== null) {
        nav_select.setAttribute('aria-expanded', 'false');
        toggleRainbows();
    };
    const new_nav_select = e.target.offsetParent;
    if (new_nav_select === nav_select) {
        updateNavSelect(null);
    } else {
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