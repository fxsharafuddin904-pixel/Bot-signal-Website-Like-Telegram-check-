// ==============================
// Fx Sharaf AI
// Main JavaScript
// Part 1
// ==============================

// ------------------------------
// Elements
// ------------------------------

const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

const menuBtn = document.getElementById("menuBtn");
const closeSidebar = document.getElementById("closeSidebar");

const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLogin = document.getElementById("closeLogin");
const loginNow = document.getElementById("loginNow");

const popup = document.getElementById("successPopup");
const popupText = document.getElementById("popupMessage");
const popupClose = document.getElementById("popupClose");

const notification = document.getElementById("notificationBox");
const notificationText = document.getElementById("notificationText");

const loader = document.getElementById("loader");

// ------------------------------
// Loader
// ------------------------------

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.display = "none";

    }, 1800);

});

// ------------------------------
// Sidebar
// ------------------------------

menuBtn.onclick = () => {

    sidebar.classList.add("active");

    overlay.classList.add("active");

    playClick();

};

closeSidebar.onclick = closeMenu;

overlay.onclick = closeMenu;

function closeMenu(){

    sidebar.classList.remove("active");

    overlay.classList.remove("active");

}

// ------------------------------
// Login Popup
// ------------------------------

loginBtn.onclick = () => {

    loginModal.style.display = "flex";

    playClick();

};

closeLogin.onclick = () => {

    loginModal.style.display = "none";

};

popupClose.onclick = () => {

    popup.style.display = "none";

};

// ------------------------------
// Notification
// ------------------------------

function showNotification(text){

    notificationText.innerText = text;

    notification.classList.add("show");

    setTimeout(()=>{

        notification.classList.remove("show");

    },3000);

}

// ------------------------------
// Success Popup
// ------------------------------

function showSuccess(text){

    popupText.innerText = text;

    popup.style.display = "flex";

    playSuccess();

}

// ------------------------------
// Sounds
// ------------------------------

const clickSound = new Audio("click.mp3");

const successSound = new Audio("success.mp3");

function playClick(){

    clickSound.currentTime = 0;

    clickSound.play();

}

function playSuccess(){

    successSound.currentTime = 0;

    successSound.play();

  }
// ==============================
// Login & User Session
// ==============================

let currentUser = null;

let dailyLimit = 5;

let usedSignals = Number(

localStorage.getItem("usedSignals") || 0

);

// ------------------------------
// Admin Gmail
// ------------------------------

const ADMIN_EMAIL =

"Fxsharafuddin@gmail.com";

// ------------------------------
// Login
// ------------------------------

