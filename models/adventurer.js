const mongoose = require('mongoose');
const Joi = require('joi');

const adventurerSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const Adventurer = mongoose.model('Adventurer', adventurerSchema);

function validateAdventurer(adventurer) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
    });
    return schema.validate(adventurer);
}


exports.Adventurer = Adventurer;
exports.validate = validateAdventurer;
exports.adventurerSchema = adventurerSchema;