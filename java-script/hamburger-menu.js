const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");
    const links = mobileMenu.querySelectorAll("a");

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });

    links.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });