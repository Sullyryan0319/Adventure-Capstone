const mongoose = require("mongoose");
const Joi = require("joi");
const { boolean } = require("joi");

const lodgingSchema = new mongoose.Schema({
  type: { type: String, required: true, minlength: 2, maxlength: 250 },
  description: { type: String, required: true, minlength: 2, maxlength: 250 },
  occupancy: { type: String, require: true },
  price: {type: Number, default: 0}
});

const Lodging = mongoose.model("Lodging", lodgingSchema);

function validateLodging(lodging) {
  const schema = Joi.object({
    type: Joi.string().required(),
    description: Joi.string().required(),
    occupancy: Joi.number(),
    price: Joi.number()
  });
  return schema.validate(lodging);
}

exports.Lodging = Lodging;
exports.validateLodging = validateLodging;
exports.lodgingSchema = lodgingSchema;
