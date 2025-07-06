"use strict";
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        once: true,
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const text = "Noman Akram";
    let index = 0;
    const preloaderText = document.querySelector(".preloader-text");
    const preloader = document.getElementById("preloader");
    const mainContent = document.getElementById("main-content");

    function typeEffect() {
        if (index < text.length) {
            preloaderText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 200); // Adjust typing speed
        } else {
            setTimeout(() => {
                preloader.style.opacity = "0"; // Fade out
                setTimeout(() => {
                    preloader.style.display = "none"; // Hide preloader
                    mainContent.classList.remove("hidden"); // Show main content
                    mainContent.style.opacity = "1"; // Fade in
                }, 400); // Delay for smooth transition
            }, 700); // Wait after typing effect
        }
    }

    typeEffect(); // Start animation
});

// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
        modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
        modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
        modalTitle.innerHTML = this.querySelector(
            "[data-testimonials-title]"
        ).innerHTML;
        modalText.innerHTML = this.querySelector(
            "[data-testimonials-text]"
        ).innerHTML;

        testimonialsModalFunc();
    });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () {
    elementToggleFunc(this);
});

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
        let selectedValue = this.innerText;
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);
    });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
        if (selectedValue.toLowerCase() === "all") {
            filterItems[i].classList.add("active");
        } else if (selectedValue === filterItems[i].dataset.category) {
            filterItems[i].classList.add("active");
        } else {
            filterItems[i].classList.remove("active");
        }
    }
};

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText;
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
    });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        for (let j = 0; j < pages.length; j++) {
            if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
                pages[j].classList.add("active");
                navigationLinks[j].classList.add("active");
                window.scrollTo(0, 0);

                // Restore all nav items and hide case study nav when About is clicked
                if (pages[j].dataset.page === "about") {
                    document
                        .querySelectorAll(".navbar-item")
                        .forEach((item) => (item.style.display = ""));
                    document.getElementById("case-study-nav").style.display =
                        "none";
                }
            } else {
                pages[j].classList.remove("active");
                navigationLinks[j].classList.remove("active");
            }
        }
    });
}

// Helper: Show only the given article using .active class
function showArticle(page) {
    document.querySelectorAll("article[data-page]").forEach((article) => {
        if (article.getAttribute("data-page") === page) {
            article.classList.add("active");
            // Scroll to top of the article for better user experience
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        } else {
            article.classList.remove("active");
        }
    });
}

// Helper: Show only the given nav items (by display)
function showNavItems(visiblePages) {
    document.querySelectorAll(".navbar-item").forEach((item) => {
        const btn = item.querySelector(".navbar-link");
        if (!btn) return;
        const text = btn.textContent.trim().toLowerCase();
        item.style.display = visiblePages.includes(text) ? "" : "none";
    });
}

