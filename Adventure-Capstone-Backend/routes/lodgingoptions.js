const { Lodging, validateLodging } = require("../models/lodging");
const express = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const lodgingOptions = await Lodging.find();
      return res.send(lodgingOptions);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const lodging = await Lodging.findById(req.body.id);
      if (!lodging)
        return res.status(400).send(`The lodging option with id "${req.body.id}" does not exist.`);
      return res.send(lodging);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

router.post("/", async (req, res) => {
    try {
      const { error } = validateLodging(req.body);
      if (error) return res.status(400).send(error);
  
      const lodging = new Lodging({
        type: req.body.type,
        description: req.body.description,
        occupancy: req.body.occupancy,
        price: req.body.price
      });
  
      await lodging.save();
  
      return res.send(lodging);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) return res.status(400).send(error);
      const lodging = await Lodging.findByIdAndUpdate(
        req.params.id,
        {
            description: req.body.description,
            participants: req.body.participants
        },
        { new: true }
      );
      if (!lodging)
        return res.status(400).send(`The lodging with id "${req.params.id}" does not exist.`);
      await lodging.save();
      return res.send(lodging);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const lodging = await Lodging.findByIdAndRemove(req.params.id);
      if (!lodging)
        return res
          .status(400)
          .send(`The lodging with id "${req.params.id}" does not exist.`);
      return res.send(lodging);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  });


  module.exports = router;