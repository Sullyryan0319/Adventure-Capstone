const { Adventurer, validate } = require("../models/adventurer");
const { Activity } = require("../models/activity");
const { Venue } = require("../models/venue");
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');
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

router.get("/:id", auth, async (req, res) => {
  try {
    const adventurer = await Adventurer.findById(req.params.id);
    if (!adventurer)
      return res
        .status(400)
        .send(`The adventurer with id "${req.params.id}" does not exist.`);
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error);

//     const salt = await bcrypt.genSalt(10);

//     const adventurer = new Adventurer({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: await bcrypt.hash(req.body.password, salt),
//       activityList: req.body.activityList,
//       lodging: req.body.lodging,
//     });

//     await adventurer.save();

//     return res.send(adventurer);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let adventurer = await Adventurer.findOne({ email: req.body.email });
    if (adventurer)
      return res.status(400).send("Adventurer already registered.");
          const salt = await bcrypt.genSalt(10);
    adventurer = new Adventurer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      activityList: req.body.activityList,
      lodging: req.body.lodging,
    });
    await adventurer.save();
    const token = adventurer.generateAuthToken();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(token);
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
      return res
        .status(400)
        .send(`The adventurer with id "${req.params.id}" does not exist.`);
    await adventurer.save();
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id/activityList/:venueId/:activityId", async (req, res) => {
  try {
    const adventurer = await Adventurer.findById(req.params.id);
    if (!adventurer)
      return res
        .status(400)
        .send(`The adventurer with id "${req.params.id}" does not exist.`);
    adventurer.activityList.push(req.params.activityId);

    await adventurer.save();
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id/activityList/:activityId", async (req, res) => {
  try {
    const adventurer = await Adventurer.findById(req.params.id);
    if (!adventurer)
      return res
        .status(400)
        .send(`The adventurer with id "${req.params.id}" does not exist.`);
    adventurer.activityList.push(req.params.activityId);

    await adventurer.save();
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id/lodging/:lodgingId", async (req, res) => {
  try {
    const adventurer = await Adventurer.findById(req.params.id);
    if (!adventurer)
      return res
        .status(400)
        .send(`The adventurer with id "${req.params.id}" does not exist.`);
    adventurer.lodging.push(req.params.lodgingId);

    await adventurer.save();
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id/lodging/:venueId/:lodgingId", async (req, res) => {
  try {
    const adventurer = await Adventurer.findById(req.params.id);
    if (!adventurer)
      return res
        .status(400)
        .send(`The adventurer with id "${req.params.id}" does not exist.`);
    adventurer.lodging.push(req.params.lodgingId);

    await adventurer.save();
    return res.send(adventurer);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id", auth, async (req, res) => {
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