// Helper function to generate tech stack based on project category
function generateTechStack(category) {
    let techStack = [];

    // Define tech icons with SVG paths
    const techIcons = {
        Flutter: { path: "assets/images/flutter.svg", alt: "Flutter icon" },
        Dart: { path: "assets/images/dart.svg", alt: "Dart icon" },
        Provider: { path: "assets/images/provider.png", alt: "Provider icon" },
        Bloc: { path: "assets/images/Bloc.png", alt: "BLoC icon" },
        Firebase: { path: "assets/images/firebase.svg", alt: "Firebase icon" },
        "REST API": { path: "assets/images/api.svg", alt: "REST API icon" },
        "React Native": {
            path: "assets/images/React Native..png",
            alt: "React Native icon",
        },
        JavaScript: {
            path: "assets/images/javascript.svg",
            alt: "JavaScript icon",
        },
        TypeScript: {
            path: "assets/images/typeScript.svg",
            alt: "TypeScript icon",
        },
        Redux: { path: "assets/images/Redux.png", alt: "Redux icon" },
        "Context API": {
            path: "assets/images/context API.png",
            alt: "Context API icon",
        },
        HTML: { path: "assets/images/web.svg", alt: "HTML icon" },
        CSS: { path: "assets/images/web.svg", alt: "CSS icon" },
        "React.js": {
            path: "assets/images/React Native..png",
            alt: "React.js icon",
        },
        "Node.js": { path: "assets/images/web.svg", alt: "Node.js icon" },
        MongoDB: {
            path: "assets/images/local-database.png",
            alt: "MongoDB icon",
        },
        Git: { path: "assets/images/git.svg", alt: "Git icon" },
        GitHub: { path: "assets/images/github.svg", alt: "GitHub icon" },
        "VS Code": {
            path: "assets/images/visual-studio-code.svg",
            alt: "VS Code icon",
        },
        Figma: { path: "assets/images/figma.svg", alt: "Figma icon" },
        TensorFlow: {
            path: "assets/images/google-map.svg",
            alt: "TensorFlow icon",
        },
        "Google ML Kit": {
            path: "assets/images/google-map.svg",
            alt: "Google ML Kit icon",
        },
        Whimsical: {
            path: "assets/images/whimsical.png",
            alt: "Whimsical icon",
        },
        Swift: { path: "assets/images/ios native.svg", alt: "Swift icon" },
        Kotlin: { path: "assets/images/kotlin.svg", alt: "Kotlin icon" },
        FVM: { path: "assets/images/fvm.svg", alt: "FVM icon" },
        Expo: { path: "assets/images/expo.png", alt: "Expo icon" },
        GetX: { path: "assets/images/GetX.png", alt: "GetX icon" },
        Zustand: { path: "assets/images/zustand.svg", alt: "Zustand icon" },
        Hive: { path: "assets/images/HIVE..png", alt: "Hive icon" },
        Supabase: { path: "assets/images/supabase.svg", alt: "Supabase icon" },
        Stripe: { path: "assets/images/stripe.svg", alt: "Stripe icon" },
        OneSignal: {
            path: "assets/images/onesignal.svg",
            alt: "OneSignal icon",
        },
        GraphQL: { path: "assets/images/graphql.svg", alt: "GraphQL icon" },
        Sentry: { path: "assets/images/sentry.svg", alt: "Sentry icon" },
        Jest: { path: "assets/images/jest.svg", alt: "Jest icon" },
        SQLite: { path: "assets/images/sqlite.svg", alt: "SQLite icon" },
        Framer: { path: "assets/images/framer.svg", alt: "Framer icon" },
        Canva: { path: "assets/images/canva.svg", alt: "Canva icon" },
        Jira: { path: "assets/images/jira.svg", alt: "Jira icon" },
        Trello: { path: "assets/images/trello.svg", alt: "Trello icon" },
        Slack: { path: "assets/images/slack.svg", alt: "Slack icon" },
        Asana: { path: "assets/images/asana.svg", alt: "Asana icon" },
        ClickUp: { path: "assets/images/clickup.svg", alt: "ClickUp icon" },
        BitBucket: {
            path: "assets/images/bitbucket.svg",
            alt: "BitBucket icon",
        },
        XCode: { path: "assets/images/xcode.svg", alt: "XCode icon" },
        "Android Studio": {
            path: "assets/images/android-studio.svg",
            alt: "Android Studio icon",
        },
        Postman: {
            path: "assets/images/postman-icon.svg",
            alt: "Postman icon",
        },
        Cursor: { path: "assets/images/cursor-ai.svg", alt: "Cursor icon" },
    };

    // Common technologies
    const commonTech = ["GitHub", "VS Code", "Figma"];

    // Category-specific technologies
    if (category === "Flutter") {
        const flutterTech = [
            "Flutter",
            "Dart",
            "Provider",
            "Bloc",
            "Firebase",
            "REST API",
        ];
        techStack = [...flutterTech, ...commonTech];
    } else if (category === "React Native") {
        const reactNativeTech = [
            "React Native",
            "JavaScript",
            "TypeScript",
            "ContextApi",
            "Trae",
            "Sentry",
            "Push Notification",
            "In app update",
            "Firebase Analytics",
            "Context API",
            "Firebase",
        ];
        techStack = [...reactNativeTech, ...commonTech];
    } else if (category === "web development") {
        const webTech = [
            "HTML",
            "CSS",
            "JavaScript",
            "React.js",
            "Node.js",
            "MongoDB",
        ];
        techStack = [...webTech, ...commonTech];
    } else if (category === "mobile applications") {
        const mobileTech = [
            "Flutter",
            "React Native",
            "Firebase",
            "REST API",
            "Redux",
        ];
        techStack = [...mobileTech, ...commonTech];
    } else {
        techStack = ["Flutter", "React Native", "Firebase", ...commonTech];
    }

    // Generate HTML for tech stack with SVG icons using toolBtn class
    return techStack
        .map((tech) => {
            const iconInfo = techIcons[tech] || {
                path: "assets/images/web.svg",
                alt: `${tech} icon`,
            };
            return `<button class="toolBtn">${tech}<img class="icon" src="${iconInfo.path}" alt="${iconInfo.alt}"></button>`;
        })
        .join("");
}