loginNow.onclick = async () => {

    playClick();

    const email = document

    .getElementById("loginEmail")

    .value

    .trim()

    .toLowerCase();

    if(email === ""){

        showNotification(

        "Enter Gmail Address"

        );

        return;

    }

    try{

        const res = await fetch(

        "/login",

        {

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

            currentUser = email;

            localStorage.setItem(

            "currentUser",

            email

            );

            loginModal.style.display = "none";

            showSuccess(

            "Login Successful"

            );

            loadUser();

        }

        else{

            showNotification(

            "Access Denied"

            );

        }

    }

    catch(err){

        showNotification(

        "Server Error"

        );

    }

};

// ------------------------------
// Load User
// ------------------------------

function loadUser(){

    const saved = localStorage.getItem(

    "currentUser"

    );

    if(saved){

        currentUser = saved;

    }

    if(currentUser){

        loginBtn.innerHTML =

        `<i class="fa-solid fa-user-check"></i>`;

        showNotification(

        "Welcome " + currentUser

        );

    }

    checkAdmin();

    updateUsage();

}

// ------------------------------
// Admin Button
// ------------------------------

function checkAdmin(){

    const adminBtn =

    document.getElementById(

    "adminBtn"

    );

    if(

        currentUser ===

        ADMIN_EMAIL.toLowerCase()

    ){

        adminBtn.style.display =

        "flex";

    }

    else{

        adminBtn.style.display =

        "none";

    }

}

// ------------------------------
// Usage Counter
// ------------------------------

function updateUsage(){

    const txt =

    document.getElementById(

    "todayUsage"

    );

    if(txt){

        txt.innerText =

        `${usedSignals} / ${dailyLimit}`;

    }

}

// ------------------------------
// Increase Usage
// ------------------------------

function increaseUsage(){

    usedSignals++;

    localStorage.setItem(

    "usedSignals",

    usedSignals

    );

    updateUsage();

}

// ------------------------------
// Check Free Limit
// ------------------------------

function canUseAI(){

    if(

        currentUser ===

        ADMIN_EMAIL.toLowerCase()

    ){

        return true;

    }

    if(

        usedSignals >= dailyLimit

    ){

        showNotification(

        "Daily Limit Reached"

        );

        return false;

    }

    return true;

}

// ------------------------------
// Auto Login
// ------------------------------

loadUser();
// ==============================
// Navigation & Page Switching
// ==============================

const pages = [

"homeSection",

"otcSection",

"realSection",

"futureSection",

"managementSection",

"adminSection"

];

function hideAllPages(){

    pages.forEach(id=>{

        const page = document.getElementById(id);

        if(page){

            page.classList.remove("active");

            page.style.display = "none";

        }

    });

}

function openPage(id,title){

    hideAllPages();

    const page = document.getElementById(id);

    if(page){

        page.style.display = "block";

        page.classList.add("active");

    }

    document.querySelector("header h1").innerText = title;

    closeMenu();

    playClick();

}

document.getElementById("dashboardBtn").onclick=()=>{

    openPage("homeSection","Dashboard");

};

document.getElementById("otcBtn").onclick=()=>{

    openPage("otcSection","OTC Analyzer");

};

document.getElementById("realBtn").onclick=()=>{

    openPage("realSection","Real Analyzer");

};

document.getElementById("futureBtn").onclick=()=>{

    openPage("futureSection","Future Signals");

};

document.getElementById("managementBtn").onclick=()=>{

    openPage("managementSection","Management");

};

document.getElementById("adminBtn").onclick=()=>{

    openPage("adminSection","Admin Panel");

};

// Quick Action Buttons

document.getElementById("openOTC").onclick=()=>{

    openPage("otcSection","OTC Analyzer");

};

document.getElementById("openReal").onclick=()=>{

    openPage("realSection","Real Analyzer");

};

document.getElementById("openFuture").onclick=()=>{

    openPage("futureSection","Future Signals");

};

document.getElementById("openManagement").onclick=()=>{

    openPage("managementSection","Management");

};

// Default Page

openPage("homeSection","Dashboard");
// ==============================
// OTC Analyzer
// ==============================

const otcImage = document.getElementById("otcImage");

const otcPreview = document.getElementById("otcPreview");

const analyzeOTC = document.getElementById("analyzeOTC");

const otcLoading = document.getElementById("otcLoading");

const otcResult = document.getElementById("otcResult");

// ------------------------------
// Image Preview
// ------------------------------

otcImage.onchange = () => {

    const file = otcImage.files[0];

    if(!file){

        return;

    }

    const reader = new FileReader();

    reader.onload = e => {

        otcPreview.src = e.target.result;

        otcPreview.style.display = "block";

    };

    reader.readAsDataURL(file);

    playClick();

};

// ------------------------------
// Analyze OTC
// ------------------------------

analyzeOTC.onclick = async () => {

    if(!canUseAI()) return;

    if(!otcImage.files.length){

        showNotification("Please Select Image");

        return;

    }

    otcLoading.style.display = "block";

    otcResult.style.display = "none";

    const formData = new FormData();

    formData.append(

        "image",

        otcImage.files[0]

    );

    try{

        const response = await fetch(

            "/api/otc",

            {

                method:"POST",

                body:formData

            }

        );

        const data = await response.json();

        otcLoading.style.display = "none";

        otcResult.style.display = "block";

        document.getElementById(

        "otcSignal"

        ).innerText = data.signal || "--";

        document.getElementById(

        "otcSignalBadge"

        ).innerText = data.signal || "WAITING";

        document.getElementById(

        "otcConfidence"

        ).innerText =

        (data.confidence || 0) + "%";

        document.getElementById(

        "otcReason"

        ).innerText =

        data.reason || "No Result";

        increaseUsage();

        showSuccess("Analysis Completed");

    }

    catch(err){

        otcLoading.style.display = "none";

        showNotification("Server Error");

    }

};

// ------------------------------
// Copy Result
// ------------------------------

document.getElementById(

"copyOTC"

).onclick = ()=>{

    navigator.clipboard.writeText(

        document.getElementById(

        "otcSignal"

        ).innerText

    );

    showSuccess("Copied");

};

// ------------------------------
// New Analysis
// ------------------------------

document.getElementById(

"newOTC"

).onclick = ()=>{

    otcImage.value = "";

    otcPreview.src = "";

    otcPreview.style.display = "none";

    otcResult.style.display = "none";

    playClick();

};
// ==============================
// Real Analyzer
// ==============================

const realImage = document.getElementById("realImage");

const realPreview = document.getElementById("realPreview");

const analyzeReal = document.getElementById("analyzeReal");

const realLoading = document.getElementById("realLoading");

const realResult = document.getElementById("realResult");

// ------------------------------
// Image Preview
// ------------------------------

realImage.onchange = () => {

    const file = realImage.files[0];

    if(!file){

        return;

    }

    const reader = new FileReader();

    reader.onload = e => {

        realPreview.src = e.target.result;

        realPreview.style.display = "block";

    };

    reader.readAsDataURL(file);

    playClick();

};

// ------------------------------
// Analyze Real
// ------------------------------

analyzeReal.onclick = async () => {

    if(!canUseAI()) return;

    if(!realImage.files.length){

        showNotification("Please Select Image");

        return;

    }

    realLoading.style.display = "block";

    realResult.style.display = "none";

    const formData = new FormData();

    formData.append(

        "image",

        realImage.files[0]

    );

    try{

        const response = await fetch(

            "/api/real",

            {

                method:"POST",

                body:formData

            }

        );

        const data = await response.json();

        realLoading.style.display = "none";

        realResult.style.display = "block";

        document.getElementById(

        "realSignal"

        ).innerText = data.signal || "--";

        document.getElementById(

        "realSignalBadge"

        ).innerText = data.signal || "WAITING";

        document.getElementById(

        "realConfidence"

        ).innerText =

        (data.confidence || 0) + "%";

        document.getElementById(

        "realReason"

        ).innerText =

        data.reason || "No Result";

        increaseUsage();

        showSuccess("Analysis Completed");

    }

    catch(err){

        realLoading.style.display = "none";

        showNotification("Server Error");

    }

};

// ------------------------------
// Copy Result
// ------------------------------

document.getElementById(

"copyReal"

).onclick = ()=>{

    navigator.clipboard.writeText(

        document.getElementById(

        "realSignal"

        ).innerText

    );

    showSuccess("Copied");

};

// ------------------------------
// New Analysis
// ------------------------------

document.getElementById(

"newReal"

).onclick = ()=>{

    realImage.value = "";

    realPreview.src = "";

    realPreview.style.display = "none";

    realResult.style.display = "none";

    playClick();

};
// ==============================
// Future Signals
// ==============================

const marketSearch =
document.getElementById("marketSearch");

const marketList =
document.getElementById("marketList");

const selectedMarket =
document.getElementById("selectedMarket");

const startTime =
document.getElementById("startTime");

const endTime =
document.getElementById("endTime");

const generateFuture =
document.getElementById("generateFuture");

const futureLoading =
document.getElementById("futureLoading");

const futureResult =
document.getElementById("futureResult");

// ------------------------------
// Search Market
// ------------------------------

marketSearch.oninput = async () => {

    const keyword =
    marketSearch.value.trim();

    if(keyword.length < 1){

        marketList.style.display = "none";

        return;

    }

    try{

        const res = await fetch(
        "/api/markets?q=" +
        encodeURIComponent(keyword));

        const data = await res.json();

        marketList.innerHTML = "";

        data.forEach(item=>{

            const div =
            document.createElement("div");

            div.className =
            "market-item";

            div.innerText = item;

            div.onclick = ()=>{

                selectedMarket.value = item;

                marketList.style.display = "none";

                playClick();

            };

            marketList.appendChild(div);

        });

        marketList.style.display = "block";

    }catch(e){

        showNotification("Market Load Failed");

    }

};

// ------------------------------
// Generate Future Signal
// ------------------------------

generateFuture.onclick = async ()=>{

    if(!canUseAI()) return;

    if(selectedMarket.value===""){

        showNotification(
        "Select Market First");

        return;

    }

    futureLoading.style.display =
    "block";

    futureResult.style.display =
    "none";

    try{

        const res = await fetch(
        "/api/future",
        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                market:
                selectedMarket.value,

                start:
                startTime.value,

                end:
                endTime.value

            })

        });

        const data =
        await res.json();

        futureLoading.style.display =
        "none";

        futureResult.style.display =
        "block";

        document.getElementById(
        "futureMarket").innerText =
        data.market;

        document.getElementById(
        "futureSignal").innerText =
        data.signal;

        document.getElementById(
        "futureBadge").innerText =
        data.signal;

        document.getElementById(
        "futureTime").innerText =
        data.time;

        document.getElementById(
        "futureConfidence").innerText =
        "Confidence : " +
        data.confidence + "%";

        document.getElementById(
        "futureReason").innerText =
        data.reason;

        increaseUsage();

        showSuccess(
        "Future Signal Generated");

    }

    catch(err){

        futureLoading.style.display =
        "none";

        showNotification(
        "Server Error");

    }

};

