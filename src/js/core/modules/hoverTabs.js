function setHoverTabs(event) {
    const tabID = event.target.dataset.tabLink;
    let tabContents = document.querySelectorAll('[data-tab-content]');
    let tabLinks = document.querySelectorAll('[data-tab-link]');

    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.add("js-hide");
        setTimeout(() => {
            tabContents[i].style.display = 'none';
            tabLinks[i].classList.remove("js-active");
        }, 400)
        tabContents[i].classList.remove("js-show");
        tabLinks[i].classList.remove("js-active");
    }

    setTimeout(() => {
        document.querySelector(`[data-tab-link='${tabID}']`).classList.add("js-active");
        document.querySelector(`[data-tab-content='${tabID}']`).classList.add("js-show");
        document.querySelector(`[data-tab-content='${tabID}']`).style.display = 'block';
        document.querySelector(`[data-tab-content='${tabID}']`).classList.remove("js-hide");
    }, 400)

}

let tabLinks = document.querySelectorAll('[data-tab-link]');
tabLinks.forEach(link => link.addEventListener('mouseenter', setHoverTabs));