// Helper function to extract features from description
function generateFeaturesList(description) {
    // Extract potential features from the description
    const sentences = description.split(". ");
    const features = [];

    // Look for sentences with keywords that suggest features
    const featureKeywords = [
        "features",
        "includes",
        "offers",
        "provides",
        "supports",
        "allows",
    ];

    sentences.forEach((sentence) => {
        const lowerSentence = sentence.toLowerCase();

        // Check if sentence contains feature keywords
        if (
            featureKeywords.some((keyword) => lowerSentence.includes(keyword))
        ) {
            // Try to extract features from this sentence
            const parts = sentence.split(" with ");
            if (parts.length > 1) {
                const featurePart = parts[1];
                // Split by commas and 'and' to get individual features
                const featureItems = featurePart.split(/,\s*|\s+and\s+/);
                features.push(
                    ...featureItems.filter(
                        (item) => item.length > 3 && !item.endsWith(".")
                    )
                );
            }
        }
    });

    // If we couldn't extract specific features, create some generic ones based on the description
    if (features.length < 3) {
        // Check if it's a fitness app based on the description
        if (
            description.toLowerCase().includes("fitness") ||
            description.toLowerCase().includes("exercise")
        ) {
            // Add fitness-specific features to match the screenshot
            features.push("Deadlift: Hip hinge detection & posture correction");
            features.push("Squat: Depth tracking & stability monitoring");
            features.push(
                "Bench Press: Bar path tracking & symmetry assessment"
            );
            features.push(
                "Instant Feedback: Real-time guidance during exercises"
            );
        } else {
            const keywords = [
                "user-friendly interface",
                "secure authentication",
                "real-time updates",
                "data analytics",
                "push notifications",
                "offline support",
                "multi-language support",
                "dark/light mode",
                "social sharing",
            ];

            // Add some generic features based on the description
            for (const keyword of keywords) {
                if (description.toLowerCase().includes(keyword.toLowerCase())) {
                    features.push(
                        keyword.charAt(0).toUpperCase() + keyword.slice(1)
                    );
                }
            }

            // Add some more generic features if we still don't have enough
            if (features.length < 3) {
                features.push("Intuitive User Interface");
                features.push("Secure Data Storage");
                features.push("Cross-platform Compatibility");
            }
        }
    }

    // Format features with styled list items and checkmarks
    return features
        .slice(0, 4)
        .map((feature) => {
            // Check if feature has a title and description format (Title: Description)
            if (feature.includes(":")) {
                const [title, description] = feature
                    .split(":")
                    .map((part) => part.trim());
                return `<li style="position: relative; color: #cccccc; padding-left: 25px; margin-bottom: 10px;">
          <span style="position: absolute; left: 0; color: #8caeec;">✓</span>
          <strong style="color: #ffffff;">${title}:</strong> ${description.replace(
                    /[,.;]$/,
                    ""
                )}
        </li>`;
            } else {
                return `<li style="position: relative; color: #cccccc; padding-left: 25px; margin-bottom: 10px;">
          <span style="position: absolute; left: 0; color: #8caeec;">✓</span>
          ${feature.trim().replace(/[,.;]$/, "")}
        </li>`;
            }
        })
        .join("");
}

