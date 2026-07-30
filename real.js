// ==============================
// real.js
// Fx Sharaf AI Real Market
// Part 1
// ==============================

// ------------------------------
// Elements
// ------------------------------

const realUpload =
document.getElementById("realImage");

const realAnalyze =
document.getElementById("analyzeReal");

const realPreview =
document.getElementById("realPreview");

const realLoading =
document.getElementById("realLoading");

const realResult =
document.getElementById("realResult");

// ------------------------------
// Image Preview
// ------------------------------

realUpload?.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = (ev)=>{

        realPreview.src = ev.target.result;

        realPreview.style.display = "block";

    };

    reader.readAsDataURL(file);

    playClick();

});

// ------------------------------
// Analyze Real Chart
// ------------------------------

realAnalyze?.addEventListener("click",async()=>{

    if(!canUseAI()) return;

    if(!realUpload.files.length){

        showNotification(
        "Please upload a chart");

        return;

    }

    realLoading.style.display = "block";
    realResult.style.display = "none";

    const formData = new FormData();

    formData.append(
        "image",
        realUpload.files[0]
    );

    try{

        const res = await fetch(
        "/api/real/analyze",
        {
            method:"POST",
            body:formData
        });

        const data = await res.json();

        realLoading.style.display = "none";
        realResult.style.display = "block";

        document.getElementById(
        "realSignal").innerText =
        data.signal || "--";

        document.getElementById(
        "realSignalBadge").innerText =
        data.signal || "WAIT";

        document.getElementById(
        "realConfidence").innerText =
        (data.confidence || 0) + "%";

        document.getElementById(
        "realReason").innerText =
        data.reason || "No analysis available.";

        increaseUsage();

        showSuccess(
        "Real Market Analysis Complete");

    }catch(err){

        realLoading.style.display = "none";

        showNotification(
        "Analysis Failed");

    }

});
// ==============================
// Real Result Tools
// Part 2
// ==============================

// ------------------------------
// Copy Result
// ------------------------------

document.getElementById("copyReal")
?.addEventListener("click",()=>{

    const text = `
Market : REAL
Signal : ${document.getElementById("realSignal").innerText}
Confidence : ${document.getElementById("realConfidence").innerText}
Reason : ${document.getElementById("realReason").innerText}
`;

    navigator.clipboard.writeText(text);

    showSuccess("Result Copied");

});

// ------------------------------
// Reset Analyzer
// ------------------------------

document.getElementById("newReal")
?.addEventListener("click",()=>{

    realUpload.value = "";

    realPreview.src = "";

    realPreview.style.display = "none";

    realResult.style.display = "none";

    realLoading.style.display = "none";

    playClick();

});

// ------------------------------
// Save History
// ------------------------------

function saveRealHistory(data){

    const history = JSON.parse(

        localStorage.getItem("realHistory") || "[]"

    );

    history.unshift({

        market:"REAL",

        signal:data.signal,

        confidence:data.confidence,

        reason:data.reason,

        time:new Date().toLocaleString()

    });

    localStorage.setItem(

        "realHistory",

        JSON.stringify(history.slice(0,50))

    );

}

// ------------------------------
// Signal Color
// ------------------------------

function updateRealSignalColor(signal){

    const badge = document.getElementById("realSignalBadge");

    const text = document.getElementById("realSignal");

    badge.classList.remove("call","put","wait");

    text.classList.remove("call","put","wait");

    if(signal==="CALL"){

        badge.classList.add("call");

        text.classList.add("call");

    }else if(signal==="PUT"){

        badge.classList.add("put");

        text.classList.add("put");

    }else{

        badge.classList.add("wait");

        text.classList.add("wait");

    }

}

// ------------------------------
// Confidence Progress
// ------------------------------

function updateRealConfidence(value){

    const bar = document.getElementById("realProgress");

    if(bar){

        bar.style.width = value + "%";

    }

}

// ------------------------------
// AI Status
// ------------------------------

function setRealAIStatus(status){

    const el = document.getElementById("realAIStatus");

    if(!el) return;

    el.innerText = status;

    el.style.color =

        status === "Online"

        ? "#00ff95"

        : "#ff4d6d";

}
