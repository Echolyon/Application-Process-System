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

document.addEventListener("DOMContentLoaded", function () {
    // Sayfa yüklendikten sonra onAuthStateChanged'i başlatıyoruz
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Giriş yaptıysa, giriş panelini gizleyip, üye panelini göster
            document.getElementById("authContainer").style.display = "none";
            document.getElementById("memberContainer").style.display = "block";
            // Kullanıcı bilgilerini tabloya yerleştir
            document.getElementById("userName").textContent = user.displayName || "Belirtilmemiş";
            document.getElementById("userEmail").textContent = user.email;
            document.getElementById("userId").textContent = user.uid;
            // Tabloyu göster
            const memberTable = document.getElementById("memberTable");
            if (memberTable) {
                memberTable.style.display = "table";
            }
        } else {
            // Kullanıcı giriş yapmamışsa, giriş panelini göster ve üye panelini gizle
            document.getElementById("authContainer").style.display = "block";
            document.getElementById("memberContainer").style.display = "none";
            // Tabloyu gizle
            const memberTable = document.getElementById("memberTable");
            if (memberTable) {
                memberTable.style.display = "none";
            }
        }
    });

    // Giriş formu işlemi
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                // Başarılı giriş sonrası sayfa yenilenmesi
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

    // Çıkış işlemi
    document.getElementById("logout").addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        });
    });

    // Şifre değiştirme işlemi
    document.getElementById("changePassword").addEventListener("click", () => {
        const email = auth.currentUser.email;
        sendPasswordResetEmail(auth, email).then(() => {
            alert("Şifre sıfırlama e-postası gönderildi!");
        }).catch(error => {
            alert("Hata: " + error.message);
        });
    });
});

// Kullanıcı giriş yaptıktan sonra bilgileri al ve tabloya yaz
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("memberContainer").style.display = "block";

        // Kullanıcı bilgilerini tabloya ekle
        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userName").textContent = user.displayName ? user.displayName : "Yok";
        document.getElementById("userStatus").textContent = user.emailVerified ? "Doğrulandı" : "Doğrulanmadı";
    } else {
        document.getElementById("authContainer").style.display = "block";
        document.getElementById("memberContainer").style.display = "none";
    }
});
