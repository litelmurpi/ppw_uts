// Smooth scroll for navigation
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Shrink navbar on scroll
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector("nav");

  if (prevScrollpos > currentScrollPos) {
    navbar.style.transform = "translateY(0)";
  } else {
    navbar.style.transform = "translateY(-100%)";
  }

  if (currentScrollPos > 100) {
    navbar.style.padding = "1rem";
  } else {
    navbar.style.padding = "1.5rem";
  }

  prevScrollpos = currentScrollPos;
};

// Add this to your existing JavaScript

function initializeProgressBars() {
  document.querySelectorAll(".progress").forEach((progress) => {
    const value = progress.getAttribute("data-progress");
    progress.style.setProperty("--progress", value + "%");
  });
}

// Call this function when the skills section becomes visible
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initializeProgressBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelector(".skills-section").forEach((section) => {
  skillsObserver.observe(section);
});
