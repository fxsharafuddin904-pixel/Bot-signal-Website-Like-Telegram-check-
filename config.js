import dotenv from "dotenv";

dotenv.config();

const config = {

    app: {
        name: "Fx Sharaf AI",
        version: "1.0.0",
        port: process.env.PORT || 3000
    },

    admin: {
        email: process.env.ADMIN_EMAIL,
        licenseKey: process.env.ADMIN_LICENSE_KEY
    },

    gemini: {
        apiKey: process.env.GEMINI_API_KEY,
        model: "gemini-2.5-flash"
    },

    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
            : ""
    },

    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN,
        defaultChatId: process.env.TELEGRAM_DEFAULT_CHAT_ID
    },

    limits: {
        freeDailyLimit: Number(process.env.FREE_DAILY_LIMIT) || 5
    },

    session: {
        secret: process.env.SESSION_SECRET
    }

};

export default config;
