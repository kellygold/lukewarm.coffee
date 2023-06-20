
var express = require('express');
var router = express.Router();
const Alloy = require("alloy-node");
const alloy = new Alloy("{{api_key}}");

router.get('/', (req, res) => {
    res.render('products');
  });

  module.exports = router;
