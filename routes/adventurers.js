const { Adventurer, validate } = require("../models/adventurer");
const { Activity} = require("../models/activity");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const adventurers = await Adventurer.find();
    return res.send(adventurers);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const adventurer = await Adventurer.findById(req.params.id);
    if (!adventurer)
      return res.status(400).send(`The adventurer with id "${req.params.id}" d
 oes not exist.`);
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const adventurer = new Adventurer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.email,
      activityList: req.body.activityList,
      lodging: req.body.lodging
    });

    await adventurer.save();

    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/adventurers/:id/activitylist/:id", async (req, res) => {
  try {
    const adventurer = await Adventurer.findById(req.params.userId);
    if (!adventurer)
      return res
        .status(400)
        .send(`The adventurer with id "${req.params.userId}" does not exist.`);
    const activity = await Activity.findById(req.params.activityId);
    if (!activity)
      return res
        .status(400)
        .send(`The activity with id "${req.params.productId}" does not exist.`);
    user.activityList.push(activity);
    await adventurer.save();
    return res.send(adventurer.activityList);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const adventurer = await Adventurer.findByIdAndUpdate(
      req.params.id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      { new: true }
    );
    if (!adventurer)
      return res.status(400).send(`The adventurer with id "${req.params.id}" d
 oes not exist.`);
    await adventurer.save();
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const adventurer = await Adventurer.findByIdAndRemove(req.params.id);
    if (!adventurer)
      return res
        .status(400)
        .send(`The adventurer with id "${req.params.id}" does not exist.`);
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
