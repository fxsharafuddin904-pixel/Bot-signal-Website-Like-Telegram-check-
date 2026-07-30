import express from "express";

import {
    loginUser,
    addUser,
    removeUser,
    getUserUsage,
    increaseUsage
} from "./auth.js";

import {
    analyzeChart,
    futureSignal,
    testGemini
} from "./gemini.js";

import {
    testTelegram,
    sendFutureSignal
} from "./telegram.js";

const router = express.Router();

// ==========================
// Login
// ==========================

router.post("/login", (req, res) => {

    const { email } = req.body;

    const result = loginUser(email);

    res.json(result);

});

// ==========================
// Add User
// ==========================

router.post("/admin/add-user", (req, res) => {

    const { email } = req.body;

    addUser(email);

    res.json({

        success: true,

        message: "User Added"

    });

});

// ==========================
// Remove User
// ==========================

router.post("/admin/remove-user", (req, res) => {

    const { email } = req.body;

    removeUser(email);

    res.json({

        success: true,

        message: "User Removed"

    });

});

// ==========================
// Usage
// ==========================

router.post("/usage", (req, res) => {

    const { email } = req.body;

    const used = increaseUsage(email);

    res.json({

        success: true,

        used

    });

});

router.get("/usage/:email", (req, res) => {

    const used = getUserUsage(

        req.params.email

    );

    res.json({

        success: true,

        used

    });

});

// ==========================
// Gemini Test
// ==========================

router.get("/gemini/test", async (req, res) => {

    const result = await testGemini();

    res.json({

        success: true,

        result

    });

});

// ==========================
// Image Analysis
// ==========================

router.post("/analyze", async (req, res) => {

    const {

        image,

        prompt

    } = req.body;

    const result = await analyzeChart(

        image,

        prompt

    );

    res.json(result);

});

// ==========================
// Future Signal
// ==========================

router.post("/future", async (req, res) => {

    const {

        prompt

    } = req.body;

    const result = await futureSignal(

        prompt

    );

    res.json(result);

});

// ==========================
// Telegram Test
// ==========================

router.post("/telegram/test", async (req, res) => {

    const {

        botToken,

        chatId

    } = req.body;

    const result = await testTelegram(

        botToken,

        chatId

    );

    res.json(result);

});

// ==========================
// Telegram Future Signal
// ==========================

router.post("/telegram/send", async (req, res) => {

    const {

        botToken,

        chatId,

        market,

        signal,

        time,

        confidence

    } = req.body;

    const result = await sendFutureSignal(

        botToken,

        chatId,

        market,

        signal,

        time,

        confidence

    );

    res.json(result);

});

export default router;