// ------------------------------
// Copy Signal
// ------------------------------

document.getElementById(
"copyFuture").onclick = ()=>{

    navigator.clipboard.writeText(

`Market: ${document.getElementById("futureMarket").innerText}

Signal: ${document.getElementById("futureSignal").innerText}

Time: ${document.getElementById("futureTime").innerText}`

    );

    showSuccess("Copied");

};

// ------------------------------
// Telegram Send
// ------------------------------

document.getElementById(
"sendTelegram").onclick = async ()=>{

    try{

        await fetch(
        "/api/sendTelegram",
        {

            method:"POST",

            headers:{
            "Content-Type":
            "application/json"
            },

            body:JSON.stringify({

                market:
                document.getElementById(
                "futureMarket").innerText,

                signal:
                document.getElementById(
                "futureSignal").innerText,

                time:
                document.getElementById(
                "futureTime").innerText

            })

        });

        showSuccess(
        "Telegram Sent");

    }catch(e){

        showNotification(
        "Telegram Failed");

    }

};
// ==============================
// Management
// ==============================

const saveTelegram =
document.getElementById("saveTelegram");

const testTelegram =
document.getElementById("testTelegram");

saveTelegram.onclick = async ()=>{

    playClick();

    const token =
    document.getElementById("botToken").value;

    const chatId =
    document.getElementById("chatId").value;

    try{

        const res = await fetch(

        "/api/telegram/save",

        {

            method:"POST",

            headers:{

                "Content-Type":"application/json"

            },

            body:JSON.stringify({

                token,

                chatId

            })

        });

        const data = await res.json();

        if(data.success){

            document.getElementById(

            "telegramConnectionStatus"

            ).innerText = "Connected";

            showSuccess(

            "Telegram Saved"

            );

        }else{

            showNotification(

            "Save Failed"

            );

        }

    }catch(err){

        showNotification(

        "Server Error"

        );

    }

};

