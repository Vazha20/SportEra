import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBDttBUMsMMkPXJrN9VW9ggeTpKZZKHqLo",
    authDomain: "sportera22.firebaseapp.com",
    projectId: "sportera22",
    databaseURL: "https://sportera22-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "sportera22.appspot.com",
    messagingSenderId: "396713612036",
    appId: "1:396713612036:web:03dbb958456b6d8906b651",
    measurementId: "G-TG83S43Z78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Event listener for form submission
document.getElementById('matchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    const title = document.getElementById('title').value;
    const text = document.getElementById('text').value;

    // Save match info to Firebase
    push(ref(database, 'matches'), {
        title: title,
        text: text
    }).then(() => {
        alert('Match info uploaded!');
    }).catch((error) => {
        alert('Error uploading match info: ' + error.message);
    });
});