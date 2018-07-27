const express = require("express");

// Routes
const projectRoutes = require("./Routes/ProjectRoutes");

// Middleware
const server = express();
server.use(express.json());

// Routing Middleware
server.use("/api/projects", projectRoutes);

// Error Handling

server.listen(8000, () => console.log("API is running on port 8000"));
