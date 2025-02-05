const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use("/auth", createProxyMiddleware({ target: "http://localhost:5001", changeOrigin: true }));
app.use("/users", createProxyMiddleware({ target: "http://localhost:5002", changeOrigin: true }));
app.use("/donations", createProxyMiddleware({ target: "http://localhost:5003", changeOrigin: true }));
app.use("/tasks", createProxyMiddleware({ target: "http://localhost:5004", changeOrigin: true }));
app.use("/inventory", createProxyMiddleware({ target: "http://localhost:5005", changeOrigin: true }));

const PORT = 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
