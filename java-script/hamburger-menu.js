// Hamburger menu – opravená verze
// Blokuje scroll pozadí při otevřeném menu, spravuje aria atributy

const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu  = document.getElementById('closeMenu');
const links      = mobileMenu.querySelectorAll('a');

function openMenu() {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // zabrání scrollování pod menu
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    closeMenu.focus(); // přesune focus do menu (accessibility)
}

function closeMenuFn() {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // obnoví scroll
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.focus();
}

hamburger.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFn);

// Zavření přes odkaz
links.forEach(link => {
    link.addEventListener('click', closeMenuFn);
});

// Zavření přes Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        closeMenuFn();
    }
});
