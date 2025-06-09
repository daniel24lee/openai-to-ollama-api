import { generate as openai, models as openai_models } from "#root/src/api/providers/openai.js";
import { generate as gemini, models as gemini_models } from "#root/src/api/providers/gemini.js";
import { providers, providers_info } from "#root/src/api/providers.js";

export function generateResponse(modelString, messages) {
    const { provider: providerString, model } = providers_info[modelString];
    const provider = providers[providerString];
    switch ((provider?.type || "openai").toLowerCase()) {
        case "openai":
            return openai(provider, model, messages);
        case "gemini":
            return gemini(provider, model, messages);
        default:
            throw new Error(`Unknown provider type: ${provider?.type}`);
    }
}

export async function getModels(provider) {
    switch ((provider?.type || "openai").toLowerCase()) {
        case "openai":
            return openai_models(provider);
        case "gemini":
            return gemini_models(provider);
        default:
            throw new Error(`Unknown provider type: ${provider?.type}`);
    }
}