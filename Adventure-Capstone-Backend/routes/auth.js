const Joi = require("joi");
const bcrypt = require('bcrypt');
const express = require("express");
const { Venue } = require('../models/venue');
const { Adventurer } = require('../models/adventurer');
const router = express.Router();

// router.post('/', async (req, res) => {
//     try {
//     const { error } = validateLogin(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     let venue = await Venue.findOne({ email: req.body.email });
//     if (!venue) return res.status(400).send('test.');
//     const validPassword = await bcrypt.compare(req.body.password, venue.password);
//     if (!validPassword) return res.status(400).send('test.')
//     const token = jwt.sign({ _id: venue._id, name: venue.name }, config.get('jwtSecret'));
    
//     return res.send(token);
//     } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//     }
//    });

   router.post('/', async (req, res) => {
    try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let adventurer = await Adventurer.findOne({ email: req.body.email });
    if (!adventurer) return res.status(400).send('Invalid email or password.');
    const validPassword = await bcrypt.compare(req.body.password, adventurer.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.')
    const token = adventurer.generateAuthToken();
    
    return res.send(token);
    } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
    }
   });
   

function validateLogin(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
}
module.exports = router;
