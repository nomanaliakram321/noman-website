'use strict';
document.addEventListener("DOMContentLoaded", function () {
  AOS.init({
    once: true
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
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



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
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

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

select.addEventListener("click", function () { elementToggleFunc(this); });

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

}

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
        if (pages[j].dataset.page === 'about') {
          document.querySelectorAll('.navbar-item').forEach(item => item.style.display = '');
          document.getElementById('case-study-nav').style.display = 'none';
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
  document.querySelectorAll('article[data-page]').forEach(article => {
    if (article.getAttribute('data-page') === page) {
      article.classList.add('active');
    } else {
      article.classList.remove('active');
    }
  });
}

// Helper: Show only the given nav items (by display)
function showNavItems(visiblePages) {
  document.querySelectorAll('.navbar-item').forEach(item => {
    const btn = item.querySelector('.navbar-link');
    if (!btn) return;
    const text = btn.textContent.trim().toLowerCase();
    item.style.display = visiblePages.includes(text) ? '' : 'none';
  });
}

// Project click handler
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.project-item').forEach(item => {
    item.addEventListener('click', function(e) {
      // Get project details
      const title = this.getAttribute('data-title') || this.querySelector('.project-title').textContent;
      const description = this.getAttribute('data-description') || this.querySelector('.project-category').textContent;
      const image = this.getAttribute('data-image') || this.querySelector('img').src;

      // Populate case study
      document.getElementById('case-study-title').textContent = title;
      document.getElementById('case-study-content').innerHTML = `
        <img src="${image}" alt="${title}" style="max-width:100%;margin-bottom:1em;"/>
        <p>${description}</p>
      `;

      // Show only case study article and About/Case Study nav
      showArticle('case-study');
      showNavItems(['about', 'case study']);
      document.getElementById('case-study-nav').style.display = '';

      // Set .active class for nav and article
      document.querySelectorAll('.navbar-link.active').forEach(btn => btn.classList.remove('active'));
      document.querySelector('#case-study-nav .navbar-link').classList.add('active');
      document.querySelectorAll('article[data-page]').forEach(article => article.classList.remove('active'));
      document.querySelector('article[data-page="case-study"]').classList.add('active');
    });
  });

  // Back to Portfolio handler
  var backBtn = document.getElementById('back-to-portfolio');
  if (backBtn) {
    backBtn.onclick = function() {
      showArticle('portfolio');
      // Restore all nav items' display
      document.querySelectorAll('.navbar-item').forEach(item => item.style.display = '');
      document.getElementById('case-study-nav').style.display = 'none';
      // Set .active class for nav and article
      document.querySelectorAll('.navbar-link.active').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('article[data-page]').forEach(article => article.classList.remove('active'));
      document.querySelector('article[data-page="portfolio"]').classList.add('active');
      document.querySelectorAll('.navbar-link').forEach(btn => {
        if (btn.textContent.trim().toLowerCase() === 'portfolio') btn.classList.add('active');
      });
    };
  }

  // Prevent default nav click handler from interfering with Case Study nav
  var caseStudyNavBtn = document.querySelector('#case-study-nav .navbar-link');
  if (caseStudyNavBtn) {
    caseStudyNavBtn.addEventListener('click', function(e) {
      e.preventDefault();
      // Do nothing or optionally scroll to top
      window.scrollTo(0, 0);
    });
  }
});