import config from "./config.js";

// ==========================
// Admin Check
// ==========================

export function isAdmin(req, res, next) {

    const email = req.headers["x-user-email"];

    if (!email) {

        return res.status(401).json({

            success: false,
            message: "Login Required"

        });

    }

    if (email !== config.admin.email) {

        return res.status(403).json({

            success: false,
            message: "Admin Access Only"

        });

    }

    next();

}

// ==========================
// Login Check
// ==========================

export function isLoggedIn(req, res, next) {

    const email = req.headers["x-user-email"];

    if (!email) {

        return res.status(401).json({

            success: false,
            message: "Please Login First"

        });

    }

    next();

}

// ==========================
// Daily Limit Check
// ==========================

export function checkDailyLimit(count) {

    return count < config.limits.freeDailyLimit;

}
