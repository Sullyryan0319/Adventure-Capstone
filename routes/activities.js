const { Activity, validateActivity } = require("../models/activity");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
      const { error } = validateActivity(req.body);
      if (error) return res.status(400).send(error);
  
      const activity = new Activity({
        description: req.body.description,
        participants: req.body.participants
      });
  
      await activity.save();
  
      return res.send(activity);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  module.exports = router;