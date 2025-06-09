// POST /api/chat
// https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion

import { generateResponse } from "#root/src/api/core.js";
import { providers_info } from "#root/src/api/providers.js";
import { convertMessages } from "#root/src/api/messages.js";

export async function v1_chat_completions_endpoint(req, res) {
    try {
        let reqBody = req.body;
        let messages = reqBody.messages, model = reqBody.model;

        // Validate request
        if (!model || !messages || !Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({ error: "Invalid request format" });
        }

        if (!providers_info[model]) {
            return res.status(400).json({ error: "Model not found" });
        }

        // Convert messages to standard OpenAI format
        messages = convertMessages(messages);

        // Generate and return response
        const response = await generateResponse(model, messages);
        const stream = reqBody.stream || true;

        if (stream) {
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Connection", "keep-alive");

            for await (const chunk of response) {
                const json = {
                    "model": model,
                    "created_at": Date.now().toString(),
                    "message": {
                        "role": "assistant",
                        "content": chunk,
                    },
                    "done": false,
                };
                res.write(`${JSON.stringify(json)}\n\n`);
            }
            const finalJson = {
                "model": model,
                "created_at": Date.now().toString(),
                "message": {
                    "role": "assistant",
                    "content": "",
                },
                "done": true,
                "done_reason": "stop",
                ...fakeEvalData
            };
            res.write(`${JSON.stringify(finalJson)}\n\n`);
            res.end();
        } else {
            const result = [];
            for await (const chunk of response) {
                result.push(chunk);
            }
            const json = {
                "model": model,
                "created_at": Date.now().toString(),
                "message": {
                    "role": "assistant",
                    "content": result.join(""),
                },
                "done": true,
                "done_reason": "stop",
                ...fakeEvalData
            };
            res.json(json);
        }

    } catch (error) {
        console.log("Error:", error);
        if (!res.headersSent) {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

const fakeEvalData = {
    "total_duration": 8497226791,
    "load_duration": 1747193958,
    "prompt_eval_count": 24,
    "prompt_eval_duration": 269219750,
    "eval_count": 247,
    "eval_duration": 6413802458,
};