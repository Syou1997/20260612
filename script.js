const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".site-nav");
const navigationLinks = document.querySelectorAll(".site-nav a");
const yearElement = document.querySelector("[data-year]");
const countdownElement = document.querySelector("[data-countdown]");
const scrollTopLinks = document.querySelectorAll("[data-scroll-top]");

const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 16);
};

const closeMenu = () => {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute("aria-expanded", "false");
  navigation.classList.remove("is-open");
  document.body.classList.remove("menu-open");
};

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  navigation?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

scrollTopLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 980) closeMenu();
});
updateHeader();

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const updateCountdown = () => {
  if (!countdownElement) return;

  const target = new Date(countdownElement.dataset.countdown).getTime();
  const difference = target - Date.now();
  const dayNode = countdownElement.querySelector("[data-days]");
  const hourNode = countdownElement.querySelector("[data-hours]");
  const minuteNode = countdownElement.querySelector("[data-minutes]");

  if (difference <= 0) {
    countdownElement.innerHTML = "<p class=\"course-time\">本次課程已開課</p>";
    return;
  }

  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);

  dayNode.textContent = String(days).padStart(2, "0");
  hourNode.textContent = String(hours).padStart(2, "0");
  minuteNode.textContent = String(minutes).padStart(2, "0");
};

updateCountdown();
window.setInterval(updateCountdown, 60000);

const revealElements = document.querySelectorAll(".reveal");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px" }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

document.querySelectorAll(".faq-list details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    if (!detail.open) return;
    document.querySelectorAll(".faq-list details").forEach((otherDetail) => {
      if (otherDetail !== detail) otherDetail.open = false;
    });
  });
});
