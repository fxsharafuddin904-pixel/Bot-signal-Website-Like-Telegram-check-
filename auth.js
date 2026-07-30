import config from "./config.js";
import {
    getUsers,
    saveUsers,
    getUsage,
    saveUsage
} from "./database.js";

// ==========================
// Login
// ==========================

export function loginUser(email) {

    const users = getUsers();

    if (email === config.admin.email) {

        return {

            success: true,
            role: "admin",
            message: "Admin Login Successful"

        };

    }

    if (!users[email]) {

        return {

            success: false,
            message: "This Gmail is not authorized."

        };

    }

    return {

        success: true,
        role: "user",
        message: "Login Successful"

    };

}

// ==========================
// Add User
// ==========================

export function addUser(email) {

    const users = getUsers();

    users[email] = {

        active: true,
        createdAt: new Date().toISOString()

    };

    saveUsers(users);

    return true;

}

// ==========================
// Remove User
// ==========================

export function removeUser(email) {

    const users = getUsers();

    delete users[email];

    saveUsers(users);

    return true;

}

// ==========================
// Daily Usage
// ==========================

export function getUserUsage(email) {

    const usage = getUsage();

    return usage[email] || 0;

}

export function increaseUsage(email) {

    const usage = getUsage();

    if (!usage[email]) {

        usage[email] = 0;

    }

    usage[email]++;

    saveUsage(usage);

    return usage[email];

}

// ==========================
// Reset Usage
// ==========================

export function resetUsage(email) {

    const usage = getUsage();

    usage[email] = 0;

    saveUsage(usage);

}
