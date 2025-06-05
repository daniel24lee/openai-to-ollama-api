import { getAPIKey } from "#root/src/helpers/auth.js";
import { readFileSync } from "fs";

// Read API Keys info from file
let VALID_API_KEYS = {};
const VALID_API_KEYS_FILE = process.env.VALID_API_KEYS_FILE || `${process.cwd()}/valid_api_keys.json`;
try {
  const data = readFileSync(VALID_API_KEYS_FILE, "utf8");
  VALID_API_KEYS = JSON.parse(data);
} catch (error) {
  console.log(`Error loading API Keys from ${VALID_API_KEYS_FILE}: ${error}`);
}
export { VALID_API_KEYS };

// Validate API Key
export const validateAPIKey = async (req, res) => {
  if (["development", "free"].includes(process.env.NODE_ENV)) {
    // Skip API key validation in development and free mode
    return;
  }

  const apiKey = getAPIKey(req);
  if (!apiKey) {
    throw res.status(401).json({ error: "Missing API key" });
  }

  const valid = !!VALID_API_KEYS[apiKey];
  if (!valid) {
    throw res.status(401).json({ error: "Invalid API key" });
  }
};
