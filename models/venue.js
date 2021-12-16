const mongoose = require("mongoose");
const Joi = require("joi");
const { activitySchema } = require("./activity");
const { lodgingSchema } = require("./lodging");
const config = require('config');
const jwt = require('jsonwebtoken');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  email: {    type: String, unique: true, required: true, minlength: 5, maxlength: 255},
  password: { type: String, required: true, maxlength: 200, minlength: 5 },
  activities: { type: [activitySchema], default: [] },
  lodging: { type: [lodgingSchema], default: [] },

});

venueSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, name: this.name }, config.get('jwtSecret'));
 };
 

const Venue = mongoose.model("Venue", venueSchema);

function validateVenue(venue) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    activities: Joi.array(),
    lodging: Joi.array(),


  });
  return schema.validate(venue);
}

exports.Venue = Venue;
exports.validate = validateVenue;
exports.venueSchema = venueSchema;
