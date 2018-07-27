const express = require("express");

// Routes
const projectRoutes = require("./Routes/ProjectRoutes");

// Middleware
const server = express();
server.use(express.json());

// Routing Middleware
server.use("/api/projects", projectRoutes);

// Error Handling
server.use((req, res) => {
  res.status(404).send("This route does not exist.");
});

server.listen(8000, () => console.log("API is running on port 8000"));
