import fs from "fs";

const USERS_FILE = "./users.json";
const USAGE_FILE = "./usage.json";
const SETTINGS_FILE = "./settings.json";
const MARKETS_FILE = "./markets.json";

// ==========================
// Read JSON
// ==========================

export function readJSON(file) {

    try {

        if (!fs.existsSync(file)) {

            fs.writeFileSync(file, "{}");

        }

        const data = fs.readFileSync(file, "utf8");

        return JSON.parse(data || "{}");

    } catch (err) {

        console.error("Read Error:", err);

        return {};

    }

}

// ==========================
// Write JSON
// ==========================

export function writeJSON(file, data) {

    try {

        fs.writeFileSync(

            file,

            JSON.stringify(data, null, 4)

        );

        return true;

    } catch (err) {

        console.error("Write Error:", err);

        return false;

    }

}

// ==========================
// Users
// ==========================

export function getUsers() {

    return readJSON(USERS_FILE);

}

export function saveUsers(data) {

    return writeJSON(USERS_FILE, data);

}

// ==========================
// Usage
// ==========================

export function getUsage() {

    return readJSON(USAGE_FILE);

}

export function saveUsage(data) {

    return writeJSON(USAGE_FILE, data);

}

// ==========================
// Settings
// ==========================

export function getSettings() {

    return readJSON(SETTINGS_FILE);

}

export function saveSettings(data) {

    return writeJSON(SETTINGS_FILE, data);

}

// ==========================
// Markets
// ==========================

export function getMarkets() {

    return readJSON(MARKETS_FILE);

}

export function saveMarkets(data) {

    return writeJSON(MARKETS_FILE, data);

          }
