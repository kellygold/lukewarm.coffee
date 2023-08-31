var express = require('express');
var router = express.Router();
const Alloy = require("alloy-node");
const alloy = new Alloy("{{api_key}}");

router.get('/', (req, res) => {
  // Get the eventName and payload from query parameters
  const eventName = "productCreated";
  const payload = {
    id: req.query.id,
    title: req.query.title,
    description: req.query.description,
    price: req.query.price
  };

  // Call the identify function to identify the user
  alloy.identify("6410be1878af36536d551632");

  // Call the event function to run the specified event with the payload
  alloy.event(eventName, payload);

  res.render('products');
});

module.exports = router;
