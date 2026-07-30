// ==============================
// dashboard.js
// Fx Sharaf AI Dashboard
// Part 1
// ==============================

// Dashboard Elements

const totalSignals =
document.getElementById("totalSignals");

const todayUsage =
document.getElementById("todayUsage");

const aiStatus =
document.getElementById("aiStatus");

const lastAnalysis =
document.getElementById("lastAnalysis");

// ------------------------------
// Load Dashboard
// ------------------------------

async function loadDashboard(){

    try{

        const res = await fetch("/api/dashboard");

        const data = await res.json();

        totalSignals.innerText =
        data.totalSignals || 0;

        todayUsage.innerText =
        data.todayUsage || "0 / 5";

        aiStatus.innerText =
        data.aiStatus || "Online";

        lastAnalysis.innerText =
        data.lastAnalysis || "No Analysis";

    }catch(err){

        console.error(err);

        showNotification(
        "Dashboard Load Failed");

    }

}

// ------------------------------
// Refresh Dashboard
// ------------------------------

setInterval(()=>{

    loadDashboard();

},30000);

// ------------------------------
// Initialize
// ------------------------------

loadDashboard();
// ==============================
// Dashboard Statistics
// Part 2
// ==============================

// ------------------------------
// Update Statistics
// ------------------------------

async function updateStatistics(){

    try{

        const res = await fetch("/api/dashboard/stats");

        const data = await res.json();

        document.getElementById(
        "totalSignals"
        ).innerText =
        data.totalSignals || 0;

        document.getElementById(
        "todayUsage"
        ).innerText =
        data.todayUsage || "0 / 5";

        document.getElementById(
        "aiStatus"
        ).innerText =
        data.aiStatus || "Online";

        document.getElementById(
        "lastAnalysis"
        ).innerText =
        data.lastAnalysis || "No Analysis";

    }catch(err){

        console.error(err);

    }

}

// ------------------------------
// Recent Activity
// ------------------------------

async function loadRecentActivity(){

    const box =
    document.getElementById("recentActivity");

    if(!box) return;

    try{

        const res = await fetch(
        "/api/dashboard/activity"
        );

        const data = await res.json();

        box.innerHTML = "";

        data.forEach(item=>{

            const div =
            document.createElement("div");

            div.className =
            "activity-item";

            div.innerHTML = `

                <strong>${item.market}</strong>

                <br>

                ${item.signal}

                <br>

                <small>${item.time}</small>

            `;

            box.appendChild(div);

        });

    }catch(err){

        box.innerHTML =
        "<p>Unable to load activity.</p>";

    }

}

// ------------------------------
// Usage Progress
// ------------------------------

function updateProgress(){

    const progress =
    document.getElementById("usageProgress");

    if(!progress) return;

    const max = 5;

    const percent =
    Math.min((usedSignals / max) * 100, 100);

    progress.style.width =
    percent + "%";

}

// ------------------------------
// Auto Refresh
// ------------------------------

setInterval(()=>{

    updateStatistics();

    loadRecentActivity();

    updateProgress();

},15000);

// ------------------------------
// Initialize
// ------------------------------

updateStatistics();

loadRecentActivity();

updateProgress();
