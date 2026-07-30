// ==============================
// management.js
// Fx Sharaf AI Management
// Part 1
// ==============================

// ------------------------------
// Elements
// ------------------------------

const botToken =
document.getElementById("botToken");

const chatId =
document.getElementById("chatId");

const saveTelegramBtn =
document.getElementById("saveTelegram");

const testTelegramBtn =
document.getElementById("testTelegram");

const telegramStatus =
document.getElementById("telegramConnectionStatus");

// ------------------------------
// Save Telegram Settings
// ------------------------------

saveTelegramBtn?.addEventListener("click", async ()=>{

    playClick();

    if(
        botToken.value.trim() === "" ||
        chatId.value.trim() === ""
    ){

        showNotification(
        "Enter Bot Token & Chat ID");

        return;

    }

    try{

        const res = await fetch(
        "/api/telegram/save",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                token:botToken.value.trim(),

                chatId:chatId.value.trim()

            })

        });

        const data = await res.json();

        if(data.success){

            telegramStatus.innerText =
            "Connected";

            telegramStatus.style.color =
            "#00ff95";

            showSuccess(
            "Telegram Saved");

        }else{

            showNotification(
            data.message ||
            "Save Failed");

        }

    }catch(err){

        showNotification(
        "Server Error");

    }

});

// ------------------------------
// Test Telegram
// ------------------------------

testTelegramBtn?.addEventListener("click", async ()=>{

    playClick();

    try{

        const res = await fetch(
        "/api/telegram/test",{

            method:"POST"

        });

        const data = await res.json();

        if(data.success){

            showSuccess(
            "Telegram Connected");

        }else{

            showNotification(
            "Connection Failed");

        }

    }catch(err){

        showNotification(
        "Server Error");

    }

});
// ==============================
// Gemini API & App Settings
// Part 2
// ==============================

// ------------------------------
// Elements
// ------------------------------

const geminiApiKey =
document.getElementById("geminiApiKey");

const usageLimit =
document.getElementById("usageLimit");

const saveConfigBtn =
document.getElementById("saveConfig");

const resetConfigBtn =
document.getElementById("resetConfig");

// ------------------------------
// Save Configuration
// ------------------------------

saveConfigBtn?.addEventListener("click", async ()=>{

    playClick();

    const apiKey = geminiApiKey.value.trim();

    const limit = parseInt(usageLimit.value);

    if(apiKey === ""){

        showNotification(
        "Enter Gemini API Key");

        return;

    }

    try{

        const res = await fetch(
        "/api/settings/save",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                apiKey,
                usageLimit:isNaN(limit) ? 5 : limit

            })

        });

        const data = await res.json();

        if(data.success){

            showSuccess(
            "Configuration Saved");

        }else{

            showNotification(
            data.message || "Save Failed");

        }

    }catch(err){

        showNotification(
        "Server Error");

    }

});

// ------------------------------
// Reset Configuration
// ------------------------------

resetConfigBtn?.addEventListener("click",()=>{

    playClick();

    geminiApiKey.value = "";

    usageLimit.value = "5";

    localStorage.removeItem("geminiApiKey");

    localStorage.removeItem("usageLimit");

    showSuccess(
    "Settings Reset");

});

// ------------------------------
// Load Saved Settings
// ------------------------------

window.addEventListener("DOMContentLoaded",()=>{

    const savedKey =
    localStorage.getItem("geminiApiKey");

    const savedLimit =
    localStorage.getItem("usageLimit");

    if(savedKey){

        geminiApiKey.value = savedKey;

    }

    if(savedLimit){

        usageLimit.value = savedLimit;

    }

});
