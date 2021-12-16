const mongoose = require("mongoose");
const Joi = require("joi");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId },
  text: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

function validateReview(review) {
    const schema = Joi.object({
      text: Joi.string().required(),
    });
    return schema.validate(review);
  }

exports.reviewSchema = reviewSchema;
exports.validateReview = validateReview;
exports.Review = Review;