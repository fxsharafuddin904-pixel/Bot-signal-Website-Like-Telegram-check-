import { GoogleGenAI } from "@google/genai";
import config from "./config.js";

// ==========================
// Gemini Client
// ==========================

const ai = new GoogleGenAI({

    apiKey: config.gemini.apiKey

});

// ==========================
// Model
// ==========================

const MODEL = "gemini-2.5-flash";

// ==========================
// Image Analysis
// ==========================

export async function analyzeChart(imageBase64, prompt) {

    try {

        const response = await ai.models.generateContent({

            model: MODEL,

            contents: [

                {
                    text: prompt
                },

                {
                    inlineData: {

                        mimeType: "image/png",

                        data: imageBase64

                    }

                }

            ]

        });

        return {

            success: true,

            result: response.text

        };

    } catch (err) {

        return {

            success: false,

            message: err.message

        };

    }

}

// ==========================
// Future Signal
// ==========================

export async function futureSignal(prompt) {

    try {

        const response = await ai.models.generateContent({

            model: MODEL,

            contents: prompt

        });

        return {

            success: true,

            result: response.text

        };

    } catch (err) {

        return {

            success: false,

            message: err.message

        };

    }

}

// ==========================
// Test API
// ==========================

export async function testGemini() {

    try {

        const response = await ai.models.generateContent({

            model: MODEL,

            contents: "Reply only: Gemini Connected"

        });

        return response.text;

    } catch {

        return "Gemini Connection Failed";

    }

          }
