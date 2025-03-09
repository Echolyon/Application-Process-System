import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxwWd_95aNhbPIrpo0I1myBiMXVxRJ2MM",
    authDomain: "udem-auth-test.firebaseapp.com",
    projectId: "udem-auth-test",
    storageBucket: "udem-auth-test",
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
            document.getElementById("sidebarPanel").style.display = "block";
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
            document.getElementById("sidebarPanel").style.display = "none";
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
                        errorMessage = "An error occured. Please try again.";
                }
                document.getElementById("errorMessage").innerText = errorMessage;
            });
    });

    // Fetch and display form submissions
    fetchFormSubmissions();

    // Lightbox close button
    document.querySelector(".close").addEventListener("click", () => {
        document.getElementById("formDetailsLightbox").style.display = "none";
    });

    // Process form button
    document.getElementById("processForm").addEventListener("click", () => {
        alert("Form process completed!");
        document.getElementById("formDetailsLightbox").style.display = "none";
    });

    // Sidebar button actions
    document.getElementById("profileButton").addEventListener("click", () => {
        document.getElementById('memberContainer').style.display = 'block';
        document.getElementById('memberContainer').classList.add('centered');
        document.getElementById('formSubmissionsTableContainer').style.display = 'none';
    });

    document.getElementById("changePasswordButton").addEventListener("click", () => {
        const email = auth.currentUser.email;
        sendPasswordResetEmail(auth, email).then(() => {
            alert("Password reset email sent!");
        }).catch(error => {
            alert("Hata: " + error.message);
        });
    });

    document.getElementById("logoutButton").addEventListener("click", () => {
        signOut(auth).then(() => {
            window.location.href = "index.html";
        });
    });

    document.getElementById('profileButton').addEventListener('click', () => {
        document.getElementById('memberContainer').style.display = 'block';
        document.getElementById('memberContainer').classList.add('centered');
        document.getElementById('formSubmissionsTableContainer').style.display = 'none';
    });

    document.getElementById('formControlButton').addEventListener('click', () => {
        document.getElementById('formSubmissionsTableContainer').style.display = 'block';
        document.getElementById('memberContainer').style.display = 'none';
    });
});

function fetchFormSubmissions() {
    // Simulate fetching form submissions from a server
    const formSubmissions = [
        { title: "Form 1", details: "Form 1 details..." },
        { title: "Form 2", details: "Form 2 details..." }
    ];

    const tableBody = document.querySelector("#formSubmissionsTable tbody");
    formSubmissions.forEach((submission, index) => {
        const row = document.createElement("tr");
        const titleCell = document.createElement("td");
        titleCell.textContent = submission.title;
        const actionCell = document.createElement("td");
        const viewButton = document.createElement("button");
        viewButton.textContent = "View";
        viewButton.addEventListener("click", () => {
            showFormDetails(submission.details);
        });
        actionCell.appendChild(viewButton);
        row.appendChild(titleCell);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

function showFormDetails(details) {
    document.getElementById("formDetailsContent").textContent = details;
    document.getElementById("formDetailsLightbox").style.display = "block";
}

// Kullanıcı giriş yaptıktan sonra bilgileri al ve tabloya yaz
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("authContainer").style.display = "none";
        document.getElementById("memberContainer").style.display = "block";

        // Kullanıcı bilgilerini tabloya ekle
        document.getElementById("userEmail").textContent = user.email;
        document.getElementById("userName").textContent = user.displayName ? user.displayName : "Yok";
        document.getElementById("userStatus").textContent = user.emailVerified ? "Doğrulandı" : "Doğrulanmadı";
        document.getElementById("userId").textContent = user.uid;
    } else {
        document.getElementById("authContainer").style.display = "block";
        document.getElementById("memberContainer").style.display = "none";
    }
});
