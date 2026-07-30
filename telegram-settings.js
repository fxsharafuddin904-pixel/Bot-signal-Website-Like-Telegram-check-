// ==========================
// telegram-settings.js
// ==========================

const BOT_KEY = "telegramBotToken";
const CHAT_KEY = "telegramChatId";

// ==========================
// Save Settings
// ==========================

export function saveTelegramSettings(botToken, chatId) {

    localStorage.setItem(BOT_KEY, botToken);

    localStorage.setItem(CHAT_KEY, chatId);

    return true;

}

// ==========================
// Get Settings
// ==========================

export function getTelegramSettings() {

    return {

        botToken:
            localStorage.getItem(BOT_KEY) || "",

        chatId:
            localStorage.getItem(CHAT_KEY) || ""

    };

}

// ==========================
// Clear Settings
// ==========================

export function clearTelegramSettings() {

    localStorage.removeItem(BOT_KEY);

    localStorage.removeItem(CHAT_KEY);

}

// ==========================
// Validate
// ==========================

export function validateTelegramSettings() {

    const settings = getTelegramSettings();

    return (

        settings.botToken.trim() !== "" &&

        settings.chatId.trim() !== ""

    );

}

// ==========================
// Load Into Form
// ==========================

export function loadTelegramSettings() {

    const settings = getTelegramSettings();

    const botInput =
        document.getElementById("botToken");

    const chatInput =
        document.getElementById("chatId");

    if (botInput) {

        botInput.value = settings.botToken;

    }

    if (chatInput) {

        chatInput.value = settings.chatId;

    }

}

// ==========================
// Auto Load
// ==========================

window.addEventListener("DOMContentLoaded", () => {

    loadTelegramSettings();

});
