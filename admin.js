// ==============================
// admin.js
// Fx Sharaf AI Admin Panel
// Part 1
// ==============================

// ------------------------------
// Elements
// ------------------------------

const verifyKeyBtn =
document.getElementById("verifyKey");

const addUserBtn =
document.getElementById("addUser");

const removeUserBtn =
document.getElementById("removeUser");

const userList =
document.getElementById("userList");

const licenseStatus =
document.getElementById("licenseStatus");

// ------------------------------
// Load Users
// ------------------------------

async function loadUsers(){

    try{

        const res = await fetch("/api/users");

        const users = await res.json();

        userList.innerHTML = "";

        users.forEach(user=>{

            const div =
            document.createElement("div");

            div.className =
            "user-item";

            div.innerHTML = `

            <span>${user.email}</span>

            <button
            data-email="${user.email}">
            Remove
            </button>

            `;

            userList.appendChild(div);

        });

    }catch(err){

        console.error(err);

    }

}

// ------------------------------
// Verify License
// ------------------------------

verifyKeyBtn?.addEventListener("click",async()=>{

    playClick();

    const key =
    document.getElementById("licenseKey").value;

    try{

        const res = await fetch("/api/license/check",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({key})

        });

        const data =
        await res.json();

        if(data.success){

            licenseStatus.innerText =
            "License Activated";

            showSuccess(
            "License Verified");

        }else{

            showNotification(
            "Invalid License");

        }

    }catch(err){

        showNotification(
        "Server Error");

    }

});

// ------------------------------
// Initialize
// ------------------------------

loadUsers();
// ==============================
// Add User
// ==============================

addUserBtn?.addEventListener("click", async () => {

    playClick();

    const email = document
        .getElementById("newUserEmail")
        .value
        .trim()
        .toLowerCase();

    if(email === ""){

        showNotification("Enter Gmail Address");

        return;

    }

    try{

        const res = await fetch("/api/users/add",{

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

            showSuccess("User Added");

            document.getElementById(
                "newUserEmail"
            ).value = "";

            loadUsers();

        }else{

            showNotification(
                data.message || "Add Failed"
            );

        }

    }catch(err){

        showNotification("Server Error");

    }

});

// ==============================
// Remove User
// ==============================

userList?.addEventListener("click", async (e)=>{

    if(!e.target.matches("button")) return;

    playClick();

    const email =
    e.target.dataset.email;

    try{

        const res = await fetch("/api/users/remove",{

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

            showSuccess("User Removed");

            loadUsers();

        }else{

            showNotification(
                data.message || "Remove Failed"
            );

        }

    }catch(err){

        showNotification("Server Error");

    }

});

// ==============================
// Refresh User List
// ==============================

setInterval(()=>{

    loadUsers();

},30000);

// ==============================
// Admin Activity Log
// ==============================

async function loadAdminLogs(){

    try{

        const res = await fetch("/api/admin/logs");

        const logs = await res.json();

        console.table(logs);

    }catch(err){

        console.log("Admin logs unavailable");

    }

}

loadAdminLogs();
