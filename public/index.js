// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAt5lfKPnnr2VtoB8lrpF9vBk0QYx1QVZo",
    authDomain: "flyingspears-f2a0a.firebaseapp.com",
    projectId: "flyingspears-f2a0a",
    storageBucket: "flyingspears-f2a0a.appspot.com",
    messagingSenderId: "1087506841037",
    appId: "1:1087506841037:web:6b63900b5066b1ffc45884"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

var _user;


const doc_whenSignedIn = document.getElementById("whenSignedIn");
const doc_whenSignedOut = document.getElementById("whenSignedOut");

const doc_signInBtn = document.getElementById("signInBtn");
const doc_signOutBtn = document.getElementById("signOutBtn");

const userDetails = document.getElementById("userDetails");
const doc_username = document.getElementById("username");
const doc_userEmail = document.getElementById("userEmail");

//detect auth state
onAuthStateChanged(auth, user => {
    if (user != null) {
        console.log("logged in!");
        _user = user
        displayAsSignedIn();

    } else {
        console.log("not logged in!");
        displayAsSignedOut();
    }
});

const displayAsSignedIn = () => {
    doc_whenSignedIn.hidden = false;
    doc_whenSignedOut.hidden = true;
    if (_user.displayName) {
        doc_username.innerHTML = _user.displayName;
        doc_userEmail.innerHTML = _user.email;
        console.log(_user.displayName);
    }
}

const displayAsSignedOut = () => {
    doc_whenSignedIn.hidden = true;
    doc_whenSignedOut.hidden = false;
}


const userSignIn = async () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            _user = result.user;
            //console.log(_user);
            document.getElementById("nowSignedInMessage").hidden = false;

        }).catch((error) => {
            const errorCode = error.errorCode;
            const errorMessage = error.message;
        });

}

const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have signed out successfully!");
    }).catch((error) => {

    });
}

doc_signInBtn.onclick = () => userSignIn();
doc_signOutBtn.onclick = () => userSignOut();
