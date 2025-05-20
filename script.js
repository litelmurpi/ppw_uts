// Nama: Yudistira Azfa Dani Wibowo
// NIM: 24.12.3274
// Kelas: SI04
// Tanggal: 17 - 21 Mei 2025

// File: script.js - script ini berfungsi untuk mengatur interaksi pengguna pada halaman web 

/**
 * Smooth Scrolling
 * Mengatur scroll halus saat mengklik link navigasi
 * @param {NodeList} anchors - Semua link navigasi dengan href yang dimulai #
 */
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    // Skip jika bukan internal link
    if (!targetId.startsWith("#")) {
      return;
    }

    e.preventDefault();
    document.querySelector(targetId).scrollIntoView({
      behavior: "smooth",
    });
  });
});

/**
 * Intersection Observer Configuration
 * Mengatur animasi fade-in saat section muncul di viewport
 * @param {Object} observerOptions - Konfigurasi untuk Intersection Observer
 * @property {number} threshold - Ambang batas visibilitas elemen (0.1 = 10%)
 */
const observerOptions = {
  threshold: 0.1,
};

/**
 * Section Observer
 * Menambahkan class 'visible' ke section saat muncul di viewport
 * untuk memicu animasi fade-in
 */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Menerapkan observer ke semua section
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

/**
 * Navbar Scroll Behavior
 * Mengatur navbar saat scroll:
 * 1. Auto-hide saat scroll ke bawah
 * 2. Muncul kembali saat scroll ke atas
 * 3. Mengubah padding berdasarkan posisi scroll
 */
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector("nav");

  // Auto-hide navbar
  if (prevScrollpos > currentScrollPos) {
    navbar.style.transform = "translateY(0)"; // Tampilkan navbar
  } else {
    navbar.style.transform = "translateY(-100%)"; // Sembunyikan navbar
  }

  // Adjust navbar padding
  if (currentScrollPos > 100) {
    navbar.style.padding = "1rem"; // Padding lebih kecil saat scroll
  } else {
    navbar.style.padding = "1.5rem"; // Padding normal di atas
  }

  prevScrollpos = currentScrollPos;
};

/**
 * Skills Section Observer
 * Mengatur animasi khusus untuk section skills
 */
const skillsObserverOptions = {
  threshold: 0.3,
  rootMargin: "0px",
};

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Tambahkan class untuk animasi
      entry.target.classList.add("skills-visible");

      // Animasi untuk skill tags
      const skillTags = entry.target.querySelectorAll(".skill-tags span");
      skillTags.forEach((tag, index) => {
        tag.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
      });

      // Unobserve setelah animasi dijalankan
      skillsObserver.unobserve(entry.target);
    }
  });
}, skillsObserverOptions);

// Observe skills section (perbaikan dari error sebelumnya)
const skillsSection = document.querySelector(".skills-section");
if (skillsSection) {
  skillsObserver.observe(skillsSection);
}
