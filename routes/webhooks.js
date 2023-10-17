var express = require('express');
var router = express.Router();

// This array will store the received webhooks for demonstration purposes.
// In a real-world scenario, you might want to use a database.
let webhooks = [];

// Route to display the webhooks
router.get('/', (req, res) => {
    res.json({webhooks: webhooks});
});

// Endpoint to receive webhooks
router.post('/', (req, res) => {
    // Store the received webhook along with its headers
    webhooks.push({
        data: req.body,
        headers: req.headers
    });
    res.status(200).send('Webhook received');
});


module.exports = router;
