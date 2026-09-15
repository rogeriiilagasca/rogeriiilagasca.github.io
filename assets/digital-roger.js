/* =========================================================
   DIGITAL ROGER — Interactive Portfolio Assistant
   ========================================================= */

(function () {

    "use strict";

    document.addEventListener("DOMContentLoaded", function () {

        if (sessionStorage.getItem("digitalRogerDismissed") === "true") {
            createLauncherOnly();
            return;
        }

        createAssistant();

    });

    const sections = {
        about: {
            target: "about",
            message:
                "Here's where you can learn about Roger's approach, experience, and how he supports businesses behind the scenes."
        },
        services: {
            target: "services",
            message:
                "Roger supports businesses with executive assistance, administrative operations, CRM management, workflow support, and more."
        },
        samples: {
            target: "work-samples",
            message:
                "Here you'll find examples of CRM workflows, reporting, QA, lead generation, and process documentation."
        },
        tools: {
            target: "tools",
            message:
                "Roger works comfortably with GoHighLevel, Zoho, Kartra, Salesforce, Google Workspace, Google Sheets, Microsoft Office, and Canva."
        },
        experience: {
            target: "experience",
            message:
                "Roger brings nearly a decade of experience across customer service, technical support, quality assurance, operations, and team leadership."
        },
        contact: {
            target: "contact",
            message:
                "Think Roger could be a good fit for your team? Let's connect."
        }
    };

    function createAssistant() {

        const container = document.createElement("div");

        container.id = "digital-roger-container";

        container.innerHTML = `
            <div class="dr-panel"
                 role="region"
                 aria-label="Digital Roger AI Guide">

                <div class="dr-panel-header">
                    <span class="dr-label">Digital Roger</span>

                    <div class="dr-controls">

                        <button
                            class="dr-control"
                            id="dr-minimize"
                            type="button"
                            aria-label="Minimize Digital Roger"
                            title="Minimize">
                            −
                        </button>

                        <button
                            class="dr-control"
                            id="dr-close"
                            type="button"
                            aria-label="Close Digital Roger"
                            title="Close">
                            ×
                        </button>

                    </div>
                </div>

                <p class="dr-message" id="dr-message" aria-live="polite">
                    Hi! I'm Digital Roger. Let me show you around Roger's portfolio.
                </p>

                <div class="dr-actions" id="dr-actions">

                    <button
                        class="dr-button"
                        id="dr-tour"
                        type="button">
                        Show Me Around
                    </button>

                    <button
                        class="dr-button secondary"
                        id="dr-explore"
                        type="button">
                        Explore Freely
                    </button>

                </div>

                <div class="dr-navigation" id="dr-navigation">

                    <div class="dr-navigation-label">
                        Explore the portfolio
                    </div>

                    <div class="dr-navigation-grid">

                        <button
                            class="dr-nav-button"
                            data-section="about"
                            type="button">
                            About
                        </button>

                        <button
                            class="dr-nav-button"
                            data-section="services"
                            type="button">
                            Services
                        </button>

                        <button
                            class="dr-nav-button"
                            data-section="samples"
                            type="button">
                            Work Samples
                        </button>

                        <button
                            class="dr-nav-button"
                            data-section="tools"
                            type="button">
                            Tools
                        </button>

                        <button
                            class="dr-nav-button"
                            data-section="experience"
                            type="button">
                            Experience
                        </button>

                        <button
                            class="dr-nav-button"
                            data-section="contact"
                            type="button">
                            Contact
                        </button>

                    </div>
                </div>

            </div>

            <div
                class="dr-avatar"
                id="dr-avatar"
                role="button"
                tabindex="0"
                aria-label="Digital Roger Assistant">

                <img
                    src="assets/digital-roger.png"
                    alt="Digital Roger AI Assistant">

            </div>
        `;

        document.body.appendChild(container);

        createLauncher();

        const message = document.getElementById("dr-message");
        const actions = document.getElementById("dr-actions");
        const navigation = document.getElementById("dr-navigation");

        const tourButton = document.getElementById("dr-tour");
        const exploreButton = document.getElementById("dr-explore");

        const minimizeButton = document.getElementById("dr-minimize");
        const closeButton = document.getElementById("dr-close");

        const avatar = document.getElementById("dr-avatar");

        const tour = [

            {
                message:
                    "Welcome! I'm Digital Roger. I'll give you a quick tour.",
                target: null
            },

            {
                message: sections.about.message,
                target: sections.about.target
            },

            {
                message: sections.services.message,
                target: sections.services.target
            },

            {
                message: sections.samples.message,
                target: sections.samples.target
            },

            {
                message: sections.tools.message,
                target: sections.tools.target
            },

            {
                message: sections.experience.message,
                target: sections.experience.target
            },

            {
                message: sections.contact.message,
                target: sections.contact.target
            }

        ];

        let tourIndex = 0;


        function startTour() {

            tourIndex = 0;

            navigation.classList.remove("active");

            showTourStep();

        }


        function showTourStep() {

            const step = tour[tourIndex];

            message.textContent = step.message;


            if (step.target) {

                scrollToSection(step.target);

            } else {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }


            const isLast =
                tourIndex === tour.length - 1;


            actions.innerHTML = `
                <button
                    class="dr-button"
                    id="dr-next"
                    type="button">

                    ${isLast ? "Finish Tour" : "Next →"}

                </button>

                <button
                    class="dr-button secondary"
                    id="dr-exit"
                    type="button">

                    Exit

                </button>
            `;


            document
                .getElementById("dr-next")
                .addEventListener("click", function () {

                    if (isLast) {

                        enableFreeExplore();

                        return;

                    }

                    tourIndex++;

                    showTourStep();

                });


            document
                .getElementById("dr-exit")
                .addEventListener("click", function () {

                    enableFreeExplore();

                });

        }


        function enableFreeExplore() {

            message.textContent =
                "Explore freely. Choose any section and I'll take you there.";


            actions.innerHTML = `
                <button
                    class="dr-button"
                    id="dr-tour-again"
                    type="button">

                    Take the Tour

                </button>
            `;


            navigation.classList.add("active");


            document
                .getElementById("dr-tour-again")
                .addEventListener("click", startTour);

        }


        document
            .querySelectorAll(".dr-nav-button")
            .forEach(function (button) {

                button.addEventListener("click", function () {

                    const section =
                        this.getAttribute("data-section");


                    if (!sections[section]) {
                        return;
                    }


                    message.textContent =
                        sections[section].message;


                    scrollToSection(
                        sections[section].target
                    );

                });

            });


        function scrollToSection(id) {

            let element =
                document.getElementById(id);


            if (!element) {

                element =
                    document.querySelector(
                        `[data-section="${id}"]`
                    );

            }


            if (!element) {

                const headings =
                    document.querySelectorAll(
                        "section, main > div"
                    );

                const search =
                    id.toLowerCase().replace("-", " ");


                headings.forEach(function (item) {

                    if (
                        item.id &&
                        item.id
                            .toLowerCase()
                            .includes(search)
                    ) {

                        element = item;

                    }

                });

            }


            if (!element) {

                console.warn(
                    "Digital Roger could not find section:",
                    id
                );

                return;

            }


            element.scrollIntoView({

                behavior: "smooth",

                block: "center"

            });


            element.classList.add(
                "dr-section-highlight"
            );


            setTimeout(function () {

                element.classList.remove(
                    "dr-section-highlight"
                );

            }, 1600);

        }


        tourButton.addEventListener(
            "click",
            startTour
        );


        exploreButton.addEventListener(
            "click",
            enableFreeExplore
        );


        minimizeButton.addEventListener(
            "click",
            function () {

                container.classList.add(
                    "dr-hidden"
                );

                document
                    .getElementById(
                        "digital-roger-launcher"
                    )
                    .classList.add("active");

            }
        );


        closeButton.addEventListener(
            "click",
            function () {

                sessionStorage.setItem(
                    "digitalRogerDismissed",
                    "true"
                );

                container.classList.add(
                    "dr-hidden"
                );

            }
        );


        avatar.addEventListener(
            "click",
            function () {

                enableFreeExplore();

            }
        );


        avatar.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    enableFreeExplore();

                }

            }
        );

    }


    function createLauncher() {

        const launcher =
            document.createElement("button");


        launcher.id =
            "digital-roger-launcher";


        launcher.type = "button";


        launcher.setAttribute(
            "aria-label",
            "Show Digital Roger"
        );


        launcher.title =
            "Show Digital Roger";


        launcher.innerHTML = `
            <img
                src="assets/digital-roger.png"
                alt="">
        `;


        document.body.appendChild(
            launcher
        );


        launcher.addEventListener(
            "click",
            function () {

                const assistant =
                    document.getElementById(
                        "digital-roger-container"
                    );


                if (!assistant) {

                    sessionStorage.removeItem(
                        "digitalRogerDismissed"
                    );

                    location.reload();

                    return;

                }


                assistant.classList.remove(
                    "dr-hidden"
                );


                launcher.classList.remove(
                    "active"
                );

            }
        );

    }


    function createLauncherOnly() {

        createLauncher();


        document
            .getElementById(
                "digital-roger-launcher"
            )
            .classList.add("active");

    }


})();
