// ============================================================
// script.js — Sudin Neupane Portfolio
// Works across: index.html, about.html, skills.html,
//               projects.html, contact.html
// Plain vanilla JS — beginner friendly, no frameworks
// ============================================================




// ============================================================
// SHARED — runs on every page
// ============================================================

// -- Active nav link highlight --
// Adds "active" style to whichever nav link matches current page

var currentPage = window.location.pathname.split("/").pop();

var navLinks = document.querySelectorAll(".nav-links a, .navbar ul li a");

for (var i = 0; i < navLinks.length; i++) {
    var linkHref = navLinks[i].getAttribute("href");
    if (linkHref === currentPage || (currentPage === "" && linkHref === "index.html")) {
        navLinks[i].style.color = "#ff6b6b";
        navLinks[i].style.backgroundColor = "#252525";
        navLinks[i].style.borderRadius = "5px";
    }
}


// -- Custom cursor effect (glowing dot that follows mouse) --
// Creates a small glowing circle that follows the cursor

var cursor = document.createElement("div");
cursor.id = "custom-cursor";
cursor.style.cssText = [
    "width: 14px",
    "height: 14px",
    "background: rgba(255, 107, 107, 0.75)",
    "border-radius: 50%",
    "position: fixed",
    "top: 0",
    "left: 0",
    "pointer-events: none",
    "z-index: 9999",
    "transform: translate(-50%, -50%)",
    "transition: transform 0.1s ease, background 0.3s ease",
    "box-shadow: 0 0 10px rgba(255, 107, 107, 0.6)"
].join(";");
document.body.appendChild(cursor);

document.addEventListener("mousemove", function(e) {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

// Make cursor bigger when hovering over links or buttons
var clickables = document.querySelectorAll("a, button, .card, .project-card, .project-box");

for (var j = 0; j < clickables.length; j++) {
    clickables[j].addEventListener("mouseenter", function() {
        cursor.style.transform = "translate(-50%, -50%) scale(2)";
        cursor.style.background = "rgba(255, 215, 0, 0.8)";
    });
    clickables[j].addEventListener("mouseleave", function() {
        cursor.style.transform = "translate(-50%, -50%) scale(1)";
        cursor.style.background = "rgba(255, 107, 107, 0.75)";
    });
}


// -- Scroll to top button (appears after scrolling down) --
// Works on any page that has the .button scroll-to-top element

var scrollBtn = document.querySelector(".button");

if (scrollBtn) {
    window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = "1";
            scrollBtn.style.visibility = "visible";
        } else {
            scrollBtn.style.opacity = "0";
            scrollBtn.style.visibility = "hidden";
        }
    });

    // initial state hidden
    scrollBtn.style.opacity = "0";
    scrollBtn.style.visibility = "hidden";
    scrollBtn.style.transition = "opacity 0.4s ease, visibility 0.4s ease";
}


// -- Fade in page on load --
// Gentle fade when switching between pages

document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";

window.addEventListener("load", function() {
    document.body.style.opacity = "1";
});


// -- Page exit fade --
// Fade out before navigating to another page

var allLinks = document.querySelectorAll("a");

for (var k = 0; k < allLinks.length; k++) {
    allLinks[k].addEventListener("click", function(e) {
        var href = this.getAttribute("href");

        // Only do this for same-site navigation (not external links, not #links)
        if (href && !href.startsWith("http") && !href.startsWith("#") && !href.startsWith("mailto")) {
            e.preventDefault();
            var destination = href;
            document.body.style.opacity = "0";
            setTimeout(function() {
                window.location.href = destination;
            }, 400);
        }
    });
}


// -- Typing effect helper function --
// Used on index.html hero title, defined here for reuse

function typeText(element, text, speed) {
    var index = 0;
    element.textContent = "";
    var timer = setInterval(function() {
        element.textContent += text[index];
        index++;
        if (index >= text.length) {
            clearInterval(timer);
        }
    }, speed);
}




// ============================================================
// INDEX.HTML — Home Page
// ============================================================

var heroTitle = document.querySelector(".hero-section h1");

if (heroTitle) {
    var originalText = heroTitle.textContent.trim();
    heroTitle.textContent = "";

    // Wait a tiny bit so fade-in starts first, then type
    setTimeout(function() {
        typeText(heroTitle, originalText, 90);
    }, 500);
}


