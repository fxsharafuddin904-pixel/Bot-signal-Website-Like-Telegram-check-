// ==============================
// otc.js
// Fx Sharaf AI OTC Analyzer
// Part 1
// ==============================

// ------------------------------
// Elements
// ------------------------------

const otcUpload =
document.getElementById("otcImage");

const otcAnalyze =
document.getElementById("analyzeOTC");

const otcPreview =
document.getElementById("otcPreview");

const otcLoading =
document.getElementById("otcLoading");

const otcResult =
document.getElementById("otcResult");

// ------------------------------
// Preview
// ------------------------------

otcUpload?.addEventListener("change",(e)=>{

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = (ev)=>{

        otcPreview.src = ev.target.result;

        otcPreview.style.display = "block";

    };

    reader.readAsDataURL(file);

    playClick();

});

// ------------------------------
// Analyze Chart
// ------------------------------

otcAnalyze?.addEventListener("click",async()=>{

    if(!canUseAI()) return;

    if(!otcUpload.files.length){

        showNotification(
        "Please upload a chart");

        return;

    }

    otcLoading.style.display = "block";
    otcResult.style.display = "none";

    const formData = new FormData();

    formData.append(
        "image",
        otcUpload.files[0]
    );

    try{

        const res = await fetch(
        "/api/otc/analyze",
        {
            method:"POST",
            body:formData
        });

        const data = await res.json();

        otcLoading.style.display = "none";
        otcResult.style.display = "block";

        document.getElementById(
        "otcSignal").innerText =
        data.signal || "--";

        document.getElementById(
        "otcSignalBadge").innerText =
        data.signal || "WAIT";

        document.getElementById(
        "otcConfidence").innerText =
        (data.confidence || 0) + "%";

        document.getElementById(
        "otcReason").innerText =
        data.reason || "No analysis available.";

        increaseUsage();

        showSuccess(
        "OTC Analysis Complete");

    }catch(err){

        otcLoading.style.display = "none";

        showNotification(
        "Analysis Failed");

    }

});
// ==============================
// OTC Result Tools
// Part 2
// ==============================

// ------------------------------
// Copy Result
// ------------------------------

document.getElementById("copyOTC")
?.addEventListener("click",()=>{

    const text = `
Market : OTC
Signal : ${document.getElementById("otcSignal").innerText}
Confidence : ${document.getElementById("otcConfidence").innerText}
Reason : ${document.getElementById("otcReason").innerText}
`;

    navigator.clipboard.writeText(text);

    showSuccess("Result Copied");

});

// ------------------------------
// Reset Analyzer
// ------------------------------

document.getElementById("newOTC")
?.addEventListener("click",()=>{

    otcUpload.value = "";

    otcPreview.src = "";

    otcPreview.style.display = "none";

    otcResult.style.display = "none";

    otcLoading.style.display = "none";

    playClick();

});

// ------------------------------
// Save History
// ------------------------------

function saveOTCHistory(data){

    const history = JSON.parse(

        localStorage.getItem("otcHistory") || "[]"

    );

    history.unshift({

        market:"OTC",

        signal:data.signal,

        confidence:data.confidence,

        reason:data.reason,

        time:new Date().toLocaleString()

    });

    localStorage.setItem(

        "otcHistory",

        JSON.stringify(history.slice(0,50))

    );

}

// ------------------------------
// Signal Color
// ------------------------------

function updateOTCSignalColor(signal){

    const badge = document.getElementById("otcSignalBadge");

    const text = document.getElementById("otcSignal");

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

function updateOTCConfidence(value){

    const bar = document.getElementById("otcProgress");

    if(bar){

        bar.style.width = value + "%";

    }

}

// ------------------------------
// AI Status
// ------------------------------

function setOTCAIStatus(status){

    const el = document.getElementById("otcAIStatus");

    if(!el) return;

    el.innerText = status;

    el.style.color =

        status === "Online"

        ? "#00ff95"

        : "#ff4d6d";

         }
