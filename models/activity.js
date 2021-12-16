const mongoose = require("mongoose");
const Joi = require("joi");

const activitySchema = new mongoose.Schema({
  description: { type: String, required: true, minlength: 2, maxlength: 50 },
  participants: { type: Number, default: 0 },
  price: {type: Number, default: 0}
});

const Activity = mongoose.model("Activity", activitySchema);

function validateActivity(activity) {
  const schema = Joi.object({
    description: Joi.string().required(),
    participants: Joi.number(),
    price: Joi.number()
  });
  return schema.validate(activity);
}

exports.Activity = Activity;
exports.validateActivity = validateActivity;
exports.activitySchema = activitySchema;
