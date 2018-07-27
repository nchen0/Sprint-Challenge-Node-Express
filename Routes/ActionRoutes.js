const express = require("express");
const actions = require("../data/helpers/actionModel.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const list = await actions.get();
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { project_id, notes, description, completed } = req.body;
  if (!project_id || !description || description.length > 128) {
    res
      .status(400)
      .json({
        errorMessage:
          "Please provide a project id and description for the post. *Please note, descriptions can only be up to 128 characters long."
      })
      .end();
  } else {
    try {
      const newActions = await actions.insert(req.body);
      res.status(201).json(newActions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
});

router.get("/:id", async (req, res) => {
  try {
    const action = await actions.get(req.params.id);
    console.log("action is: ", action);
    res.status(200).json(action);
  } catch (err) {
    res.status(404).json({ message: "The action with the specific ID does not exist." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const action = await actions.get(req.params.id);
    res.status(200).json(action);
    try {
      const count = await actions.remove(req.params.id);
      if (count !== 1) {
        res.status(404).json({ message: "The specific action could not be deleted." });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } catch (err) {
    res.status(404).json({ error: "The action with the specific ID does not exist." });
  }
});

router.put("/:id", async (req, res) => {
  const { project_id, notes, description, completed } = req.body;
  if (!project_id || !description || description.length > 128) {
    res
      .status(400)
      .json({
        errorMessage:
          "Please provide a project id and description for the post. *Please note, descriptions can only be up to 128 characters long."
      })
      .end();
  } else {
    try {
      const actionToUpdate = await actions.update(req.params.id, req.body);
      try {
        const newAction = await actions.get(req.params.id);
        res.status(200).json(newAction);
      } catch (err) {
        res.status(404).json({ message: "The specific action does not exist." });
      }
    } catch (err) {
      res.status(500).json({ message: "The action could not be modified." });
    }
  }
});

module.exports = router;
