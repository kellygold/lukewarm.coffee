
var express = require('express');
var router = express.Router();
const Alloy = require("alloy-node");
const alloy = new Alloy("nFFNapI8Qh-9YfR_oGCN3");

router.get('/', (req, res) => {
    res.render('products');
  });

  module.exports = router;