import express from "express";

// endpoints
import { v1_models_endpoint, v1_show_endpoint } from "./endpoints/v1/models.js";
import { v1_chat_completions_endpoint } from "./endpoints/v1/chat_completions.js";

// middleware (WIP)
import { middleware_null } from "#root/src/middleware/middleware.js";
import morgan from "morgan";

// Init
import { initProviders } from "#root/src/api/init.js";
await initProviders();

const app = express.Router();
app.use(express.json());

app.use(morgan("dev")); // Logging middleware

// Register endpoint
const endpoint = (method, path, middleware, handler) => {
  path = (process.env.ENDPOINT_PREFIX || "") + path;
  app[method](path, middleware, handler);
};

// Root
const root_message = "raycast-custom-apis running <br> https://github.com/XInTheDark/raycast-custom-apis";
endpoint("get", "/", middleware_null, (req, res) => {
  res.send(root_message);
});

// models endpoint
endpoint("get", "/api/tags", middleware_null, v1_models_endpoint);
endpoint("post", "/api/show", middleware_null, v1_show_endpoint);

// chat completions endpoint
endpoint("post", "/api/chat", middleware_null, v1_chat_completions_endpoint);

export default app;