// Project click handler
window.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".project-item").forEach((item) => {
        item.addEventListener("click", function (e) {
            // Prevent default link behavior if the click is on an anchor or its children
            if (e.target.closest("a")) {
                e.preventDefault();
            }

            // Get project details
            const title =
                this.getAttribute("data-title") ||
                this.querySelector(".project-title").textContent;
            const description =
                this.getAttribute("data-description") ||
                this.querySelector(".project-category").textContent;
            const image =
                this.getAttribute("data-image") ||
                this.querySelector("img").src;

            // Populate case study
            document.getElementById("case-study-title").textContent = title;

            // Get the project category
            const category = this.getAttribute("data-category");

            // Create a more visually appealing layout similar to the screenshot
            document.getElementById("case-study-content").innerHTML = `
        <div class="case-study-container" style="padding: 20px 20px;">
          <!-- Project Header Section -->
          <div class="case-study-header">
            <div class="case-study-image-container" style="width: 100%; height: 250px; overflow: hidden; border-radius: 12px; margin-bottom: 25px;">
              <img src="${image}" alt="${title}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <p class="about-text">${description}</p>
          </div>
          
          <!-- Tech Stack Section -->
          <div style="margin: 40px 0;">
            <h2 class="section-title">
              <span style="margin-right: 10px;">🛠️</span> Tech Stack & Tools
            </h2>
              <div class="framework-pills">
              ${generateTechStack(category)}
            </div>
          </div>
          
          <div style="margin: 40px 0;">
            <h2 class="section-title">
              <span style="margin-right: 10px;">🏆</span> Project Highlights
            </h2>
            <div class="project-highlights" style="display: grid; grid-template-columns: 1fr; gap: 15px;">
                    <!-- Performance Tracking Highlight -->
              <div class="highlight-item" style="background: rgba(30, 30, 30, 0.5); border-radius: 10px; padding: 15px; display: flex; align-items: flex-start; gap: 15px;">
                <div class="highlight-content">
                
                  <p style="color: #cccccc; font-size: 0.9rem; margin: 0;">
                    Coming Soon...
                  </p>
                </div>
              </div>
            </div>
          </div>
        
            <h2 class="h3 testimonials-title delivery">🔥 Key Features</h2>
            <ul class="testimonials-list has-scrollbar">
              <li class="service-item">
                <div class="service-content-header">
                  <div class="pathway-icon" aria-hidden="true">⏱️</div>
                  <h3 class="h4 key-features-item-title">
                    Real-time Form Analysis
                  </h3>
                </div>
                <div class="service-content-box">
                  <ul class="deliverables-points">
                    <li>
                      <b>Deadlift:</b> Hip hinge detection &amp; posture correction
                    </li>
                    <li><b>Squat:</b> Depth tracking &amp; stability monitoring</li>
                    <li>
                      <b>Bench Press:</b> Bar path tracking &amp; symmetry
                      assessment
                    </li>
                    <li>
                      <b>Instant Feedback:</b> Real-time guidance during
                      exercises
                    </li>
                    <li>
                      <b>Rep Counting:</b> Precision-based repetition tracking
                    </li>
                  </ul>
                </div>
              </li>
              <li class="service-item">
                <div class="service-content-header">
                  <div class="pathway-icon" aria-hidden="true">📊</div>
                  <h3 class="h4 key-features-item-title">
                    Performance Tracking
                  </h3>
                </div>
                <div class="service-content-box">
                  <ul class="deliverables-points">
                    <li>
                      <strong>Exercise Metrics:</strong> Lockout angles, depth,
                      and execution timing
                    </li>
                    <li>
                      <b>Session Statistics:</b> Historical workout data &amp;
                      trends
                    </li>
                    <li>
                      <b>Progress Visualization:</b> Bar path tracking &amp;
                      symmetry assessment
                    </li>
                    <li>
                      <b>Instant Feedback:</b> Graphical insights into
                      performance improvements
                    </li>
                    <li>
                      <b>Data Privacy:</b> Local storage to ensure user security
                    </li>
                  </ul>
                </div>
              </li>
              
            </ul>
          </section>
          
    
          
          
          <h2 class="h3 testimonials-title delivery">📦 Deliverables</h2>
          <ul class="testimonials-list has-scrollbar">
              <li class="testimonials-item">
                <div class="content-card" data-testimonials-item="">
                  <figure class="testimonials-avatar-box">
                    <img src="./assets/images/android.svg" alt="Android logo" width="50" data-testimonials-avatar="" loading="lazy">
                  </figure>
                  <div class="delivery-header">
                    <h3 class="h4 testimonials-item-title" data-testimonials-title="">
                      Android Application
                    </h3>
                    <a href="https://play.google.com/store" target="_blank" rel="noopener" aria-label="View on Google Play Store">
                      <img src="./assets/images/icon quote.svg" alt="Download link">
                    </a>
                  </div>
                  <ul class="deliverables-points">
                    <li>Native performance on Android devices</li>
                    <li>Optimized for Android 8.0 and above</li>
                    <li>Smooth real-time analysis</li>
                    <li>Local storage integration</li>
                  </ul>
                </div>
              </li>
              <li class="testimonials-item">
                <div class="content-card" data-testimonials-item="">
                  <figure class="testimonials-avatar-box">
                    <img src="./assets/images/iOS.png" alt="iOS logo" width="50" data-testimonials-avatar="" loading="lazy">
                  </figure>
                  <div class="delivery-header">
                    <h3 class="h4 testimonials-item-title" data-testimonials-title="">
                      iOS Application
                    </h3>
                    <a href="https://apps.apple.com" target="_blank" rel="noopener" aria-label="View on App Store">
                      <img src="./assets/images/icon quote.svg" alt="Download link">
                    </a>
                  </div>
                  <ul class="deliverables-points">
                    <li>Native performance on iOS devices</li>
                    <li>Support for iOS 13 and above</li>
                    <li>Camera permission handling</li>
                    <li>Background processing optimization</li>
                  </ul>
                </div>
              </li>
            </ul>
      
  
         
          
    
              
       
      `;

            // Show only case study article and About/Case Study nav
            showArticle("case-study");
            showNavItems(["about", "case study"]);
            document.getElementById("case-study-nav").style.display = "";

            // Set .active class for nav and article
            document
                .querySelectorAll(".navbar-link.active")
                .forEach((btn) => btn.classList.remove("active"));
            document
                .querySelector("#case-study-nav .navbar-link")
                .classList.add("active");
            document
                .querySelectorAll("article[data-page]")
                .forEach((article) => article.classList.remove("active"));
            document
                .querySelector('article[data-page="case-study"]')
                .classList.add("active");

            // Prevent the browser from navigating away
            return false;
        });
    });

    // Back to Portfolio handler
    var backBtn = document.getElementById("back-to-portfolio");
    if (backBtn) {
        // Ensure the back button is properly initialized
        backBtn.onclick = function (e) {
            // Prevent default behavior
            e.preventDefault();

            showArticle("portfolio");
            // Restore all nav items' display
            document
                .querySelectorAll(".navbar-item")
                .forEach((item) => (item.style.display = ""));
            document.getElementById("case-study-nav").style.display = "none";
            // Set .active class for nav and article
            document
                .querySelectorAll(".navbar-link.active")
                .forEach((btn) => btn.classList.remove("active"));
            document
                .querySelectorAll("article[data-page]")
                .forEach((article) => article.classList.remove("active"));
            document
                .querySelector('article[data-page="portfolio"]')
                .classList.add("active");
            document.querySelectorAll(".navbar-link").forEach((btn) => {
                if (btn.textContent.trim().toLowerCase() === "portfolio")
                    btn.classList.add("active");
            });

            // Prevent the browser from navigating away
            return false;
        };
    }

    // Prevent default nav click handler from interfering with Case Study nav
    var caseStudyNavBtn = document.querySelector(
        "#case-study-nav .navbar-link"
    );
    if (caseStudyNavBtn) {
        caseStudyNavBtn.addEventListener("click", function (e) {
            e.preventDefault();
            // Do nothing or optionally scroll to top
            window.scrollTo(0, 0);
        });
    }
});
