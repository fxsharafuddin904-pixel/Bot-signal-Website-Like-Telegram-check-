// ==============================
// login.js
// Fx Sharaf AI Login System
// Part 1
// ==============================

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const rememberMe = document.getElementById("rememberMe");

// ------------------------------
// Auto Login
// ------------------------------

window.addEventListener("DOMContentLoaded", () => {

    const saved = localStorage.getItem("currentUser");

    if(saved){

        window.location.href = "index.html";

    }

});

// ------------------------------
// Login
// ------------------------------

loginForm?.addEventListener("submit", async (e)=>{

    e.preventDefault();

    playClick();

    const email = loginEmail.value.trim().toLowerCase();

    const password = loginPassword.value.trim();

    if(email === "" || password === ""){

        showNotification("Fill all fields");

        return;

    }

    try{

        const res = await fetch("/login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email,
                password
            })

        });

        const data = await res.json();

        if(data.success){

            if(rememberMe?.checked){

                localStorage.setItem("currentUser", email);

            }else{

                sessionStorage.setItem("currentUser", email);

            }

            showSuccess("Login Successful");

            setTimeout(()=>{

                window.location.href = "index.html";

            },1000);

        }else{

            showNotification(data.message || "Invalid Login");

        }

    }catch(err){

        showNotification("Server Error");

    }

});
// ==============================
// Google Login (Frontend)
// ==============================

const googleLoginBtn =
document.getElementById("googleLogin");

googleLoginBtn?.addEventListener("click",()=>{

    playClick();

    window.location.href =
    "/auth/google";

});

// ==============================
// Logout
// ==============================

const logoutBtn =
document.getElementById("logoutBtn");

logoutBtn?.addEventListener("click",()=>{

    playClick();

    localStorage.removeItem("currentUser");

    sessionStorage.removeItem("currentUser");

    showSuccess("Logout Successful");

    setTimeout(()=>{

        window.location.href =
        "login.html";

    },1000);

});

// ==============================
// Forgot Password
// ==============================

const forgotBtn =
document.getElementById("forgotPassword");

forgotBtn?.addEventListener("click",async()=>{

    const email =
    loginEmail.value.trim().toLowerCase();

    if(email===""){

        showNotification(
        "Enter your Gmail first");

        return;

    }

    try{

        const res = await fetch(
        "/forgot-password",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                email
            })

        });

        const data = await res.json();

        if(data.success){

            showSuccess(
            "Reset link sent");

        }else{

            showNotification(
            data.message ||
            "Request Failed");

        }

    }catch(err){

        showNotification(
        "Server Error");

    }

});

// ==============================
// Session Check
// ==============================

(function(){

    const user =
    localStorage.getItem("currentUser") ||
    sessionStorage.getItem("currentUser");

    if(user){

        console.log(
        "Logged in as:",
        user
        );

    }

})();
