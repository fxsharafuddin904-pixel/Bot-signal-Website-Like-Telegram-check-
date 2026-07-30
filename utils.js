// ==============================
// utils.js
// Fx Sharaf AI Utilities
// Part 1
// ==============================

// ------------------------------
// Random ID
// ------------------------------

function generateId(prefix = "FX"){

    return `${prefix}-${Date.now()}-${Math.floor(Math.random()*10000)}`;

}

// ------------------------------
// Format Date
// ------------------------------

function formatDate(date = new Date()){

    return new Date(date).toLocaleDateString();

}

// ------------------------------
// Format Time
// ------------------------------

function formatTime(date = new Date()){

    return new Date(date).toLocaleTimeString([],{

        hour:"2-digit",

        minute:"2-digit",

        second:"2-digit"

    });

}

// ------------------------------
// Copy Text
// ------------------------------

async function copyText(text){

    try{

        await navigator.clipboard.writeText(text);

        showSuccess("Copied Successfully");

    }catch(err){

        showNotification("Copy Failed");

    }

}

// ------------------------------
// Download JSON
// ------------------------------

function downloadJSON(filename,data){

    const blob = new Blob(

        [JSON.stringify(data,null,2)],

        {type:"application/json"}

    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}

// ------------------------------
// Sleep Helper
// ------------------------------

function sleep(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}
// ==============================
// utils.js
// Part 2 (Final)
// ==============================

// ------------------------------
// Debounce
// ------------------------------

function debounce(fn, delay = 300){

    let timer;

    return function(...args){

        clearTimeout(timer);

        timer = setTimeout(()=>{

            fn.apply(this,args);

        },delay);

    };

}

// ------------------------------
// Throttle
// ------------------------------

function throttle(fn, limit = 300){

    let waiting = false;

    return function(...args){

        if(waiting) return;

        fn.apply(this,args);

        waiting = true;

        setTimeout(()=>{

            waiting = false;

        },limit);

    };

}

// ------------------------------
// LocalStorage Helpers
// ------------------------------

function saveStorage(key,value){

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function loadStorage(key,defaultValue=null){

    try{

        const data = localStorage.getItem(key);

        return data

            ? JSON.parse(data)

            : defaultValue;

    }catch{

        return defaultValue;

    }

}

function removeStorage(key){

    localStorage.removeItem(key);

}

// ------------------------------
// API Helper
// ------------------------------

async function apiRequest(url,options={}){

    const res = await fetch(url,options);

    if(!res.ok){

        throw new Error("API Request Failed");

    }

    return await res.json();

}

// ------------------------------
// Validation
// ------------------------------

function isEmail(email){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

}

function isEmpty(value){

    return value == null ||

        value.toString().trim()==="";

}

// ------------------------------
// Utilities
// ------------------------------

function randomNumber(min,max){

    return Math.floor(

        Math.random()*(max-min+1)

    ) + min;

}

function capitalize(text=""){

    return text.charAt(0).toUpperCase()

        + text.slice(1);

}

// ==============================
// End of utils.js
// ==============================

console.log(

"utils.js Loaded Successfully"

);
