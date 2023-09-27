var express = require('express');
var router = express.Router();
const Alloy = require("alloy-node");
const alloy = new Alloy("laON7aWuiCDHyYQof42AT");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    await alloy.identify("6455222fbe45b1875082a695");
    //6435d741662dcfe5c8ed29f7

    var tokenObj = await alloy.getUserToken();

    // Access the token property of the tokenObj
    var token = tokenObj.token;

    res.render('index4', {data: {token: token}});
  } catch (error) {
    console.error("Error in the route handler:", error);
    res.status(500).send("An error occurred");
  }
});
router.post('/webhook', (req, res) => {
  console.log('Webhook received:', req.body);

  res.status(200).json({
    responseCode: 200
  });
});

module.exports = router;