const openMenu = document.getElementByTagName("button");

function openBurger(burger) {
    burger.addEventListner("click", (e) => {
        const burger = burger.parentElement;
        burger.classList.toggle('open');
    })
}