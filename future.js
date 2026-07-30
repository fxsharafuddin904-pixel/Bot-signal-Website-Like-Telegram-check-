// ==============================
// future.js
// Fx Sharaf AI Future Signal
// Part 1
// ==============================

// ------------------------------
// Elements
// ------------------------------

const futureGenerate =
document.getElementById("generateFuture");

const futureMarket =
document.getElementById("selectedMarket");

const futureStart =
document.getElementById("startTime");

const futureEnd =
document.getElementById("endTime");

const futureLoading =
document.getElementById("futureLoading");

const futureResult =
document.getElementById("futureResult");

// ------------------------------
// Generate Future Signal
// ------------------------------

futureGenerate?.addEventListener("click", async ()=>{

    playClick();

    if(!canUseAI()) return;

    if(futureMarket.value === ""){

        showNotification("Select Market");

        return;

    }

    futureLoading.style.display = "block";

    futureResult.style.display = "none";

    try{

        const res = await fetch("/api/future/analyze",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                market:futureMarket.value,

                start:futureStart.value,

                end:futureEnd.value

            })

        });

        const data = await res.json();

        futureLoading.style.display = "none";

        futureResult.style.display = "block";

        document.getElementById(
        "futureSignal").innerText =
        data.signal || "--";

        document.getElementById(
        "futureBadge").innerText =
        data.signal || "WAIT";

        document.getElementById(
        "futureConfidence").innerText =
        (data.confidence || 0) + "%";

        document.getElementById(
        "futureReason").innerText =
        data.reason || "No Analysis";

        document.getElementById(
        "futureTime").innerText =
        data.time || "--";

        increaseUsage();

        showSuccess(
        "Future Signal Generated");

    }catch(err){

        futureLoading.style.display = "none";

        showNotification(
        "Server Error");

    }

});
// ==============================
// Future Result Tools
// Part 2
// ==============================

// ------------------------------
// Copy Result
// ------------------------------

document.getElementById("copyFuture")
?.addEventListener("click",()=>{

    const text = `
Market : ${futureMarket.value}
Signal : ${document.getElementById("futureSignal").innerText}
Confidence : ${document.getElementById("futureConfidence").innerText}
Time : ${document.getElementById("futureTime").innerText}
Reason : ${document.getElementById("futureReason").innerText}
`;

    navigator.clipboard.writeText(text);

    showSuccess("Result Copied");

});

// ------------------------------
// Telegram Send
// ------------------------------

document.getElementById("sendTelegram")
?.addEventListener("click",async()=>{

    try{

        const res = await fetch(
        "/api/telegram/send",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                market:futureMarket.value,

                signal:document.getElementById("futureSignal").innerText,

                confidence:document.getElementById("futureConfidence").innerText,

                time:document.getElementById("futureTime").innerText

            })

        });

        const data = await res.json();

        if(data.success){

            showSuccess("Telegram Sent");

        }else{

            showNotification("Telegram Failed");

        }

    }catch(err){

        showNotification("Server Error");

    }

});

// ------------------------------
// Save History
// ------------------------------

function saveFutureHistory(data){

    const history = JSON.parse(

        localStorage.getItem("futureHistory") || "[]"

    );

    history.unshift({

        market:futureMarket.value,

        signal:data.signal,

        confidence:data.confidence,

        reason:data.reason,

        time:data.time

    });

    localStorage.setItem(

        "futureHistory",

        JSON.stringify(history.slice(0,50))

    );

}

// ------------------------------
// Signal Color
// ------------------------------

function updateFutureSignalColor(signal){

    const badge =
    document.getElementById("futureBadge");

    badge.className = "badge";

    if(signal === "CALL"){

        badge.classList.add("call");

    }else if(signal === "PUT"){

        badge.classList.add("put");

    }else{

        badge.classList.add("wait");

    }

}

// ------------------------------
// Confidence Progress
// ------------------------------

function updateFutureConfidence(value){

    const bar =
    document.getElementById("futureProgress");

    if(bar){

        bar.style.width = value + "%";

    }

}

// ------------------------------
// AI Status
// ------------------------------

function setFutureAIStatus(status){

    const el =
    document.getElementById("futureAIStatus");

    if(!el) return;

    el.innerText = status;

    el.style.color =

        status === "Online"

        ? "#00ff95"

        : "#ff4d6d";

}
