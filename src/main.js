import express from "express";

import api from "./app.js";

const app = express();
const port = process.env.OLLAMA_PORT || 11435;

app.use("/", api);

const main = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Info: ${JSON.stringify(main.address())}`);
});
