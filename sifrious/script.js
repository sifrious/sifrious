

var nav_landing = document.getElementById('landing-button-container');
var nav_select = nav_landing;
var nav_select_group = "landing";
var nav_select_project = null;
var nav_highlight_div = null;
var nav_highlight_name = null;
var displaying = "default";
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
        nav_select.group = 'landing'
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
}

function updateProjectSelect(project) {
    console.log("--------------- updated nav_select_project ---------------");
}

/*
    ELEMENT GROUP FUNCTIONS
*/

function updateNavSelectGroup(group_name) {
    let global_group_name = `${group_name.charAt(0).toUpperCase()}${group_name.slice(1)}`;
    if (nav_select_group === global_group_name && nav_select_group != 'landing') {
        displayed_group = getToggleClassElements(group_name);
        nav_select = updateNavSelect(null);
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
    console.log(`adding a rainbow to target using class ${nav_highlight_name}`);
    targetParent.classList.remove('no-gradient');
    targetParent.classList.add(nav_highlight_name);
    // console.log(`target div id - ${targetParent.id}`);
    // console.log(targetParent);
    // console.log(targetClassName);
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
    console.log(`************************************** in selectNavGroup nav_select behavior is`)
    // remove gradient from previous selection, if it exists
    if (nav_highlight_div !== null) {
        nav_select.setAttribute('aria-expanded', 'false');
        toggleRainbows();
    } else {
        console.log(`didnt remove rainbow because nav_highlight_div was ${nav_highlight_div}`);
    };
    const new_nav_select = e.target.offsetParent;
    console.log(`'COMPARING new_nav_select ${new_nav_select.id}' with ${nav_select.id}: ${new_nav_select === nav_select}`); 
    console.log(new_nav_select);
    console.log(nav_select);
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
    // add gradient to new selection
    toggleRainbows(nav_select);
    // button.addEventListener("click", toggleRainbows);
}

// const toggleProjectVisibility = function (event) {
    
// }

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
    };

}

window.onload = function() {
    updateNavSelect(null);
    console.log("it fired");
    addNavListeners();
    addProjectListeners();
};