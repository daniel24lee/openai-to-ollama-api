import { GoogleGenAI } from '@google/genai';

export async function* generate(provider, model, messages) {
    const client = new GoogleGenAI({
        apiKey: provider.apiKey,
        // baseUrl is ignored for Gemini
    });

    const response = await client.models.generateContentStream({
        model: model,
        config: {
            ...(provider?.options || {}),
        },
        contents: toContents(messages),
    });

    for await (const chunk of response) {
        if (chunk?.text) {
            yield chunk.text;
        }
    }
}

function toRole(role) {
    switch (role) {
        case 'user':
        case 'system':
            return 'user';
        case 'assistant':
        case 'model':
            return 'model';
        default:
            return 'user';
    }
}

function toContents(messages) {
    return messages.map((message) => {
        console.log(message);
        return { role: toRole(message.role), parts: [{ text: message.content }] };
    });
}

export async function models(provider) {
    const client = new GoogleGenAI({
        apiKey: provider.apiKey,
        // baseUrl is ignored for Gemini
    });
    let pager = await client.models.list(); // type: Pager<Model>
    let models = [];
    for await (const model of pager) {
        models.push({
            name: model.name,
        });
    }
    return models;
}