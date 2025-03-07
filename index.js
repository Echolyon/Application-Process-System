// script.js

function initializeFirebase() {
    const firebaseConfig = {
      apiKey: "AIzaSyBxwWd_95aNhbPIrpo0I1myBiMXVxRJ2MM",
      authDomain: "udem-auth-test.firebaseapp.com",
      projectId: "udem-auth-test",
      storageBucket: "udem-auth-test.firebasestorage.app",
      messagingSenderId: "821819546336",
      appId: "Y1:821819546336:web:2142e07f01e357cabf4e85",
      measurementId: "G-PEJC0TZNM7"
    };
  
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
  
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = emailInput.value;
      const password = passwordInput.value;
  
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        messageDiv.textContent = `Welcome, ${user.email}!`;
        console.log(user);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        messageDiv.textContent = `Error: ${errorMessage}`;
        console.error(errorCode, errorMessage);
      }
    });
  
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in:", user);
      } else {
        console.log("User is signed out");
      }
    });
  }
  
  //Check if Firebase has loaded
  if (typeof firebase !== 'undefined'){
    initializeFirebase();
  } else {
    console.error("Firebase is not loaded")
  }
  
  