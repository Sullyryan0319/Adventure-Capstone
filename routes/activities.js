const { Activity, validateActivity } = require("../models/activity");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const activities = await Activity.find();
      return res.send(activities);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id);
      if (!activity)
        return res.status(400).send(`The activity with id "${req.params.id}" does not exist.`);
      return res.send(activity);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

router.post("/", async (req, res) => {
    try {
      const { error } = validateActivity(req.body);
      if (error) return res.status(400).send(error);
  
      const activity = new Activity({
        description: req.body.description,
        participants: req.body.participants,
        price: req.body.participants
      });
  
      await activity.save();
  
      return res.send(activity);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error);
      const activity = await Activity.findByIdAndUpdate(
        req.params.id,
        {
            description: req.body.description,
            participants: req.body.participants
        },
        { new: true }
      );
      if (!activity)
        return res.status(400).send(`The activity with id "${req.params.id}" does not exist.`);
      await activity.save();
      return res.send(activity);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const activity = await Activity.findByIdAndRemove(req.params.id);
      if (!activity)
        return res
          .status(400)
          .send(`The activity with id "${req.params.id}" does not exist.`);
      return res.send(activity);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  

  module.exports = router;