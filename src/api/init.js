import { providers, setProvidersInfo } from "#root/src/api/providers.js";
import { getProvidersInfo } from "#root/src/api/providers.js";

import OpenAI from "openai";

export async function initProviders() {
    for (const provider of Object.values(providers)) {
        if (!provider) continue;
        provider.models = provider.models || [];
        if (provider.models.length === 0 || provider.autoFetchModels) {
            const openai = new OpenAI({
                apiKey: provider.apiKey,
                baseURL: provider.baseURL,
            });
            // fetch models
            provider.models = await openai.models.list();
            provider.models = provider.models.data.map((model) => {
                return {
                    name: model.id,
                };
            });
        }
    }

    // fetch providers info
    setProvidersInfo(getProvidersInfo());
}