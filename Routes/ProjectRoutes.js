const express = require("express");
const projects = require("../data/helpers/projectModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await projects.get();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description || name.length > 128) {
    res
      .status(400)
      .json({
        errorMessage:
          "Please provide a name and description for the post. *Please note, names can only be up to 128 characters long."
      })
      .end();
  } else {
    try {
      const newProject = await projects.insert(req.body);
      res.status(201).json(newProject);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await projects.get(req.params.id);
    console.log("project is: ", project);
    res.status(200).json(project);
  } catch (err) {
    res.status(404).json({ message: "The project with the specific ID does not exist." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const project = await projects.get(req.params.id);
    res.status(200).json(project);
    try {
      const count = await projects.remove(req.params.id);
      if (count !== 1) {
        res.status(404).json({ message: "The specific project could not be deleted." });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } catch (err) {
    res.status(404).json({ error: "The project with the specific ID does not exist." });
  }
});

router.put("/:id", async (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description || name.length > 128) {
    res
      .status(400)
      .json({
        errorMessage:
          "Please provide a name and description for the post. *Please note, names can only be up to 128 characters long."
      })
      .end();
  } else {
    try {
      const projectToUpdate = await projects.update(req.params.id, req.body);
      try {
        const newProject = await projects.get(req.params.id);
        res.status(200).json(newProject);
      } catch (err) {
        res.status(404).json({ message: "The specific project does not exist." });
      }
    } catch (err) {
      res.status(500).json({ message: "The project could not be modified" });
    }
  }
});

module.exports = router;
