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

  module.exports = router;