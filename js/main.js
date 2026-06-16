const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('header__nav');
const menuClose = document.getElementById('menu-close');

function toggleMenu() {
    navMenu.classList.toggle('header__nav-mobile');
    navMenu.classList.toggle('header__nav');
}

menuToggle.addEventListener('click', toggleMenu);
menuClose.addEventListener('click', toggleMenu);
