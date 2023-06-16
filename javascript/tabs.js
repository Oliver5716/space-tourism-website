const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(event) {
    const keydownLeft = 37;
    const keydownRight = 39;

    //change the tabindex of the current tab to-1
    if (event.keyCode === keydownLeft || event.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        //if the right key is pushed, move to the next tab on the right
        if (event.keyCode === keydownRight) {
            tabFocus++;

            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (event.keyCode === keydownLeft) {
            tabFocus--;

            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    /* mainContainer
        .querySelectorAll("[role='tabpanel']")
        .forEach((panel) => panel.setAttribute("hidden", true)); */

    hideContent(mainContainer, "[role='tabpanel']");

    /* mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden"); */

    showContent(mainContainer, [`#${targetPanel}`]);

    /* mainContainer
        .querySelectorAll("picture")
        .forEach((pic) => pic.setAttribute("hidden", true)); */

    hideContent(mainContainer, "picture");

    /* mainContainer.querySelector([`#${targetImage}`]).removeAttribute("hidden"); */

    showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute("hidden");
}
