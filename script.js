(function () {
    "use strict";

    var yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    var nav = document.querySelector(".navbar");
    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));

    if (navToggle) {
        navToggle.addEventListener("click", function () {
            var isOpen = nav.classList.toggle("nav-open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            nav.classList.remove("nav-open");
            if (navToggle) {
                navToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    var sections = Array.prototype.slice.call(document.querySelectorAll("header[id], section[id], footer[id]"));

    function setActiveLink() {
        var scrollPos = window.scrollY + 120;
        var current = sections[0];

        sections.forEach(function (section) {
            if (section.offsetTop <= scrollPos) {
                current = section;
            }
        });

        if (!current) {
            return;
        }

        navLinks.forEach(function (link) {
            link.classList.toggle("active", link.getAttribute("href") === "#" + current.id);
        });
    }

    var backToTop = document.querySelector(".back-to-top");

    function onScroll() {
        setActiveLink();
        if (backToTop) {
            backToTop.classList.toggle("show", window.scrollY > 400);
        }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    var revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add("visible");
        });
    }

    var typedEl = document.getElementById("typed");
    var phrases = [
        "Seorang pembelajar yang senang menjelajah cerita dan ide baru.",
        "Pecinta manga dan dunia imajinasi.",
        "Sedang belajar membuat website."
    ];

    if (typedEl) {
        var phraseIndex = 0;
        var charIndex = 0;
        var deleting = false;

        function type() {
            var phrase = phrases[phraseIndex];
            var text = phrase.slice(0, charIndex);
            typedEl.textContent = text;

            if (!deleting && charIndex < phrase.length) {
                charIndex++;
                setTimeout(type, 55);
            } else if (!deleting && charIndex === phrase.length) {
                deleting = true;
                setTimeout(type, 1800);
            } else if (deleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 30);
            } else {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 300);
            }
        }

        type();
    }

    var lightbox = document.getElementById("lightbox");
    var lightboxImg = lightbox ? lightbox.querySelector("img") : null;
    var lightboxClose = lightbox ? lightbox.querySelector(".lightbox-close") : null;

    function openLightbox(src, alt) {
        if (!lightbox || !lightboxImg) {
            return;
        }
        lightboxImg.src = src;
        lightboxImg.alt = alt || "Pratinjau gambar";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
    }

    function closeLightbox() {
        if (!lightbox) {
            return;
        }
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
    }

    document.querySelectorAll(".gallery-item").forEach(function (item) {
        item.addEventListener("click", function () {
            var img = item.querySelector("img");
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });

    var profilePhoto = document.querySelector(".main-photo");
    if (profilePhoto) {
        function openProfilePhoto() {
            var img = profilePhoto.querySelector("img");
            if (img) {
                openLightbox(img.src, img.alt);
            }
        }

        profilePhoto.addEventListener("click", openProfilePhoto);
        profilePhoto.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openProfilePhoto();
            }
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener("click", function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
            nav.classList.remove("nav-open");
        }
    });
})();
