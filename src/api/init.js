import { providers, setProvidersInfo } from "#root/src/api/providers.js";
import { getProvidersInfo } from "#root/src/api/providers.js";
import { getModels } from "#root/src/api/core.js";

export async function initProviders() {
    for (const provider of Object.values(providers)) {
        if (!provider) continue;
        provider.models = provider.models || [];
        if (provider.models.length === 0 || provider.autoFetchModels) {
            provider.models = await getModels(provider);
        }
    }

    // fetch providers info
    setProvidersInfo(getProvidersInfo());
}