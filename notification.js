// ==============================
// notification.js
// Fx Sharaf AI Notifications
// Part 1
// ==============================

// ------------------------------
// Elements
// ------------------------------

const notificationBox =
document.getElementById("notification");

const notificationText =
document.getElementById("notificationText");

const successSound =
document.getElementById("successSound");

const errorSound =
document.getElementById("errorSound");

// ------------------------------
// Show Notification
// ------------------------------

function showNotification(message){

    if(!notificationBox) return;

    notificationBox.className =
    "notification error";

    notificationText.innerText =
    message;

    notificationBox.style.display =
    "flex";

    if(errorSound){

        errorSound.currentTime = 0;

        errorSound.play().catch(()=>{});

    }

    setTimeout(()=>{

        notificationBox.style.display =
        "none";

    },3000);

}

// ------------------------------
// Show Success
// ------------------------------

function showSuccess(message){

    if(!notificationBox) return;

    notificationBox.className =
    "notification success";

    notificationText.innerText =
    message;

    notificationBox.style.display =
    "flex";

    if(successSound){

        successSound.currentTime = 0;

        successSound.play().catch(()=>{});

    }

    setTimeout(()=>{

        notificationBox.style.display =
        "none";

    },2500);

               }
// ==============================
// notification.js
// Part 2
// ==============================

// ------------------------------
// Loading Notification
// ------------------------------

function showLoading(message = "Loading..."){

    if(!notificationBox) return;

    notificationBox.className =
    "notification loading";

    notificationText.innerText =
    message;

    notificationBox.style.display =
    "flex";

}

function hideLoading(){

    if(!notificationBox) return;

    notificationBox.style.display =
    "none";

}

// ------------------------------
// Confirm Dialog
// ------------------------------

function showConfirm(message, callback){

    const ok = window.confirm(message);

    if(ok && typeof callback === "function"){

        callback();

    }

}

// ------------------------------
// Toast Queue
// ------------------------------

const toastQueue = [];

let toastRunning = false;

function addToast(message, type = "success"){

    toastQueue.push({

        message,

        type

    });

    if(!toastRunning){

        runToastQueue();

    }

}

async function runToastQueue(){

    toastRunning = true;

    while(toastQueue.length){

        const item = toastQueue.shift();

        if(item.type === "success"){

            showSuccess(item.message);

        }else{

            showNotification(item.message);

        }

        await new Promise(resolve=>

            setTimeout(resolve,3000)

        );

    }

    toastRunning = false;

}

// ------------------------------
// Auto Close
// ------------------------------

function closeNotification(){

    if(notificationBox){

        notificationBox.style.display =
        "none";

    }

}

// ------------------------------
// Helper Functions
// ------------------------------

function notifyServerError(){

    showNotification(

        "Server Error"

    );

}

function notifySaved(){

    showSuccess(

        "Saved Successfully"

    );

}

function notifyDeleted(){

    showSuccess(

        "Deleted Successfully"

    );

}

function notifyCopied(){

    showSuccess(

        "Copied Successfully"

    );

}

function notifyInvalid(){

    showNotification(

        "Invalid Input"

    );

  }
