
const loginBtn = document.getElementById('loginBtn');
const authPopup = document.getElementById('authPopup');
const closeBtn = document.getElementById('closeBtn');

// Open the auth popup
loginBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent link action
    authPopup.style.display = 'block'; // Show the popup
});

// Close the auth popup
closeBtn.addEventListener('click', function() {
    authPopup.style.display = 'none'; // Hide the popup
});

// Close the auth popup if clicked outside
window.addEventListener('click', function(event) {
    if (event.target === authPopup) {
        authPopup.style.display = 'none'; // Hide the popup
    }
});

document.addEventListener("DOMContentLoaded", function() {
    let newsItems = document.querySelectorAll(".news-list .news-item");
    let mainNewsContainer = document.querySelector(".main-news-card");
    let currentIndex = 0;

    // Function to create Main News Card content
    function createMainNewsCard(imgSrc, categoryText, timeText, headlineText) {
        return `
            <img src="${imgSrc}" class="img-fluid" alt="news" style="opacity: 0;">
            <div class="overlay">
                <span class="category">${categoryText}</span>
                <span class="time">${timeText}</span>
                <h3>${headlineText}</h3>
            </div>
        `;
    }

    function updateMainNews() {
        if (newsItems.length === 0) return;

        // Remove active class from previous element
        newsItems.forEach(item => item.classList.remove("active"));
        mainNewsContainer.classList.remove("show");

        let currentNews = newsItems[currentIndex];

        // Add active class to new element
        currentNews.classList.add("active");

        // Get image and text content
        let imgSrc = currentNews.querySelector("img").src;
        let categoryText = currentNews.querySelector("small").textContent;
        let headlineText = currentNews.querySelector("p").textContent;

        // Update HTML
        let newMainNewsCard = createMainNewsCard(imgSrc, categoryText.split("•")[0].trim(), "• " + categoryText.split("•")[1].trim(), headlineText);

        // Fade-out effect
        mainNewsContainer.innerHTML = '';
        mainNewsContainer.innerHTML = newMainNewsCard;

        let mainImg = mainNewsContainer.querySelector("img");
        let category = mainNewsContainer.querySelector(".category");
        let time = mainNewsContainer.querySelector(".time");
        let headline = mainNewsContainer.querySelector("h3");

        // Fade-in effect
        setTimeout(() => {
            mainImg.style.opacity = "1";  // Fade-in for image
            mainNewsContainer.classList.add("show"); // Fade-in for text
        }, 500);

        // Increment index
        currentIndex = (currentIndex + 1) % newsItems.length;
    }

    // Call the function once
    updateMainNews();

    // Set interval to update every 10 seconds
    setInterval(updateMainNews, 10000);
});

document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = [
        { linkId: 'football-link', submenuId: 'football-submenu', arrowId: 'football-arrow' },
        { linkId: 'basketball-link', submenuId: 'basketball-submenu', arrowId: 'basketball-arrow' },
        { linkId: 'rugby-link', submenuId: 'rugby-submenu', arrowId: 'rugby-arrow' },
        { linkId: 'tennis-link', submenuId: 'tennis-submenu', arrowId: 'tennis-arrow' },
        { linkId: 'other-sport-link', submenuId: 'other-sport-submenu', arrowId: 'other-sport-arrow' }
    ];

    let openSubmenu = null; 

    menuLinks.forEach(function(menu) {
        const link = document.getElementById(menu.linkId);
        const submenu = document.getElementById(menu.submenuId);
        const arrow = document.getElementById(menu.arrowId);

        link.addEventListener('click', function(event) {
            event.preventDefault();

            // Close other open submenus
            if (openSubmenu && openSubmenu !== submenu) {
                openSubmenu.classList.remove('open');
                const openArrow = openSubmenu.previousElementSibling.querySelector('.arrow');
                openArrow.classList.remove('rotate');
                openSubmenu.previousElementSibling.classList.remove('open');
            }

            // Toggle clicked submenu
            submenu.classList.toggle('open'); 
            link.classList.toggle('open');
            arrow.classList.toggle('rotate');

            // Update open submenu
            if (submenu.classList.contains('open')) {
                openSubmenu = submenu;
            } else {
                openSubmenu = null;
            }

            event.stopPropagation();
        });
    });

    document.addEventListener('click', function(event) {
        menuLinks.forEach(function(menu) {
            const link = document.getElementById(menu.linkId);
            const submenu = document.getElementById(menu.submenuId);
            const arrow = document.getElementById(menu.arrowId);

            if (!link.contains(event.target) && !submenu.contains(event.target)) {
                submenu.classList.remove('open');
                arrow.classList.remove('rotate');
                link.classList.remove('open');
            }
        });
    });
});

// Modal functionality
var modal = document.getElementById("searchModal");
var btn = document.getElementById("openPopupBtn");
var span = document.getElementsByClassName("close-btnSearch")[0];

btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}






