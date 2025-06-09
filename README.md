A simple, lightweight OpenAI to Ollama API adapter.

You can configure multiple API endpoints, and this API server will handle requests for you. 
Currently we support **OpenAI** and **Gemini** API endpoints.
  - expanded support for almost any provider is coming soon!

The API implements several important Ollama API endpoints:
- `/api/tags`
- `/api/show`
- `/api/chat`

## Getting started
```bash
npm install
npm run start
```

### Guides
Check out the [Wiki](https://github.com/XInTheDark/openai-to-ollama-api/wiki) for quickstarts.

## Configuration
### JSON config
The main configuration file is `config/providers.json`. It defines the OpenAI API endpoints you want to use. Each provider can have its own settings.

#### To get started:
1. Go to `config/`
2. Rename `providers.json.default` to `providers.json`
3. Edit `providers.json` to add your API endpoints

#### Fields
- type: Optional, defaults to `openai`. Use this to specify the type of provider.
  - Supported types: `openai`, `gemini`.
- baseURL
- apiKey
- models: Optional. Use this to hardcode the models you want to use.
- autoFetchModels: Boolean. If true, the server will automatically fetch models from the OpenAI API. If you didn't specify `models`, then this must be true.
- options: Additional options to pass during requests to the OpenAI API.
  - [available options for Gemini provider](https://googleapis.github.io/js-genai/release_docs/interfaces/types.GenerateContentConfig.html) 

### Environment Variables
```env
OLLAMA_PORT=11435 # Port to run on
```