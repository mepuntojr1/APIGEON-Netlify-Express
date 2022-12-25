const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
//require("dotenv").config();
  
// Create Express Server
const app = express();
  
// Configuration
const PORT = 3000;
const HOST = "localhost";
//const { API_BASE_URL } = process.env;
//const { API_KEY_VALUE } = process.env;
const API_SERVICE_URL = `https://apigeon-prod1.c1-asia-se.altogic.com`;
  
// Logging the requests
app.use(morgan("dev"));
  
// Proxy Logic :  Proxy endpoints
app.use(
    "/spam-checker/v1",
    createProxyMiddleware({
        target: API_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
            "^/spam-checker/v1": "/spam-checker/v1",
        },
    })
);
  
// Starting our Proxy server
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
