const header = document.querySelector('header.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        header.classList.add('faded', 'shrink');
    } else {
        header.classList.remove('faded', 'shrink');
    }
});
