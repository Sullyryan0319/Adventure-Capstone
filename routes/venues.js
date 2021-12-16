const { Venue, validate } = require("../models/venue");
const { Activity, validateActivity } = require("../models/activity");
const { Lodging, validateLodging } = require("../models/lodging");
const { Review, validateReview } = require("../models/review");
const bcrypt = require('bcrypt');
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

router.get("/:id", async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id);
    if (!venue)
      return res
        .status(400)
        .send(`The venue with id "${req.params.id}" does not exist.`);
    return res.send(venue);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const salt = await bcrypt.genSalt(10);

    const venue = new Venue({
      name: req.body.name,
      description: req.body.description,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
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
      price: req.body.price,
    });
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
      price: req.body.price,
    });
    venue.lodgingOptions.push(lodging);
    await venue.save();
    return res.send(venue);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateVenue(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let venue = await Venue.findOne({ email: req.body.email });
    if (venue) return res.status(400).send("Venue already registered.");
    venue = new Venue({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await venue.save();
    return res.send({ _id: venue._id, name: venue.name, email: venue.email });
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


// router.post("/:venueId/lodginOptions/reviews", async (req, res) => {
//   try {
//     const venue = await Venue.findById(req.params.venueId);
//     if (!venue)
//       return res
//         .status(400)
//         .send(`The venue with id "${req.params.venueId}" does not exist.`);
//     const lodging = new Lodging({
//       type: req.body.type,
//       description: req.body.description,
//       occupancy: req.body.occupancy,
//       price: req.body.price,
//     });
//     venue.lodgingOptions.push(lodging);
//     await venue.save();
//     return res.send(venue);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });

// router.post("/:venueId/activities/:activityId/reviews", async (req, res) => {
//   try {
//     const venue = await Venue.findById(req.params.venueId);
//     if (!venue)
//       return res
//         .status(400)
//         .send(`The venue with id "${req.params.venueId}" does not exist.`);
//     const review = new Review({
//       text: req.body.text,
//     });
//     venue.activityId.reviews.push(review);
//     await venue.save();
//     return res.send(venue);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });


router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);
    const venue = await Venue.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        password: req.body.email,
        activities: req.body.activities,
        lodging: req.body.lodging,
      },
      { new: true }
    );
    if (!venue)
      return res
        .status(400)
        .send(`The venue with id "${req.params.id}" does not exist.`);
    await venue.save();
    return res.send(venue);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const venue = await Venue.findByIdAndRemove(req.params.id);
      if (!venue)
        return res
          .status(400)
          .send(`The venue with id "${req.params.id}" does not exist.`);
      return res.send(venue);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
module.exports = router;
