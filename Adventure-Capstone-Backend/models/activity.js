const mongoose = require("mongoose");
const Joi = require("joi");
const {reviewSchema} = require('./review');

const activitySchema = new mongoose.Schema({
  description: { type: String, required: true, minlength: 2, maxlength: 50 },
  participants: {type: String, required: true},
  price: {type: String, required: true},
  reviews: {type: [reviewSchema], default: [] }
});

const Activity = mongoose.model("Activity", activitySchema);

function validateActivity(activity) {
  const schema = Joi.object({
    description: Joi.string().required(),
    participants: Joi.string(),
    price: Joi.string()
  });
  return schema.validate(activity);
}

exports.Activity = Activity;
exports.validateActivity = validateActivity;
exports.activitySchema = activitySchema;
