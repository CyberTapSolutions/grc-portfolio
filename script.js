document.addEventListener("DOMContentLoaded", () => {

    /*
    =========================================================
    TERMINAL ANIMATION
    =========================================================
    */

    const terminalLines = [
        "> Initializing risk assessment...",
        "> Identifying assets and threats...",
        "> Evaluating existing security controls...",
        "> Calculating inherent and residual risk...",
        "> Mapping controls to NIST CSF...",
        "> Assessment complete. Risk treatment plan generated._"
    ];


    const terminalElements = [
        document.getElementById("terminal-line-1"),
        document.getElementById("terminal-line-2"),
        document.getElementById("terminal-line-3"),
        document.getElementById("terminal-line-4"),
        document.getElementById("terminal-line-5"),
        document.getElementById("terminal-line-6")
    ];


    function sleep(milliseconds) {

        return new Promise((resolve) => {

            setTimeout(resolve, milliseconds);

        });

    }


    function typeLine(element, text, speed = 28) {

        return new Promise((resolve) => {

            if (!element) {

                resolve();

                return;

            }


            let characterIndex = 0;


            function typeCharacter() {

                if (characterIndex < text.length) {

                    element.textContent += text.charAt(characterIndex);

                    characterIndex++;

                    setTimeout(typeCharacter, speed);

                } else {

                    resolve();

                }

            }


            typeCharacter();

        });

    }


    async function startTerminalAnimation() {

        const terminalExists =
            terminalElements.some((element) => element !== null);


        if (!terminalExists) {

            return;

        }


        for (
            let currentLine = 0;
            currentLine < terminalLines.length;
            currentLine++
        ) {

            const currentElement =
                terminalElements[currentLine];


            await typeLine(
                currentElement,
                terminalLines[currentLine],
                28
            );


            await sleep(250);

        }

    }


    startTerminalAnimation();



    /*
    =========================================================
    MOBILE NAVIGATION
    =========================================================
    */

    const menuToggle =
        document.querySelector(".menu-toggle");


    const mobileNav =
        document.querySelector(".mobile-nav");


    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen.toString()
            );

        });


        const mobileLinks =
            mobileNav.querySelectorAll("a");


        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileNav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /*
    =========================================================
    HEADER SCROLL EFFECT
    =========================================================
    */

    const header =
        document.querySelector(".site-header");


    function updateHeader() {

        if (!header) {

            return;

        }


        if (window.scrollY > 40) {

            header.classList.add("header-scrolled");

        } else {

            header.classList.remove("header-scrolled");

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );



    /*
    =========================================================
    SMOOTH SCROLLING FOR SAME-PAGE LINKS
    =========================================================
    */

    const anchorLinks =
        document.querySelectorAll('a[href^="#"]');


    anchorLinks.forEach((anchor) => {

        anchor.addEventListener("click", function(event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const targetElement =
                document.querySelector(targetId);


            if (!targetElement) {

                return;

            }


            event.preventDefault();


            const headerOffset = 72;


            const elementPosition =
                targetElement.getBoundingClientRect().top;


            const offsetPosition =
                elementPosition +
                window.pageYOffset -
                headerOffset;


            window.scrollTo({

                top: offsetPosition,

                behavior: "smooth"

            });

        });

    });



    /*
    =========================================================
    ACTIVE NAVIGATION LINK
    =========================================================
    */

    const pageSections =
        document.querySelectorAll(
            "main section[id]"
        );


    const desktopLinks =
        document.querySelectorAll(
            '.desktop-nav a[href^="#"]'
        );


    function updateActiveNavigation() {

        if (
            pageSections.length === 0 ||
            desktopLinks.length === 0
        ) {

            return;

        }


        let currentSection = "";


        pageSections.forEach((section) => {

            const sectionTop =
                section.offsetTop - 150;


            if (window.scrollY >= sectionTop) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        desktopLinks.forEach((link) => {

            link.classList.remove("active-link");


            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active-link");

            }

        });

    }


    updateActiveNavigation();


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );



    /*
    =========================================================
    PROJECT CARD KEYBOARD / HOVER SUPPORT
    =========================================================
    */

    const projectCards =
        document.querySelectorAll(".project-card");


    projectCards.forEach((card) => {

        const link =
            card.querySelector(".project-link");


        if (!link) {

            return;

        }


        card.classList.add("clickable-project");


        card.addEventListener("click", (event) => {

            if (
                event.target.closest("a") ||
                event.target.closest("button")
            ) {

                return;

            }


            window.location.href =
                link.getAttribute("href");

        });


        card.setAttribute("tabindex", "0");


        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    window.location.href =
                        link.getAttribute("href");

                }

            }
        );

    });

});