testTelegram.onclick = async ()=>{

    playClick();

    try{

        const res = await fetch(

        "/api/telegram/test",

        {

            method:"POST"

        });

        const data = await res.json();

        document.getElementById(

        "telegramTestResult"

        ).innerText = data.message;

        if(data.success){

            showSuccess(

            "Telegram Connected"

            );

        }else{

            showNotification(

            "Telegram Failed"

            );

        }

    }catch(err){

        showNotification(

        "Server Error"

        );

    }

};

// ==============================
// Admin Panel
// ==============================

document.getElementById(

"verifyKey"

).onclick = async ()=>{

    const key =

    document.getElementById(

    "licenseKey"

    ).value;

    const res = await fetch(

    "/api/license/check",

    {

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            key

        })

    });

    const data = await res.json();

    if(data.success){

        document.getElementById(

        "licenseStatus"

        ).innerText =

        "License Activated";

        showSuccess(

        "License Verified"

        );

    }else{

        showNotification(

        "Invalid License"

        );

    }

};

document.getElementById(

"addUser"

).onclick = ()=>{

    showNotification(

    "Backend Add User Required"

    );

};

document.getElementById(

"removeUser"

).onclick = ()=>{

    showNotification(

    "Backend Remove User Required"

    );

};
// ==============================
// Background Video
// ==============================

const bgVideo = document.getElementById("bgVideo");

if(bgVideo){

    bgVideo.play().catch(()=>{});

}

// ==============================
// Auto Sound
// ==============================

window.addEventListener("click",()=>{

    if(clickSound){

        clickSound.volume = 0.4;

    }

},{once:true});

// ==============================
// Daily Usage Reset
// ==============================

const today = new Date().toLocaleDateString();

const savedDate = localStorage.getItem("usageDate");

if(savedDate !== today){

    localStorage.setItem("usageDate", today);

    localStorage.setItem("usedSignals", 0);

    usedSignals = 0;

    updateUsage();

}

// ==============================
// Keyboard Shortcut
// ==============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        loginModal.style.display="none";

        popup.style.display="none";

        closeMenu();

    }

});

// ==============================
// Theme Initialize
// ==============================

document.addEventListener("DOMContentLoaded",()=>{

    loadUser();

    updateUsage();

    showNotification("Welcome to Fx Sharaf AI");

});

// ==============================
// Utility Functions
// ==============================

function copyText(text){

    navigator.clipboard.writeText(text);

    showSuccess("Copied Successfully");

}

function formatTime(date){

    return new Date(date).toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit"

    });

}

function generateID(){

    return "FX-" +

    Date.now() +

    "-" +

    Math.floor(Math.random()*9999);

}

// ==============================
// Console Message
// ==============================

console.log("================================");

console.log(" Fx Sharaf AI Loaded Successfully ");

console.log(" Gemini 2.5 Flash Connected ");

console.log(" Version : 1.0.0 ");

console.log("================================");
