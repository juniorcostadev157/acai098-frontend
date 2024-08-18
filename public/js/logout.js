// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQb_B_pOUQwPkkGOZmN6iIn3SsVhGPHEc",
    authDomain: "acai098.firebaseapp.com",
    projectId: "acai098",
    storageBucket: "acai098.appspot.com",
    messagingSenderId: "599019801888",
    appId: "1:599019801888:web:c0684be644884939bcdb45",
    measurementId: "G-JTBYZDB9EV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function() {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            firebase.auth().signOut().then(() => {
                // Redireciona para a página inicial após o logout
                window.location.href = 'index.html';
            }).catch((error) => {
                console.error("Erro ao fazer logout:", error);
            });
        });
    }
});
