// Import the functions you need from the SDKs you want to use
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDttBUMsMMkPXJrN9VW9ggeTpKZZKHqLo",
    authDomain: "sportera22.firebaseapp.com",
    projectId: "sportera22",
    storageBucket: "sportera22.appspot.com",
    messagingSenderId: "396713612036",
    appId: "1:396713612036:web:03dbb958456b6d8906b651",
    measurementId: "G-TG83S43Z78"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics if needed
const analytics = getAnalytics(app);



// მოძებნეთ ელემენტები
const loginBtn = document.getElementById('loginBtn');
const authPopup = document.getElementById('authPopup');
const closeBtn = document.getElementById('closeBtn');

// დააჭირეთ შესვლის ღილაკს და დააჩვენეთ ფანჯარა
loginBtn.addEventListener('click', function(event) {
    event.preventDefault(); // თავიდან აიცილეთ ლინკის მოქმედება
    authPopup.style.display = 'block'; // ფანჯარას ხსნის
});

// დახურეთ ფანჯარა, როდესაც დააჭირეთ '×'
closeBtn.addEventListener('click', function() {
    authPopup.style.display = 'none'; // ფანჯარას დახურავს
});

// დახურეთ ფანჯარა, თუ დააჭირეთ გარეთ
window.addEventListener('click', function(event) {
    if (event.target === authPopup) {
        authPopup.style.display = 'none'; // ფანჯარას დახურავს
    }
});





document.addEventListener("DOMContentLoaded", function() {
    let newsItems = document.querySelectorAll(".news-list .news-item");
    let mainNewsContainer = document.querySelector(".main-news-card");
    let currentIndex = 0;

    // ფუნქცია, რომელიც შექმნის Main News Card-ის შინაარსს
    function createMainNewsCard(imgSrc, categoryText, timeText, headlineText) {
        // Main News Card-ის HTML შიგთავსი
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

        // წინა ელემენტიდან ვშლით აქტიურ კლასს
        newsItems.forEach(item => item.classList.remove("active"));
        mainNewsContainer.classList.remove("show");

        let currentNews = newsItems[currentIndex];

        // ახალ ელემენტს ვამატებთ აქტიურ კლასს
        currentNews.classList.add("active");

        // ამოღება სურათის და ტექსტის
        let imgSrc = currentNews.querySelector("img").src;
        let categoryText = currentNews.querySelector("small").textContent;
        let headlineText = currentNews.querySelector("p").textContent;

        // HTML-ის განახლება
        let newMainNewsCard = createMainNewsCard(imgSrc, categoryText.split("•")[0].trim(), "• " + categoryText.split("•")[1].trim(), headlineText);

        // Fade-out ეფექტი
        mainNewsContainer.innerHTML = '';  // ვხსნით ძველ კონტენტს
        mainNewsContainer.innerHTML = newMainNewsCard;  // ვამატებთ ახალ კონტენტს

        let mainImg = mainNewsContainer.querySelector("img");
        let category = mainNewsContainer.querySelector(".category");
        let time = mainNewsContainer.querySelector(".time");
        let headline = mainNewsContainer.querySelector("h3");

        // Fade-in ეფექტი
        setTimeout(() => {
            mainImg.style.opacity = "1";  // Fade-in სურათისთვის
            mainNewsContainer.classList.add("show"); // Fade-in ტექსტისთვის
        }, 500);

        // ინკრემენტი ინდექსის
        currentIndex = (currentIndex + 1) % newsItems.length;
    }

    // ახლავე ვიძახებთ ერთხელ
    updateMainNews();

    // ვამატებთ ინტერვალს, რომ ყოველ 10 წამში შეიცვალოს
    setInterval(updateMainNews, 10000);
});

