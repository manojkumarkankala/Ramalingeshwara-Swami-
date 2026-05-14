// ==========================
// DOM ELEMENTS
// ==========================
const loader = document.querySelector(".loader");
const navbar = document.getElementById("navbar");
const navMenu = document.getElementById("nav-menu");
const mobileMenu = document.getElementById("mobile-menu");
const scrollTopBtn = document.getElementById("scrollTop");

const heroSlides = document.querySelectorAll(".slide");

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

const contactForm = document.getElementById("contactForm");

// ==========================
// PAGE LOAD
// ==========================
window.addEventListener("load", () => {
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = "0";

            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }
    }, 1200);
});

// ==========================
// MOBILE MENU
// ==========================
if (mobileMenu && navMenu) {
    mobileMenu.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("active");
        });
    });
}

// ==========================
// HERO SLIDESHOW
// ==========================
let currentSlide = 0;

function changeSlide() {

    if (heroSlides.length === 0) return;

    heroSlides.forEach(slide => {
        slide.classList.remove("active");
    });

    currentSlide++;

    if (currentSlide >= heroSlides.length) {
        currentSlide = 0;
    }

    heroSlides[currentSlide].classList.add("active");
}

setInterval(changeSlide, 5000);

// ==========================
// NAVBAR SCROLL EFFECT
// ==========================
window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0,0,0,0.95)";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.4)";
    } else {
        navbar.style.background = "rgba(17,17,17,0.9)";
        navbar.style.boxShadow = "none";
    }

    // Scroll Top Button
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }
});

// ==========================
// SCROLL TO TOP
// ==========================
if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// ==========================
// SMOOTH SCROLL
// ==========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// ==========================
// ACTIVE NAV LINK
// ==========================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight) {

            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ==========================
// GALLERY LIGHTBOX
// ==========================
galleryItems.forEach(item => {

    item.addEventListener("click", () => {

        const img = item.querySelector("img");

        if (img) {
            lightboxImg.src = img.src;
            lightbox.classList.add("active");

            document.body.style.overflow = "hidden";
        }
    });
});

// Close Lightbox
if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (lightbox) {
    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {

    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
}

// ==========================
// ESC KEY CLOSE
// ==========================
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        // Close Lightbox
        closeLightbox();

        // Close Mobile Menu
        navMenu.classList.remove("active");
    }
});

// ==========================
// CONTACT FORM
// ==========================
if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const submitBtn = contactForm.querySelector(".submit-btn");

        const name = document.getElementById("name").value;

        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        setTimeout(() => {

            alert(`Thank You ${name}! Your message was sent successfully.`);

            contactForm.reset();

            submitBtn.innerHTML = originalText;

            submitBtn.disabled = false;

        }, 2000);
    });
}

// ==========================
// SCROLL ANIMATION
// ==========================
const fadeElements = document.querySelectorAll(
    ".about-image, .about-text, .celebration-card, .gallery-item, .contact-box, .contact-form"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });

}, {
    threshold: 0.1
});

fadeElements.forEach(el => {

    el.classList.add("fade-in");

    observer.observe(el);
});

// ==========================
// TOUCH FIX FOR MOBILE
// ==========================
document.addEventListener("touchstart", () => {}, true);

// ==========================
// PREVENT IMAGE DRAG
// ==========================
document.querySelectorAll("img").forEach(img => {

    img.setAttribute("draggable", "false");
});

// ==========================
// AUTO CLOSE MENU OUTSIDE
// ==========================
document.addEventListener("click", (e) => {

    if (
        navMenu &&
        mobileMenu &&
        !navMenu.contains(e.target) &&
        !mobileMenu.contains(e.target)
    ) {
        navMenu.classList.remove("active");
    }
});

// ==========================
// VISITOR POPUP
// ==========================
setTimeout(() => {

    const popup = document.createElement("div");

    popup.innerHTML = `
        <i class="fas fa-users"></i>
        1,247 Devotees Visited Today
    `;

    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.left = "20px";
    popup.style.background = "linear-gradient(45deg,#ff9933,#ffd700)";
    popup.style.color = "white";
    popup.style.padding = "12px 18px";
    popup.style.borderRadius = "50px";
    popup.style.fontWeight = "600";
    popup.style.zIndex = "9999";
    popup.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
    popup.style.fontSize = "14px";

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 5000);

}, 4000);