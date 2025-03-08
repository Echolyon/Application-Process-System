import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxwWd_95aNhbPIrpo0I1myBiMXVxRJ2MM",
    authDomain: "udem-auth-test.firebaseapp.com",
    projectId: "udem-auth-test",
    storageBucket: "udem-auth-test.appspot.com",
    messagingSenderId: "821819546336",
    appId: "1:821819546336:web:2142e07f01e357cabf4e85",
    measurementId: "G-PEJC0TZNM7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("memberContainer").style.display = "block";
    } else {
        document.getElementById("authContainer").style.display = "block";
        document.getElementById("memberContainer").style.display = "none";
    }
});

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => {
            let errorMessage = "";
            switch (error.code) {
                case "auth/invalid-email":
                    errorMessage = "Geçersiz e-posta adresi!";
                    break;
                case "auth/user-disabled":
                    errorMessage = "Hesabınız devre dışı bırakıldı.";
                    break;
                case "auth/user-not-found":
                    errorMessage = "Böyle bir kullanıcı bulunamadı.";
                    break;
                case "auth/wrong-password":
                    errorMessage = "Yanlış şifre.";
                    break;
                default:
                    errorMessage = "Bir hata oluştu, lütfen tekrar deneyin.";
            }
            document.getElementById("errorMessage").innerText = errorMessage;
        });
});

document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "index.html";
    });
});

document.getElementById("changePassword").addEventListener("click", () => {
    const email = auth.currentUser.email;
    sendPasswordResetEmail(auth, email).then(() => {
        alert("Şifre sıfırlama e-postası gönderildi!");
    }).catch(error => {
        alert("Hata: " + error.message);
    });
});


// Lightbox Modal Kontrolleri
const lightbox = document.getElementById("lightbox");
const closeBtn = lightbox.querySelector(".close");

document.querySelectorAll('.open-lightbox').forEach(item => {
    item.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        // Lightbox içeriği burada dinamik olarak değiştirilebilir
    });
});

// Kapatma Tuşu
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

document.addEventListener("DOMContentLoaded", function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            document.getElementById("userName").textContent = user.displayName || "Belirtilmemiş";
            document.getElementById("userEmail").textContent = user.email;
            document.getElementById("userId").textContent = user.uid;

            // Kullanıcı giriş yaptıysa tabloyu göster
            document.querySelector(".user-info").style.display = "block";
        } else {
            // Kullanıcı giriş yapmadıysa tabloyu gizli bırak
            document.querySelector(".user-info").style.display = "none";
        }
    });
});
