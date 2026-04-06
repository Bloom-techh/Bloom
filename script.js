/* =============================================
   BLOOM 🌸 — Main JavaScript
   ============================================= */

// ── TESTIMONIAL DATA ──────────────────────────
const testimonials = [
  {
    name: "Arjun Mehta",
    role: "B.Tech CSE",
    color: "#3ecf6e",
    text: "I didn’t have a portfolio before. Bloom helped me set one up quickly and it looks clean and professional. It definitely made my profile stronger.",
    stars: 4,
  },
  {
    name: "Sneha Rao",
    role: "Design Student",
    color: "#6366f1",
    text: "The design is simple and elegant. I liked how everything was structured — projects, skills, and contact all in one place.",
    stars: 5,
  },
  {
    name: "Rahul Kumar",
    role: "B.Tech CSE",
    color: "#f59e0b",
    text: "I had no idea how to build a website before. The process was easy and I just shared my details. The final result came out really well.",
    stars: 4,
  },
  {
    name: "Aisha Patel",
    role: "MBA Student",
    color: "#ec4899",
    text: "I needed something simple to showcase my profile. Bloom delivered exactly that. It was quick and straightforward.",
    stars: 5,
  },
  {
    name: "Dev Joshi",
    role: "Computer Science Student",
    color: "#0ea5e9",
    text: "The portfolio looks modern and is easy to share with others. I’ve started adding it to my applications now.",
    stars: 4,
  }
];

// ── BUILD TESTIMONIAL CARDS ───────────────────
function buildTestiCards() {
  const track = document.getElementById("testiTrack");
  if (!track) return;

  // Duplicate cards for seamless infinite scroll
  const allCards = [...testimonials, ...testimonials];

  allCards.forEach((t) => {
    const initials = t.name
      .split(" ")
      .map((w) => w[0])
      .join("");
    const stars = "★".repeat(t.stars);

    const card = document.createElement("div");
    card.className = "testi-card";
    card.innerHTML = `
      <div class="testi-stars">${stars}</div>
      <div class="testi-text">"${t.text}"</div>
      <div class="testi-author">
        <div class="testi-avatar" style="background:${t.color}">${initials}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    `;
    track.appendChild(card);
  });
}

// ── ENHANCED NAVBAR & MOBILE MENU ─────────────
function initNavbar() {
  const navbar = document.getElementById("navbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuClose = document.querySelector(".menu-close");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  if (!navbar) return;

  // Sticky navbar scroll effect
  let ticking = false;
  function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
    ticking = false;
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });

  // Single toggle button for mobile menu
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active")
        ? "hidden"
        : "";
      menuToggle.textContent = mobileMenu.classList.contains("active")
        ? "✖"
        : "☰";
    });
  }

  // Close menu on overlay click
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
        menuToggle.textContent = "☰";
      }
    });
  }

  // Close menu & smooth scroll on nav link click
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      // Close mobile menu if open
      if (mobileMenu && mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      }

      // Smooth scroll to target
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Close mobile menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu?.classList.contains("active")) {
      mobileMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ── SCROLL REVEAL ─────────────────────────────
function initScrollReveal() {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));
}

// ── PARALLAX HERO BLOBS ───────────────────────
function initParallax() {
  const blob1 = document.querySelector(".blob-1");
  const blob2 = document.querySelector(".blob-2");
  if (!blob1 || !blob2) return;

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    blob1.style.transform = `translate(${y * 0.04}px, ${-y * 0.08}px)`;
    blob2.style.transform = `translate(${-y * 0.03}px, ${y * 0.05}px)`;
  });
}

// ── CONTACT FORM SUBMIT FEEDBACK ──────────────
function initContactForm() {
  const btn = document.querySelector(".form-submit");
  if (!btn) return;

  btn.addEventListener("click", () => {
    btn.textContent = "✅ Message sent!";
    btn.style.background = "#1fa84e";
  });
}

// ── PRICING BUTTON SCROLL ─────────────────────
function initPricingButtons() {
  document.querySelectorAll(".plan-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ── INIT ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  buildTestiCards();
  initNavbar();
  initScrollReveal();
  initParallax();
  initContactForm();
  initPricingButtons();
});


document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const templateCards = document.querySelectorAll('.template-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      templateCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});