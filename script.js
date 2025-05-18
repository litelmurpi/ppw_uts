document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (!targetId.startsWith("#")) {
      return;
    }

    e.preventDefault();
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
    });
  });
});

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

document.querySelector(".skills-section").forEach((section) => {
  skillsObserver.observe(section);
});
