// ========================================
// TASTY CAKERY ADMIN LOGIN
// ========================================

import { auth } from "./firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


const loginForm = document.getElementById("admin-login-form");
const emailInput = document.getElementById("admin-email");
const passwordInput = document.getElementById("admin-password");
const loginMessage = document.getElementById("login-message");


loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    loginMessage.textContent = "Signing in...";


    try {

        await signInWithEmailAndPassword(auth, email, password);

        loginMessage.textContent = "Login successful!";

        // We will create this dashboard in the next step.
        window.location.href = "dashboard.html";

    } catch (error) {

        console.error("Login error:", error);

        loginMessage.textContent =
            "Incorrect email or password. Please try again.";
    }

});