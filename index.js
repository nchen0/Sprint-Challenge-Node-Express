const express = require("express");

// Routes
const projectRoutes = require("./Routes/ProjectRoutes");
const actionRoutes = require("./Routes/ActionRoutes");

// Middleware
const server = express();
const cors = require("cors");
server.use(express.json());
server.use(cors());

// Routing Middleware
server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionRoutes);

// Error Handling
server.use((req, res) => {
  res.status(404).send("This route does not exist.");
});

server.listen(8000, () => console.log("API is running on port 8000"));
