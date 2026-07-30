import fetch from "node-fetch";

// ==========================
// Send Telegram Message
// ==========================

export async function sendTelegramMessage(

    botToken,

    chatId,

    message

) {

    try {

        const url =

`https://api.telegram.org/bot${botToken}/sendMessage`;

        const response = await fetch(url, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                chat_id: chatId,

                text: message,

                parse_mode: "HTML"

            })

        });

        const data = await response.json();

        return data;

    }

    catch (err) {

        return {

            ok: false,

            error: err.message

        };

    }

}

// ==========================
// Test Telegram
// ==========================

export async function testTelegram(

    botToken,

    chatId

) {

    const message = `

🧪 <b>TEST SIGNAL</b>

━━━━━━━━━━━━━━━

📊 Market : EUR/USD OTC

📈 Signal : CALL

⏰ Time : 12:30

━━━━━━━━━━━━━━━

⚠️ NO TRADE

This is a Test Post Only.

━━━━━━━━━━━━━━━

🤖 Fx Sharaf AI

`;

    return await sendTelegramMessage(

        botToken,

        chatId,

        message

    );

}

// ==========================
// Send Future Signal
// ==========================

export async function sendFutureSignal(

    botToken,

    chatId,

    market,

    signal,

    time,

    confidence

) {

    const message = `

🚀 <b>FUTURE SIGNAL</b>

━━━━━━━━━━━━━━━

📊 Market : ${market}

📈 Signal : ${signal}

⏰ Time : ${time}

🎯 Confidence : ${confidence}

━━━━━━━━━━━━━━━

🤖 Fx Sharaf AI

`;

    return await sendTelegramMessage(

        botToken,

        chatId,

        message

    );

}
