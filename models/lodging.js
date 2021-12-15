const mongoose = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");

const lodgingSchema = new mongoose.Schema({
  description: { type: String, required: true, minlength: 5, maxlength: 250 },
  occupancy: { type: Number, default: 0 },
  utilities: {type: Boolean, default: false}
});

const Lodging = mongoose.model("Lodging", lodgingSchema);

function validateLodging(lodging) {
  const schema = Joi.object({
    description: Joi.string().required(),
    occupancy: Joi.number(),
    utilities: Joi.boolean()
  });
  return schema.validate(lodging);
}

exports.Lodging = Lodging;
exports.validateLodging = validateLodging;
exports.lodgingSchema = lodgingSchema;
