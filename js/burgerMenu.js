document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector('.burger');
    const header = document.querySelector('.header');

    // Garante que o menu comece fechado
    if (header.classList.contains('active-menu')) {
        header.classList.remove('active-menu');
    }

    if (menuButton && header) {
        menuButton.addEventListener('click', () => {
            header.classList.toggle('active-menu');
        });
    } else {
        console.error('Elementos .burger ou .header não encontrados.');
    }
});