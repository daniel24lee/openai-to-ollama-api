const ProvidersFilePath = process.env.PROVIDERS_FILE_PATH || "config/providers.json";

import { readFileSync } from "fs";

const getProviders = () => {
    try {
        const data = readFileSync(ProvidersFilePath, "utf8");
        let json = JSON.parse(data);
        let providers = json?.providers || {};
        return providers;
    } catch (error) {
        console.error(`Error loading providers from ${ProvidersFilePath}:`, error);
        return [];
    }
}

let providers = getProviders();

export const getProvidersInfo = () => {
    const info = {};
    for (const [provider, i] of Object.entries(providers)) {
        for (let model of (i.models || [])) {
            model = model?.name || model;
            let key = `${provider}_${model}`;
            while (key in info) {
                key += "_";
            }
            info[key] = {
                provider, model
            };
        }
    }
    return info;
}

let providers_info = getProvidersInfo();

const setProviders = (newProviders) => {
    providers = newProviders;
}
const setProvidersInfo = (newProvidersInfo) => {
    providers_info = newProvidersInfo;
}

export { providers, providers_info, setProviders, setProvidersInfo };