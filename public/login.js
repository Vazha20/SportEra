import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";



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
const auth = getAuth(app);
const db = getFirestore(app);

// Validate email function
function validate_email(email) {
    return email && email.includes('@'); 
}

// Validate password function
function validate_password(password) {
    return password && password.length >= 6; 
}

// Event listener for the login form
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', signIn);
});

async function signIn(event) {
    event.preventDefault(); // Prevent form submission

    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    const password = document.getElementById('password').value;

    // Check if loading element exists before modifying its style
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
        loadingElement.style.display = 'block'; // Show loading indicator
    }

    let email = usernameOrEmail; 

    // თუ მომხმარებელმა `username` შეიყვანა, მოვიძიოთ შესაბამისი ელფოსტა Firestore-ში
    if (!validate_email(usernameOrEmail)) {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", usernameOrEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("Username not found.");
            }

            querySnapshot.forEach((doc) => {
                email = doc.data().email; // მოვძებნეთ შესაბამისი ელფოსტა
            });
        } catch (error) {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            alert(`Error: ${error.message}`);
            return;
        }
    }

    // ელფოსტით ავტორიზაცია
    signInWithEmailAndPassword(auth, email, password)
        .then(function (userCredential) {
            const user = userCredential.user;

            if (loadingElement) {
                loadingElement.style.display = 'none';
            }

            alert('User signed in successfully.');
            window.location.reload(); 
        })
        .catch(function (error) {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }

            alert(`Error: ${error.code} - ${error.message}`);
        });
}


