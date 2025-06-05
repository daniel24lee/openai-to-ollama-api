import OpenAI from 'openai';
import { providers, providers_info } from "#root/src/api/providers.js";

async function* generate(provider, model, messages) {
    let providerInfo = providers[provider];
    const client = new OpenAI({
        apiKey: providerInfo.apiKey,
        baseURL: providerInfo.baseURL,
    });

    const payload = {
        messages: messages,
        model: model,
        stream: providerInfo.stream,
        ...providerInfo.options
    };

    const response = await client.chat.completions.create(payload);

    if (!payload.stream) {
        yield response.choices[0].message.content;
    }
    else {
        for await (const chunk of response) {
            yield chunk.choices[0].delta.content;
        }
    }
}

export function generateResponse(modelString, messages) {
    const { provider, model } = providers_info[modelString];
    return generate(provider, model, messages);
}