// -- Animated skill bars on scroll --
// Skill bars animate when user scrolls into the skills section

var skillBars = document.querySelectorAll("#skills .skill-bar");

function animateSkillBars() {
    var skillsSection = document.getElementById("skills");
    if (!skillsSection) return;

    var sectionTop = skillsSection.offsetTop;
    var scrollBottom = window.scrollY + window.innerHeight;

    if (scrollBottom > sectionTop + 100) {
        for (var s = 0; s < skillBars.length; s++) {
            // Get target width from inline style set in HTML
            var targetWidth = skillBars[s].style.width;
            skillBars[s].style.width = "0%";
            skillBars[s].style.transition = "width 1.2s ease";

            // Use a closure to keep the right targetWidth for each bar
            (function(bar, target) {
                setTimeout(function() {
                    bar.style.width = target;
                }, 200 + s * 100);
            })(skillBars[s], targetWidth);
        }
        // Remove scroll listener after running once
        window.removeEventListener("scroll", animateSkillBars);
    }
}

if (skillBars.length > 0) {
    window.addEventListener("scroll", animateSkillBars);
    // Also check on page load in case user is already scrolled down
    animateSkillBars();
}


// -- Project boxes scroll reveal on index.html --
// Already handled inline in index.html with in-view class,
// but we add a slight delay stagger here for extra polish

var projectBoxes = document.querySelectorAll(".project-box");

function revealProjectBoxes() {
    for (var p = 0; p < projectBoxes.length; p++) {
        var boxTop = projectBoxes[p].offsetTop;
        var scrollBottom = window.scrollY + window.innerHeight;

        if (scrollBottom > boxTop + 60) {
            var box = projectBoxes[p];
            var delay = p * 150;
            (function(b, d) {
                setTimeout(function() {
                    b.classList.add("in-view");
                }, d);
            })(box, delay);
        }
    }
}

if (projectBoxes.length > 0) {
    window.addEventListener("scroll", revealProjectBoxes);
    revealProjectBoxes();
}


// -- CTA button hover ripple effect --
// Adds a quick ripple on click for .cta-button

var ctaButtons = document.querySelectorAll(".cta-button");

for (var c = 0; c < ctaButtons.length; c++) {
    ctaButtons[c].addEventListener("click", function(e) {
        var ripple = document.createElement("span");
        ripple.style.cssText = [
            "position: absolute",
            "border-radius: 50%",
            "width: 10px",
            "height: 10px",
            "background: rgba(255,255,255,0.5)",
            "transform: scale(0)",
            "animation: rippleAnim 0.5s ease-out",
            "pointer-events: none"
        ].join(";");

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        setTimeout(function() {
            ripple.remove();
        }, 500);
    });
}

// Ripple animation style injected once
var rippleStyle = document.createElement("style");
rippleStyle.textContent = "@keyframes rippleAnim { to { transform: scale(20); opacity: 0; } }";
document.head.appendChild(rippleStyle);


// -- "Let's team up" card and About Me card fade-in on scroll --

var indexCards = document.querySelectorAll("#card .card, #card2 .card2");

function revealIndexCards() {
    for (var ic = 0; ic < indexCards.length; ic++) {
        var cardTop = indexCards[ic].offsetTop;
        var scrollBottom = window.scrollY + window.innerHeight;
        if (scrollBottom > cardTop + 50) {
            indexCards[ic].style.opacity = "1";
            indexCards[ic].style.transform = "translateY(0)";
        }
    }
}

for (var ic2 = 0; ic2 < indexCards.length; ic2++) {
    indexCards[ic2].style.opacity = "0";
    indexCards[ic2].style.transform = "translateY(30px)";
    indexCards[ic2].style.transition = "opacity 0.7s ease, transform 0.7s ease";
}

if (indexCards.length > 0) {
    window.addEventListener("scroll", revealIndexCards);
    revealIndexCards();
}




// about Page 

// -- About page heading typewriter --
var aboutHeading = document.querySelector(".about-section h2");

if (aboutHeading) {
    var aboutTitle = aboutHeading.textContent.trim();
    setTimeout(function() {
        typeText(aboutHeading, aboutTitle, 100);
    }, 300);
}


