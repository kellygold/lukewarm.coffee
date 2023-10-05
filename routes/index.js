var express = require('express');
var router = express.Router();
const Alloy = require("alloy-node");
const alloy = new Alloy("laON7aWuiCDHyYQof42AT");

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.render('index');
});

router.get('/success', async function(req, res, next) {
  try {
    const userId = req.query.userId; // Get userId from query parameters
    const apiKey = req.query.apiKey; // Get apiKey from query parameters

    if (!userId || !apiKey) {
      return res.status(400).json({error: "UserId and API key are required"});
    }

    // Initialize Alloy with the provided apiKey
    const dynamicAlloy = new Alloy(apiKey);

    await dynamicAlloy.identify(userId);

    var tokenObj = await dynamicAlloy.getUserToken();

    // Access the token property of the tokenObj
    var token = tokenObj.token;

    res.render('integrations', {data: {token: token}});
  } catch (error) {
    console.error("Error in the route handler:", error);
    res.status(500).send("An error occurred");
  }
});



module.exports = router;