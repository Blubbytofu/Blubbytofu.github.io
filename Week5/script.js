let isOpen = true;      // whether the nav bar is shown or not

function hideBar(id) {
    isOpen = !isOpen;
    id.style.display = (isOpen ? "block" : "none");     // set nav menu

    let main = document.getElementsByClassName("container-content")[0];
    if (screen.width < 600) {       // mobile
        // nvm do nothing
    }
    else {
        main.style.left = (isOpen ? "25vw" : "12vw");
        main.style.width = (isOpen ? "65vw" : "78vw");
    }
}
