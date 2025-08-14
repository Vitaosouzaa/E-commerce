const openMenu = document.querySelector(".main-menu");

function openBurger(menu) {
    menu.addEventListner("click", (e) => {
        const burger = menu.parentElement;
        burger.classList.toggle('open');
    })
}