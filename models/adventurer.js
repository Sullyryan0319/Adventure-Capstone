const mongoose = require("mongoose");
const Joi = require("joi");
const { activitySchema } = require("./activity");
const { lodgingSchema } = require("./lodging"); 
const config = require('config');
const jwt = require('jsonwebtoken');

const adventurerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {    type: String, unique: true, required: true, minlength: 5, maxlength: 255},
  password: { type: String, required: true, maxlength: 200, minlength: 5 },
  activityList: { type: [mongoose.Types.ObjectId]},
  lodging: { type: [mongoose.Types.ObjectId]}

});

adventurerSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, name: this.name }, config.get('jwtSecret'));
 };
 

const Adventurer = mongoose.model("Adventurer", adventurerSchema);

function validateAdventurer(adventurer) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    activityList: Joi.array(),
    lodging: Joi.array(),


  });
  return schema.validate(adventurer);
}

exports.Adventurer = Adventurer;
exports.validate = validateAdventurer;
exports.adventurerSchema = adventurerSchema;
