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

// Firebase başlatılıyor
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// HTML Elemanlarını Seçme
const authContainer = document.getElementById("authContainer");
const memberContainer = document.getElementById("memberContainer");
const memberTable = document.getElementById("memberTable");
const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logout");
const changePasswordButton = document.getElementById("changePassword");
const errorMessage = document.getElementById("errorMessage");

// Kullanıcı Bilgilerini Güncelleme Fonksiyonu
function updateUserInfo(user) {
    if (user) {
        authContainer.style.display = "none";
        memberContainer.style.display = "block";
        memberTable.style.display = "table";

        document.getElementById("userName").textContent = user.displayName || "Bilinmiyor";
        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userId").textContent = user.uid;
    } else {
        authContainer.style.display = "block";
        memberContainer.style.display = "none";
        memberTable.style.display = "none";
    }
}

// Kullanıcı Oturum Durumunu Kontrol Et
onAuthStateChanged(auth, (user) => {
    updateUserInfo(user);
});

// Giriş Formu İşlemi
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Giriş başarılı olduğunda sayfa yenileme yerine kullanıcı arayüzünü güncelle
                updateUserInfo(auth.currentUser);
            })
            .catch(error => {
                let errorMsg = "";
                switch (error.code) {
                    case "auth/invalid-email":
                        errorMsg = "Geçersiz e-posta adresi!";
                        break;
                    case "auth/user-disabled":
                        errorMsg = "Hesabınız devre dışı bırakıldı.";
                        break;
                    case "auth/user-not-found":
                        errorMsg = "Böyle bir kullanıcı bulunamadı.";
                        break;
                    case "auth/wrong-password":
                        errorMsg = "Yanlış şifre.";
                        break;
                    default:
                        errorMsg = "Bir hata oluştu, lütfen tekrar deneyin.";
                }
                errorMessage.innerText = errorMsg;
            });
    });
}

// Çıkış Yapma İşlemi
if (logoutButton) {
    logoutButton.addEventListener("click", () => {
        signOut(auth).then(() => {
            updateUserInfo(null);
        });
    });
}

// Şifre Sıfırlama İşlemi
if (changePasswordButton) {
    changePasswordButton.addEventListener("click", () => {
        const user = auth.currentUser;
        if (user) {
            sendPasswordResetEmail(auth, user.email)
                .then(() => {
                    alert("Şifre sıfırlama e-postası gönderildi!");
                })
                .catch(error => {
                    alert("Hata: " + error.message);
                });
        } else {
            alert("Önce giriş yapmalısınız!");
        }
    });
}
