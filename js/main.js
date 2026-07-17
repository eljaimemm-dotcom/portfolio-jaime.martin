/* =========================================
Descripcion: Este archivo contiene el código JS principal de mi portfolio personal 
Estructura general:
- Constantes
- Variables
- Funciones
- Asignaciones
   ========================================= */

/* ---------- Constantes ---------- */
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuClose = document.getElementById('mobile-menu-close');
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');

const funFact = document.querySelector('.fun-fact');
const funFactBtn = document.querySelector('.fun-fact__btn');

const selectedFigures = document.querySelectorAll('.selected__figure');
const selectedTexts = document.querySelectorAll('.selected__text');
const selectedDots = document.querySelectorAll('.selected__dot');

const aboutTabs = document.querySelectorAll('.about__tab');
const aboutPanels = document.querySelectorAll('.about__panel');

const yearEl = document.getElementById('year');

const animateHiddenEls = document.querySelectorAll('.animate-hidden');
const animateHiddenUpEls = document.querySelectorAll('.animate-hidden-up');

const header = document.querySelector('.header');

/* ---------- Variables ---------- */
/* No hay variables */

/* ---------- Funciones ---------- */

/* Menú móvil */
function openMobileMenuHandler() {
    mobileMenu.classList.add('header__nav-mobile--open');
    document.body.style.overflow = 'hidden';
}

function closeMobileMenuHandler() {
    mobileMenu.classList.remove('header__nav-mobile--open');
    document.body.style.overflow = '';
}

/* Fun fact */
function toggleFunFactHandler(event) {
    event.stopPropagation();
    funFact.classList.toggle('fun-fact--open');
}

function closeFunFactOnOutsideClickHandler(event) {
    if (!funFact.contains(event.target)) {
        funFact.classList.remove('fun-fact--open');
    }
}

/* Selected projects: scroll-spy */
function activateProject(projectId) {
    selectedTexts.forEach((text) => {
        text.classList.toggle('selected__text--active', text.dataset.project === projectId);
    });
    selectedDots.forEach((dot) => {
        dot.classList.toggle('selected__dot--active', dot.dataset.dot === projectId);
    });
}

function intersectSelectedFigureHandler(entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            activateProject(entry.target.dataset.project);
        }
    });
}

/* About: tabs */
function selectTabHandler(event) {
    const clickedTab = event.currentTarget;
    const targetId = clickedTab.dataset.tab;

    aboutTabs.forEach((tab) => {
        const isActive = tab === clickedTab;
        tab.classList.toggle('about__tab--active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
    });

    aboutPanels.forEach((panel) => {
        const isActive = panel.dataset.panel === targetId;
        panel.classList.toggle('about__panel--active', isActive);
        panel.hidden = !isActive;
    });
}

/* Animaciones de entrada */
function revealAnimateHiddenHandler() {
    requestAnimationFrame(() => {
        animateHiddenEls.forEach((el) => el.classList.add('animate-visible'));
    });
}

function revealAnimateHiddenUpHandler() {
    requestAnimationFrame(() => {
        animateHiddenUpEls.forEach((el) => el.classList.add('animate-visible-up'));
    });
}

/* Header: fondo al hacer scroll */
function updateHeaderBackgroundHandler() {
    header.classList.toggle('header--scrolled', window.scrollY > 0);
}

/* ---------- Asignaciones ---------- */
menuToggle.addEventListener('click', openMobileMenuHandler);
menuClose.addEventListener('click', closeMobileMenuHandler);
mobileMenuLinks.forEach((link) => link.addEventListener('click', closeMobileMenuHandler));

if (funFact && funFactBtn) {
    funFactBtn.addEventListener('click', toggleFunFactHandler);
    document.addEventListener('click', closeFunFactOnOutsideClickHandler);
}

if (selectedFigures.length) {
    const selectedObserver = new IntersectionObserver(intersectSelectedFigureHandler, {
        root: null,
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
    });
    selectedFigures.forEach((figure) => selectedObserver.observe(figure));
}

if (aboutTabs.length) {
    aboutTabs.forEach((tab) => tab.addEventListener('click', selectTabHandler));
}

if (yearEl) yearEl.textContent = new Date().getFullYear();

if (animateHiddenEls.length) requestAnimationFrame(revealAnimateHiddenHandler);
if (animateHiddenUpEls.length) requestAnimationFrame(revealAnimateHiddenUpHandler);

if (header) {
    updateHeaderBackgroundHandler();
    window.addEventListener('scroll', updateHeaderBackgroundHandler, { passive: true });
}