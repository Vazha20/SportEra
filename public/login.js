import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
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

// მოძებნეთ ელემენტები
const loginBtn = document.getElementById('loginBtn');
const authPopup = document.getElementById('authPopup');
const closeBtn = document.getElementById('closeBtn');
const logoutBtn = document.getElementById('logoutBtn');

// შესვლის ფანჯრის ჩვენება
loginBtn.addEventListener('click', function(event) {
    event.preventDefault();
    authPopup.style.display = 'block';
});

// შესვლის ფანჯრის დახურვა
closeBtn.addEventListener('click', function() {
    authPopup.style.display = 'none';
});

// ფანჯრის დახურვა, თუ მომხმარებელი გარეთ დააწერს
window.addEventListener('click', function(event) {
    if (event.target === authPopup) {
        authPopup.style.display = 'none';
    }
});

// Email ვალიდაცია
function validate_email(email) {
    return email && email.includes('@');
}

// Password ვალიდაცია
function validate_password(password) {
    return password && password.length >= 6;
}

// Login ფორმის Event Listener
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', signInWithUsernameOrEmail);
});

// შესვლა username-ით ან email-ით
async function signInWithUsernameOrEmail(event) {
    event.preventDefault();

    const usernameOrEmail = document.getElementById('usernameOrEmail').value;
    const password = document.getElementById('password').value;
    const loadingElement = document.getElementById('loading');

    if (loadingElement) {
        loadingElement.style.display = 'block';
    }

    let email = usernameOrEmail;

    // თუ მომხმარებელი ცდილობს შესვლას username-ით, ვეძებთ email-ს Firestore-ში
    if (!validate_email(usernameOrEmail)) {
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", usernameOrEmail));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error("Username not found.");
            }

            querySnapshot.forEach((doc) => {
                email = doc.data().email;
            });
        } catch (error) {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            alert(`Error: ${error.message}`);
            return;
        }
    }

    // Email-ით შესვლა
    signInWithEmailAndPassword(auth, email, password)
        .then(function (userCredential) {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            
            alert('User signed in successfully.');
            authPopup.style.display = 'none'; // ფანჯრის დახურვა
            updateUI(true); // UI განახლება (Login ღილაკის დამალვა, Logout-ის გამოჩენა)
        })
        .catch(function (error) {
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            alert(`Error: ${error.code} - ${error.message}`);
        });
}

// Logout ფუნქცია
function logOut() {
    signOut(auth)
        .then(() => {
            alert("User logged out successfully!");
            updateUI(false); // UI განახლება (Logout ღილაკის დამალვა, Login-ის გამოჩენა)
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
}

// Logout ღილაკის Event Listener
if (logoutBtn) {
    logoutBtn.addEventListener('click', logOut);
}




// მომხმარებლის სტატუსის შემოწმება
onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUI(true); // მომხმარებელი შესულია
    } else {
        updateUI(false); // მომხმარებელი გასულია
    }
});

// UI განახლების ფუნქცია
function updateUI(isLoggedIn) {
    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        loginBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    } 
}
