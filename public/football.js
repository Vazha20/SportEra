import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
        import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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

        // Fetch match data from Firebase
        onValue(ref(database, 'matches'), (snapshot) => {
            const matches = snapshot.val();
            const matchesContainer = document.getElementById('matches');
            matchesContainer.innerHTML = ''; // Clear previous matches

            // Display each match (only title and text)
            for (let matchId in matches) {
                const match = matches[matchId];
                const matchElement = document.createElement('div');
                matchElement.innerHTML = `
                    <h3>${match.title}</h3>
                    <p>${match.text}</p>
                    <hr>
                `;
                matchesContainer.appendChild(matchElement);
            }
        });