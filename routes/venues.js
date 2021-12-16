const { Venue, validate } = require("../models/venue");
const { Activity, validateActivity } = require("../models/activity");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const venues = await Venue.find();
    return res.send(venues);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error); 

    const venue = new Venue({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      password: req.body.email,
      activities: req.body.activities,
      lodging: req.body.lodging,
    });

    await venue.save();

    return res.send(venue);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/:venueId/activities", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.venueId);
    if (!venue)
      return res
        .status(400)
        .send(`The venue with id "${req.params.venueId}" does not exist.`);
    const activity = new Activity({
        description: req.body.description,
        participants: req.body.participants,
        price: req.body.price
    })
    venue.activities.push(activity);
    await venue.save();
    return res.send(venue);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/:venueId/lodginOptions", async (req, res) => {
    try {
      const venue = await Venue.findById(req.params.venueId);
      if (!venue)
        return res
          .status(400)
          .send(`The venue with id "${req.params.venueId}" does not exist.`);
      const lodging = new Lodging({
          type: req.body.type,
          description: req.body.description,
          occupancy: req.body.occupancy,
          price: req.body.price
      })
      venue.lodgingOptions.push(lodging);
      await venue.save();
      return res.send(venue);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
module.exports = router;