// -- About cards: scroll reveal with stagger --
// Cards on about page slide up when they come into view

var aboutCards = document.querySelectorAll(".about-section .card");

function revealAboutCards() {
    for (var ac = 0; ac < aboutCards.length; ac++) {
        var cardTop = aboutCards[ac].offsetTop;
        var scrollBottom = window.scrollY + window.innerHeight;

        if (scrollBottom > cardTop + 40) {
            var card = aboutCards[ac];
            var delay = ac * 100;
            (function(c, d) {
                setTimeout(function() {
                    c.style.opacity = "1";
                    c.style.transform = "translateY(0) rotate(0deg)";
                }, d);
            })(card, delay);
        }
    }
}

// Set initial hidden state for about cards
for (var ac2 = 0; ac2 < aboutCards.length; ac2++) {
    aboutCards[ac2].style.opacity = "0";
    aboutCards[ac2].style.transform = "translateY(40px) rotate(-3deg)";
    aboutCards[ac2].style.transition = "opacity 0.6s ease, transform 0.6s ease";
}

if (aboutCards.length > 0) {
    window.addEventListener("scroll", revealAboutCards);
    // Run once immediately in case cards are already visible
    setTimeout(revealAboutCards, 100);
}




// skill page 

// -- Skills heading typewriter --
var skillsHeading = document.querySelector(".about-section h2");

// (Same selector as about.html — the heading is in .about-section on skills page too)
// The typeText call above already handles this since querySelector gets first match
// So nothing extra needed here — it just works.


// -- Skills cards: scroll reveal with stagger --

var skillCards = document.querySelectorAll(".about-section .card");

// This runs only if we're on skills page (cards exist)
// about.html also has these — the revealAboutCards handles both pages

// -- Tooltip on skill card hover --
// Show a small "Click to learn more" tooltip when hovering a skill card

var allSkillCards = document.querySelectorAll(".about-section .card");

for (var sc = 0; sc < allSkillCards.length; sc++) {
    allSkillCards[sc].addEventListener("mouseenter", function() {
        this.setAttribute("title", "Hover to see details");
    });
}


// -- Skills page: highlight active card with border glow --

for (var sg = 0; sg < allSkillCards.length; sg++) {
    allSkillCards[sg].addEventListener("mouseenter", function() {
        this.style.boxShadow = "0 0 20px rgba(255, 200, 50, 0.5)";
        this.style.transition = "box-shadow 0.3s ease";
    });
    allSkillCards[sg].addEventListener("mouseleave", function() {
        this.style.boxShadow = "none";
    });
}




// projects page

// -- Projects heading typewriter --
var projectsHeading = document.querySelector(".projects-section h2");

if (projectsHeading) {
    var projectsTitle = projectsHeading.textContent.trim();
    setTimeout(function() {
        typeText(projectsHeading, projectsTitle, 80);
    }, 300);
}


// -- Project cards: fade in on scroll --

var projectCards = document.querySelectorAll(".project-card");

function revealProjectCards() {
    for (var pc = 0; pc < projectCards.length; pc++) {
        var cardTop = projectCards[pc].offsetTop;
        var scrollBottom = window.scrollY + window.innerHeight;

        if (scrollBottom > cardTop + 30) {
            var card = projectCards[pc];
            var delay = pc * 80;
            (function(c, d) {
                setTimeout(function() {
                    c.style.opacity = "1";
                    c.style.transform = "translateY(0)";
                }, d);
            })(card, delay);
        }
    }
}

// Project cards start hidden (the HTML already has opacity:0 via CSS animation)
// We re-init here to control them via JS for scroll reveal

for (var pc2 = 0; pc2 < projectCards.length; pc2++) {
    projectCards[pc2].style.opacity = "0";
    projectCards[pc2].style.transform = "translateY(25px)";
    projectCards[pc2].style.transition = "opacity 0.6s ease, transform 0.6s ease";
}

if (projectCards.length > 0) {
    window.addEventListener("scroll", revealProjectCards);
    // Some cards might be visible on load
    setTimeout(revealProjectCards, 200);
}


// -- Projects page: video hover — pause when scrolled out of view --
// Stops videos from playing in background when user scrolls away

