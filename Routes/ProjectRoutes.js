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

module.exports = router;
