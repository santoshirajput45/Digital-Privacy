/* =========================
   PRIVORA DIGITAL PRIVACY
   Dynamic JavaScript
========================= */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {

    nav.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (nav.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking link */

document.querySelectorAll(".navbar nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   PRIVACY SCORE
========================= */

let privacyScore = 82;

const scoreText = document.getElementById("privacyScore");
const heroScore = document.getElementById("heroScore");
const scoreCircle = document.getElementById("scoreCircle");

function updateScore(score) {

    privacyScore = score;

    scoreText.textContent = score;
    heroScore.textContent = score + "%";

    /*
        Circle circumference ≈ 314
    */

    const circumference = 314;

    const offset =
        circumference - (score / 100) * circumference;

    scoreCircle.style.strokeDashoffset = offset;

}

updateScore(82);


/* =========================
   IMPROVE PRIVACY SCORE
========================= */

const improveBtn = document.getElementById("improveBtn");

improveBtn.addEventListener("click", () => {

    if (privacyScore < 100) {

        updateScore(Math.min(privacyScore + 5, 100));

        showToast(
            "Privacy score improved by 5 points!"
        );

    } else {

        showToast(
            "Your privacy score is already 100!"
        );

    }

});


/* =========================
   PRIVACY SCANNER
========================= */

const scanBtn = document.getElementById("scanBtn");
const websiteInput = document.getElementById("websiteInput");
const scanResult = document.getElementById("scanResult");

scanBtn.addEventListener("click", scanWebsite);


/* Allow Enter key */

websiteInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        scanWebsite();
    }

});


function scanWebsite() {

    const website = websiteInput.value.trim();

    if (website === "") {

        showToast("Please enter a website first.");

        websiteInput.focus();

        return;
    }


    /* Loading state */

    scanResult.innerHTML = `

        <div class="scan-icon">

            <i class="fa-solid fa-spinner fa-spin"></i>

        </div>

        <h3>Scanning ${website}</h3>

        <p>
            Checking privacy indicators...
        </p>

    `;


    scanBtn.disabled = true;


    /* Simulated scan */

    setTimeout(() => {

        scanBtn.disabled = false;

        const randomScore =
            Math.floor(Math.random() * 31) + 65;

        let resultClass;
        let icon;
        let title;

        if (randomScore >= 85) {

            resultClass = "green";
            icon = "fa-circle-check";
            title = "Good Privacy Protection";

        } else if (randomScore >= 70) {

            resultClass = "orange";
            icon = "fa-triangle-exclamation";
            title = "Some Privacy Risks Found";

        } else {

            resultClass = "red";
            icon = "fa-circle-exclamation";
            title = "Privacy Risks Detected";

        }


        scanResult.innerHTML = `

            <div class="scan-icon ${resultClass}">

                <i class="fa-solid ${icon}"></i>

            </div>

            <h3>${title}</h3>

            <p>
                Privacy score:
                <strong>${randomScore}/100</strong>
            </p>

            <p>
                Possible trackers, cookies and data-sharing
                practices may affect your privacy.
            </p>

        `;

        showToast("Privacy scan completed!");

    }, 1800);

}


/* =========================
   SECURE PRIVACY BUTTON
========================= */

const secureBtn = document.getElementById("secureBtn");

secureBtn.addEventListener("click", () => {

    updateScore(Math.min(privacyScore + 3, 100));

    document
        .getElementById("privacy")
        .scrollIntoView({
            behavior: "smooth"
        });

    showToast(
        "Privacy protection improved!"
    );

});


/* =========================
   ANIMATED STATS
========================= */

function animateNumber(element, target) {

    let current = 0;

    const duration = 1200;

    const startTime = performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - startTime) / duration,
                1
            );

        current =
            Math.floor(progress * target);

        element.textContent =
            current.toLocaleString();

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}


const usersProtected =
    document.getElementById("usersProtected");

const threatsBlocked =
    document.getElementById("threatsBlocked");


animateNumber(usersProtected, 12840);
animateNumber(threatsBlocked, 48291);


/* =========================
   TOAST MESSAGE
========================= */

const toast =
    document.getElementById("toast");

let toastTimeout;


function showToast(message) {

    toast.querySelector("span").textContent =
        message;

    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(
        ".feature-card, .tip, .stat-card, .check-item"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";
                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(20px)";

    element.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navbar nav a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});