var projectVideos = document.querySelectorAll(".project-card video");

function checkVideosInView() {
    for (var v = 0; v < projectVideos.length; v++) {
        var videoTop = projectVideos[v].offsetTop;
        var videoBottom = videoTop + projectVideos[v].offsetHeight;
        var scrollTop = window.scrollY;
        var scrollBottom = scrollTop + window.innerHeight;

        var isInView = scrollBottom > videoTop && scrollTop < videoBottom;

        if (!isInView && !projectVideos[v].paused) {
            projectVideos[v].pause();
        }
    }
}

if (projectVideos.length > 0) {
    window.addEventListener("scroll", checkVideosInView);
}


// -- Project card: click to toggle mute (for mobile where hover doesn't work) --

for (var pv = 0; pv < projectCards.length; pv++) {
    projectCards[pv].addEventListener("click", function() {
        var vid = this.querySelector("video");
        if (vid) {
            vid.muted = !vid.muted;
        }
    });
}


// -- Show a small "note" badge on GitHub link in projects footer --

var githubNote = document.querySelector(".projects-section h6, .projects-section + h6");

if (githubNote) {
    githubNote.style.color = "rgba(255,255,255,0.7)";
    githubNote.style.padding = "10px";
    githubNote.style.background = "rgba(0,0,0,0.4)";
    githubNote.style.borderRadius = "6px";
    githubNote.style.maxWidth = "500px";
    githubNote.style.margin = "20px auto";
    githubNote.style.display = "block";
}




// contact page 

// -- Contact heading typewriter --
var contactHeading = document.querySelector(".contact-header h2");

if (contactHeading) {
    var contactTitle = contactHeading.textContent.trim();
    setTimeout(function() {
        typeText(contactHeading, contactTitle, 100);
    }, 300);
}


// -- Contact form: live input validation feedback --
// Shows green border when field is filled, red when empty and unfocused

var formInputs = document.querySelectorAll(".contact-form input, .contact-form textarea");

for (var fi = 0; fi < formInputs.length; fi++) {
    formInputs[fi].addEventListener("blur", function() {
        if (this.value.trim() === "") {
            this.style.border = "2px solid #ff6b6b";
            this.style.boxShadow = "0 0 8px rgba(255,107,107,0.5)";
        } else {
            this.style.border = "2px solid #4caf50";
            this.style.boxShadow = "0 0 8px rgba(76,175,80,0.4)";
        }
    });

    formInputs[fi].addEventListener("focus", function() {
        this.style.border = "";
        this.style.boxShadow = "";
    });
}


// -- Contact form: character counter for message textarea --

var messageBox = document.querySelector(".contact-form textarea");

if (messageBox) {
    var charCounter = document.createElement("p");
    charCounter.style.cssText = "font-size: 0.8rem; color: rgba(245,222,179,0.6); text-align: right; margin-top: -8px; margin-bottom: 8px;";
    charCounter.textContent = "0 characters";

    messageBox.insertAdjacentElement("afterend", charCounter);

    messageBox.addEventListener("input", function() {
        var count = this.value.length;
        charCounter.textContent = count + " character" + (count === 1 ? "" : "s");

        if (count > 500) {
            charCounter.style.color = "#ff6b6b";
        } else {
            charCounter.style.color = "rgba(245,222,179,0.6)";
        }
    });
}  


// if (messageBox) {
//     messageBox.addEventListener("blur", function() {
//         if (this.value.trim() === "") {
//             charCounter.style.color = "#ff6b6b";
//         }
//         });
//     }
//     else{ 
//         charCounter.style.color = "rgba(245,222,179,0.6)";
//         this.style.border = "black";
//         this.style.boxShadow = "0 0 8px rgba(105, 56, 18, 0.5)";

//     }


// -- Contact form: better submit experience --
// Shows a success message instead of the basic alert

