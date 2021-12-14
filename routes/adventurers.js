const Adventurer = require('../models/adventurer');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {

        const adventurer = new Adventurer({
            firstName: req.body.firstName,
            lastName: req.body.lastName

        });

        await adventurer.save();

        return res.send(adventurer);

    } catch (ex) {
        return res.status(500).send(`Internal Server Error: ${ex}`);
    }
});


module.exports = router;