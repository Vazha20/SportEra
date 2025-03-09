import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDttBUMsMMkPXJrN9VW9ggeTpKZZKHqLo",
  authDomain: "sportera22.firebaseapp.com",
  projectId: "sportera22",
  storageBucket: "sportera22.appspot.com",
  messagingSenderId: "396713612036",
  appId: "1:396713612036:web:03dbb958456b6d8906b651",
  measurementId: "G-TG83S43Z78"
};

// ✅ ამოწმებს, უკვე არსებობს თუ არა Firebase აპი
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Firestore-ის ინიციალიზაცია

document.getElementById('registrationForm').addEventListener('submit', register);

async function register(event) {
  event.preventDefault();

  const email = document.getElementById('regEmail').value;
  const username = document.getElementById('userName').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confrimPassword').value;

  if (!validate_email(email) || !validate_password(password) || password !== confirmPassword) {
    alert('Invalid email, password format, or passwords do not match.');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userData = {
      username: username,
      email: email,
      last_login: new Date().toISOString(),
    };

    // 🔥 Firestore-ში მონაცემების დამატება
    await setDoc(doc(firestore, "users", user.uid), userData);

    localStorage.setItem('userData', JSON.stringify(userData));

    alert('User created successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
    alert(`Error: ${error.code} - ${error.message}`);
  }
}

function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length >= 6 && /[A-Z]/.test(password);
}

document.getElementById('registerButton').addEventListener('click', register);

document.addEventListener("DOMContentLoaded", function() {
    const showRegistration = document.getElementById("showRegistration");
    const loginForm = document.getElementById("loginForm");
    const registrationForm = document.getElementById("registrationForm");

    if (showRegistration) {
        showRegistration.addEventListener("click", function() {
            loginForm.style.display = "none";
            registrationForm.style.display = "block";
        });
    }

    const backToLogin = document.getElementById("backToLogin");
    if (backToLogin) {
        backToLogin.addEventListener("click", function() {
            registrationForm.style.display = "none";
            loginForm.style.display = "block";
        });
    }
});