var contactForm = document.querySelector(".contact-form form");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        var name = this.querySelector("input[name='name']");
        var email = this.querySelector("input[name='email']");
        var message = this.querySelector("textarea[name='message']");

        // Simple check that all fields have something
        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
            showFormMessage("Please fill in all fields before sending.", "error");
            return;
        }

        // Basic email format check
        if (!email.value.includes("@") || !email.value.includes(".")) {
            showFormMessage("Please enter a valid email address.", "error");
            return;
        }

        // Show success message
        showFormMessage("Message sent! Sudin will get back to you soon.", "success");

        // Clear form fields after short delay
        var formRef = this;
        setTimeout(function() {
            formRef.reset();
            // Reset borders too
            for (var rf = 0; rf < formInputs.length; rf++) {
                formInputs[rf].style.border = "";
                formInputs[rf].style.boxShadow = "";
            }
        }, 1500);
    });
}

// Helper function: show a styled message below the form submit button
function showFormMessage(text, type) {
    // Remove any existing message
    var existingMsg = document.getElementById("form-feedback");
    if (existingMsg) {
        existingMsg.remove();
    }

    var msg = document.createElement("p");
    msg.id = "form-feedback";
    msg.textContent = text;
    msg.style.cssText = [
        "margin-top: 12px",
        "padding: 10px 14px",
        "border-radius: 6px",
        "font-size: 0.95rem",
        "text-align: center",
        "transition: opacity 0.4s ease"
    ].join(";");

    if (type === "success") {
        msg.style.background = "rgba(76, 175, 80, 0.25)";
        msg.style.color = "#a5d6a7";
        msg.style.border = "1px solid rgba(76,175,80,0.5)";
    } else {
        msg.style.background = "rgba(255, 107, 107, 0.2)";
        msg.style.color = "#ff8a80";
        msg.style.border = "1px solid rgba(255,107,107,0.4)";
    }

    var submitBtn = document.querySelector(".contact-form button[type='submit']");
    if (submitBtn) {
        submitBtn.insertAdjacentElement("afterend", msg);
    }

    // Auto-remove after 4 seconds
    setTimeout(function() {
        if (msg) {
            msg.style.opacity = "0";
            setTimeout(function() {
                msg.remove();
            }, 400);
        }
    }, 4000);
}


// -- Social icons: bounce animation on hover --
// Adds a small bounce when mouse enters a social icon

var socialIcons = document.querySelectorAll(".social-icons a");

// Inject bounce keyframes once
var bounceStyle = document.createElement("style");
bounceStyle.textContent = [
    "@keyframes iconBounce {",
    "  0%   { transform: translateY(0); }",
    "  30%  { transform: translateY(-8px); }",
    "  60%  { transform: translateY(-3px); }",
    "  100% { transform: translateY(0); }",
    "}"
].join("\n");
document.head.appendChild(bounceStyle);

for (var si = 0; si < socialIcons.length; si++) {
    socialIcons[si].addEventListener("mouseenter", function() {
        this.style.animation = "none";
        // Small trick to restart animation
        var icon = this;
        setTimeout(function() {
            icon.style.animation = "iconBounce 0.4s ease";
        }, 10);
    });
    socialIcons[si].addEventListener("animationend", function() {
        this.style.animation = "none";
    });
}


// -- Map container: fade in on scroll --

var mapContainer = document.querySelector(".map-container");

if (mapContainer) {
    mapContainer.style.opacity = "0";
    mapContainer.style.transform = "translateX(-30px)";
    mapContainer.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    function revealMap() {
        var mapTop = mapContainer.offsetTop;
        var scrollBottom = window.scrollY + window.innerHeight;
        if (scrollBottom > mapTop + 60) {
            mapContainer.style.opacity = "1";
            mapContainer.style.transform = "translateX(0)";
            window.removeEventListener("scroll", revealMap);
        }
    }

    window.addEventListener("scroll", revealMap);
    revealMap();
}


// -- Contact info: slide in from right on scroll --

var contactInfo = document.querySelector(".contact-form");

if (contactInfo) {
    contactInfo.style.opacity = "0";
    contactInfo.style.transform = "translateX(30px)";
    contactInfo.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    function revealContactForm() {
        var formTop = contactInfo.offsetTop;
        var scrollBottom = window.scrollY + window.innerHeight;
        if (scrollBottom > formTop + 60) {
            contactInfo.style.opacity = "1";
            contactInfo.style.transform = "translateX(0)";
            window.removeEventListener("scroll", revealContactForm);
        }
    }

    window.addEventListener("scroll", revealContactForm);
    revealContactForm();
}