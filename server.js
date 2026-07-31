import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import config from "./config.js";
import routes from "./routes.js";

dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==========================
// Middleware
// ==========================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// ==========================
// Frontend Files
// ==========================

app.use(express.static(__dirname));

// ==========================
// API Routes
// ==========================

app.use("/api", routes);

// ==========================
// Dashboard
// ==========================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "index.html")
    );

});

// ==========================
// Login
// ==========================

app.get("/login", (req, res) => {

    res.sendFile(
        path.join(__dirname, "login.html")
    );

});

// ==========================
// Admin
// ==========================

app.get("/admin", (req, res) => {

    res.sendFile(
        path.join(__dirname, "admin.html")
    );

});

// ==========================
// 404
// ==========================

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Page Not Found"

    });

});

// ==========================
// Start Server
// ==========================

const PORT = process.env.PORT || config.app.port;

app.listen(PORT, () => {

    console.log("");

    console.log("===================================");

    console.log("🚀 Fx Sharaf AI Started");

    console.log("🌐 Running on Port: " + PORT);

    console.log("===================================");

});
