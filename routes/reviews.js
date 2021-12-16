const { Review, validateReview } = require("../models/review");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const reviews = await Review.find();
      return res.send(reviews);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review)
        return res.status(400).send(`The review with id "${req.params.id}" does not exist.`);
      return res.send(review);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

router.post("/", async (req, res) => {
    try {
      const { error } = validateReview(req.body);
      if (error) return res.status(400).send(error);
  
      const review = new Review({
        description: req.body.description,
        participants: req.body.participants,
        price: req.body.participants
      });
  
      await review.save();
  
      return res.send(review);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error);
      const review = await Review.findByIdAndUpdate(
        req.params.id,
        {
            description: req.body.description,
            participants: req.body.participants
        },
        { new: true }
      );
      if (!review)
        return res.status(400).send(`The review with id "${req.params.id}" does not exist.`);
      await review.save();
      return res.send(review);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const review = await Review.findByIdAndRemove(req.params.id);
      if (!review)
        return res
          .status(400)
          .send(`The review with id "${req.params.id}" does not exist.`);
      return res.send(review);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  

  module.exports = router;