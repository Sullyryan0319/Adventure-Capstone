const mongoose = require('mongoose');

const adventurerSchema = new mongoose.Schema({
    test: {type: String, required: true}
})

const Adventurer = mongoose.model('Adventurer', adventurerSchema);


module.exports = Adventurer;