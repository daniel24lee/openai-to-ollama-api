import OpenAI from "openai";

export async function* generate(provider, model, messages) {
    const client = new OpenAI({
        apiKey: provider.apiKey,
        baseURL: provider.baseURL,
    });

    const payload = {
        messages: messages,
        model: model,
        stream: provider.stream,
        ...provider.options
    };

    const response = await client.chat.completions.create(payload);

    if (!payload.stream) {
        yield response.choices[0].message.content;
    } else {
        for await (const chunk of response) {
            yield chunk.choices[0].delta.content;
        }
    }
}

export async function models(provider) {
    const client = new OpenAI({
        apiKey: provider.apiKey,
        baseURL: provider.baseURL,
    });
    let m = await client.models.list();
    m = m.data.map((model) => {
        return {
            name: model.id,
        };
    });
    return m;
}
